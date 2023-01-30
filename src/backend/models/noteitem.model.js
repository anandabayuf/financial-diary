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

exports.incomeTransaction = (walletNoteId, income) => {
	return new Promise((resolve, reject) => {
		walletNoteModel
			.addBalance(walletNoteId, income)
			.then((walletNote) => resolve(walletNote))
			.catch((err) => reject(err));
	});
};

exports.withdrawOrTransferTransaction = (
	walletNoteId,
	walletNoteId2,
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
							break;
						case "WITHDRAW_OR_TRANSFER":
							this.withdrawOrTransferTransaction(
								payload.walletNoteId,
								payload.walletNoteId2,
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
							break;
						case "SPEND":
							this.spendTransaction(
								payload.walletNoteId,
								payload.categoryNoteId,
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
							break;
						case "SPEND_ONLY_IN_WALLET":
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

	return new Promise((resolve, reject) => {
		schema.NoteItemSchema.find(
			{ [key]: value, noteId: noteId, userId: userId },
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
									this.incomeTransaction(
										noteItem.walletNoteId,
										-noteItem.debit + data.debit
									)
										.then((income) => {
											this.edit(id, data)
												.then((res) => resolve(res))
												.catch((err) => reject(err));
										})
										.catch((err) => reject(err));
									break;
								case "WITHDRAW_OR_TRANSFER":
									this.withdrawOrTransferTransaction(
										noteItem.walletNoteId,
										noteItem.walletNoteId2,
										-noteItem.debit + data.debit
									)
										.then((wott) => {
											this.edit(id, data)
												.then((res) => resolve(res))
												.catch((err) => reject(err));
										})
										.catch((err) => reject(err));
									break;
								case "SPEND":
									this.spendTransaction(
										noteItem.walletNoteId,
										noteItem.categoryNoteId,
										-noteItem.debit + data.debit
									)
										.then((spend) => {
											this.edit(id, data)
												.then((res) => resolve(res))
												.catch((err) => reject(err));
										})
										.catch((err) => reject(err));
									break;
								case "SPEND_ONLY_IN_WALLET":
									this.spendOnlyInWalletTransaction(
										noteItem.walletNoteId,
										-noteItem.credit + data.credit
									)
										.then((soiw) => {
											this.edit(id, data)
												.then((res) => resolve(res))
												.catch((err) => reject(err));
										})
										.catch((err) => reject(err));
									break;
								default:
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
							-noteItem.debit
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
