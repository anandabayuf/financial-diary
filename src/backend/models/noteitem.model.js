const schema = require("./schema");
const noteModel = require("./note.model");
const walletNoteModel = require("./walletnote.model");
const categoryNoteModel = require("./categorynote.model");
const { ITEM_TYPE } = require("../constants/enum");

exports.isCanAdd = (note, data) => {
	const noteYear = new Date(note.date).getFullYear();
	const dataYear = new Date(data.date).getFullYear();
	const noteMonth = new Date(note.date).getMonth() + 1;
	const dataMonth = new Date(data.date).getMonth() + 1;
	const dataDate = new Date(data.date).getDate();
	const isCanAdd =
		(dataYear + 1 === noteYear &&
			dataMonth === 12 &&
			dataDate >= 26 &&
			dataDate <= 31) ||
		(noteYear === dataYear &&
			noteMonth === dataMonth &&
			dataDate <= 25 &&
			dataDate >= 1) ||
		(noteYear === dataYear &&
			dataMonth + 1 === noteMonth &&
			dataDate >= 26 &&
			(dataDate <= 31 ||
				dataDate <= 30 ||
				dataDate <= 29 ||
				dataDate <= 28));
	return isCanAdd;
};

//debit !== 0 && credit == 0
//walletId !== undefined && categoryId == undefined
exports.incomeTransaction = (walletNoteId, income) => {
	return new Promise((resolve, reject) => {
		walletNoteModel
			.addBalance(walletNoteId, income)
			.then((walletNote) => resolve(walletNote))
			.catch((err) => reject(err));
	});
};

//debit !== 0 && credit !== 0
//debit di walletId1 && credit di walletId0
//walletId0 !== undefined && walletId1 !== undefined
//bikin 2 array note item
exports.withdrawOrTransferTransaction = (
	walletNoteId, //pengirim
	walletNoteId2, //penerima
	addition
) => {
	return new Promise((resolve, reject) => {
		walletNoteModel
			.addBalance(walletNoteId, -addition)
			.then((walletNote) => {
				walletNoteModel
					.addBalance(walletNoteId2, addition)
					.then((walletNote2) => resolve({ walletNote, walletNote2 }))
					.catch((err) => reject(err));
			})
			.catch((err) => reject(err));
	});
};

//debit == 0 && credit !== 0
//credit di wallet dan di category
//wallet id !== undefined && category id !== undefined
exports.spendTransaction = (walletNoteId, categoryNoteId, total) => {
	return new Promise((resolve, reject) => {
		walletNoteModel
			.addBalance(walletNoteId, -total)
			.then((walletNote) => {
				categoryNoteModel
					.addTotal(categoryNoteId, total)
					.then((catNote) => resolve({ walletNote, catNote }))
					.catch((err) => reject(err));
			})
			.catch((err) => reject(err));
	});
};

//debit === 0 && credit !== 0
//credit di wallet saja
//walletId !== undefined
exports.spendOnlyInWalletTransaction = (walletNoteId, total) => {
	return new Promise((resolve, reject) => {
		walletNoteModel
			.addBalance(walletNoteId, -total)
			.then((walletNote) => resolve(walletNote))
			.catch((err) => reject(err));
	});
};

exports.create = (noteId, data) => {
	return new Promise((resolve, reject) => {
		noteModel
			.getById(noteId)
			.then(async (note) => {
				const noteYear = new Date(note.date).getFullYear();
				const noteMonth = new Date(note.date).getMonth() + 1;

				if (this.isCanAdd(note, data)) {
					let payload = data;
					switch (ITEM_TYPE[payload.type]) {
						case "INCOME":
							if (payload.debit < 0) {
								reject(
									"Income amount must be zero or positive number"
								);
							} else {
								this.incomeTransaction(
									payload.walletNoteId,
									payload.debit
								)
									.then(async (result) => {
										payload["credit"] = 0;
										const savingData =
											await new schema.NoteItemSchema(
												payload
											).save();

										resolve(savingData);
									})
									.catch((err) => reject(err));
							}
							break;
						case "WITHDRAW_OR_TRANSFER":
							if (payload.debit < 0) {
								reject(
									"Transfer amount must be zero or positive number"
								);
							} else {
								this.withdrawOrTransferTransaction(
									payload.walletNoteId, //pengirim
									payload.walletNoteId2, //penerima
									payload.debit
								)
									.then(async (result) => {
										const savingData =
											await new schema.NoteItemSchema(
												payload
											).save();
										resolve(savingData);
									})
									.catch((err) => reject(err));
							}
							break;
						case "SPEND":
							if (payload.credit < 0) {
								reject(
									"Total amount must be zero or positive number"
								);
							} else {
								this.spendTransaction(
									payload.walletNoteId,
									payload.categoryNoteId,
									payload.credit
								)
									.then(async (result) => {
										payload["debit"] = 0;
										const savingData =
											await new schema.NoteItemSchema(
												payload
											).save();

										resolve(savingData);
									})
									.catch((err) => reject(err));
							}
							break;
						case "SPEND_ONLY_IN_WALLET":
							if (payload.credit < 0) {
								reject(
									"Total amount must be zero or positive number"
								);
							} else {
								this.spendOnlyInWalletTransaction(
									payload.walletNoteId,
									payload.credit
								)
									.then(async (result) => {
										payload["debit"] = 0;
										const savingData =
											await new schema.NoteItemSchema(
												payload
											).save();

										resolve(savingData);
									})
									.catch((err) => reject(err));
							}

							break;
						default:
							reject("Cannot add item. Invalid type item");
							break;
					}
				} else {
					reject(
						`Cannot add item. The range of note is from 26-${
							noteMonth - 1 === 0 ? 12 : noteMonth - 1
						}-${
							noteMonth - 1 === 0 ? noteYear - 1 : noteYear
						} to 25-${noteMonth}-${noteYear}`
					);
				}
			})
			.catch((error) => reject(error));
	});
};

exports.getAll = (query, noteId, userId) => {
	let { limit = 5, page = 1, ...search } = query;
	const key = Object.keys(search);
	const value = search[key];
	const queryFunc = () => {
		if (search.walletNoteId !== undefined) {
			return {
				$or: [
					{
						[key]: value,
					},
					{
						["walletNoteId2"]: value,
					},
				],
			};
		} else {
			return {
				[key]: value,
			};
		}
	};

	return new Promise((resolve, reject) => {
		schema.NoteItemSchema.find(
			{ ...queryFunc(), noteId: noteId, userId: userId },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		).lean();
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.NoteItemSchema.findById(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		}).lean();
	});
};

exports.edit = (id, data) => {
	return new Promise((resolve, reject) => {
		schema.NoteItemSchema.findByIdAndUpdate(id, data, (err, result) => {
			if (err) {
				reject(err);
			} else {
				this.getById(id)
					.then((res) => resolve(res))
					.catch((e) => reject(e));
			}
		}).lean();
	});
};

exports.editFunction = (id, data) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((noteItem) => {
				noteModel
					.getById(noteItem.noteId)
					.then((note) => {
						const noteYear = new Date(note.date).getFullYear();
						const noteMonth = new Date(note.date).getMonth() + 1;
						if (
							(data.date && this.isCanAdd(note, data)) ||
							data.date === undefined
						) {
							switch (ITEM_TYPE[noteItem.type]) {
								case "INCOME":
									if (data.debit < 0) {
										reject(
											"Income amount must be zero or positive number"
										);
									} else {
										this.incomeTransaction(
											noteItem.walletNoteId,
											-noteItem.debit + data.debit
										)
											.then((income) => {
												this.edit(id, data)
													.then((res) => resolve(res))
													.catch((err) =>
														reject(err)
													);
											})
											.catch((err) => reject(err));
									}
									break;
								case "WITHDRAW_OR_TRANSFER":
									if (data.debit < 0 || data.credit < 0) {
										reject(
											"Transfer amount must be zero or positive number"
										);
									} else {
										this.withdrawOrTransferTransaction(
											noteItem.walletNoteId,
											noteItem.walletNoteId2,
											-noteItem.debit + data.debit
										)
											.then((wott) => {
												this.edit(id, data)
													.then((res) => resolve(res))
													.catch((err) =>
														reject(err)
													);
											})
											.catch((err) => reject(err));
									}

									break;
								case "SPEND":
									if (data.credit < 0) {
										reject(
											"Total amount must be zero or positive number"
										);
									} else {
										this.spendTransaction(
											noteItem.walletNoteId,
											noteItem.categoryNoteId,
											-noteItem.credit + data.credit
										)
											.then((spend) => {
												this.edit(id, data)
													.then((res) => resolve(res))
													.catch((err) =>
														reject(err)
													);
											})
											.catch((err) => reject(err));
									}

									break;
								case "SPEND_ONLY_IN_WALLET":
									if (data.credit < 0) {
										reject(
											"Total amount must be zero or positive number"
										);
									} else {
										this.spendOnlyInWalletTransaction(
											noteItem.walletNoteId,
											-noteItem.credit + data.credit
										)
											.then((soiw) => {
												this.edit(id, data)
													.then((res) => resolve(res))
													.catch((err) =>
														reject(err)
													);
											})
											.catch((err) => reject(err));
									}
									break;
							}
						} else {
							reject(
								`Cannot add item. The range of note is from 26-${
									noteMonth - 1 === 0 ? 12 : noteMonth - 1
								}-${
									noteMonth - 1 === 0
										? noteYear - 1
										: noteYear
								} to 25-${noteMonth}-${noteYear}`
							);
						}
					})
					.catch((err) => reject(err));
			})
			.catch((err) => reject(err));
	});
};

exports.delete = (id) => {
	return new Promise((resolve, reject) => {
		schema.NoteItemSchema.findByIdAndDelete(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		}).lean();
	});
};

exports.deleteFunction = (id) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((noteItem) => {
				switch (ITEM_TYPE[noteItem.type]) {
					case "INCOME":
						this.incomeTransaction(
							noteItem.walletNoteId,
							-noteItem.debit
						)
							.then((income) => {
								this.delete(id)
									.then((res) => resolve(res))
									.catch((err) => reject(err));
							})
							.catch((err) => reject(err));
						break;
					case "WITHDRAW_OR_TRANSFER":
						this.withdrawOrTransferTransaction(
							noteItem.walletNoteId,
							noteItem.walletNoteId2,
							-noteItem.debit
						)
							.then((wott) => {
								this.delete(id)
									.then((res) => resolve(res))
									.catch((err) => reject(err));
							})
							.catch((err) => reject(err));
						break;
					case "SPEND":
						this.spendTransaction(
							noteItem.walletNoteId,
							noteItem.categoryNoteId,
							-noteItem.credit
						)
							.then((spend) => {
								this.delete(id)
									.then((res) => resolve(res))
									.catch((err) => reject(err));
							})
							.catch((err) => reject(err));
						break;
					case "SPEND_ONLY_IN_WALLET":
						this.spendOnlyInWalletTransaction(
							noteItem.walletNoteId,
							-noteItem.credit
						)
							.then((soiw) => {
								this.delete(id)
									.then((res) => resolve(res))
									.catch((err) => reject(err));
							})
							.catch((err) => reject(err));
						break;
					default:
						break;
				}
			})
			.catch((err) => reject(err));
	});
};