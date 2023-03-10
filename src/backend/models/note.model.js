const schema = require("./schema");
const message = require("../constants/message");
const { queryParser } = require("../utils/search.utils");

exports.isNoteMonthExist = (date, userId) => {
	return new Promise((resolve, reject) => {
		schema.NoteSchema.find(
			{ date: date, userId: userId },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					if (result.length === 0) {
						resolve(false);
					} else {
						resolve(true);
					}
				}
			}
		).lean();
	});
};

exports.isClosed = (id) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((note) => resolve(note.closed))
			.catch((err) => reject(err));
	});
};

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		this.isNoteMonthExist(data.date, data.userId)
			.then((isExist) => {
				if (isExist) {
					reject(message["note.month_already_available"]);
				} else {
					new schema.NoteSchema(data).save((err, response) => {
						if (err) {
							reject(err);
						} else {
							resolve(response.toObject());
						}
					});
				}
			})
			.catch((err) => reject(err));
	});
};

exports.getAll = (query, userId) => {
	return new Promise((resolve, reject) => {
		schema.NoteSchema.find({ ...queryParser(query), userId: userId })
			.lean()
			.sort({ date: "ascending" })
			.exec((err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.NoteSchema.findById(id, (err, result) => {
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
		this.isClosed(id)
			.then((isClosed) => {
				if (isClosed) {
					reject(message["note.is_closed"]);
				} else {
					schema.NoteSchema.findByIdAndUpdate(
						id,
						data,
						(err, result) => {
							if (err) {
								reject(err);
							} else {
								this.getById(id)
									.then((res) => resolve(res))
									.catch((error) => reject(error));
							}
						}
					);
				}
			})
			.catch((err) => reject(err));
	});
};

exports.addEstimatedBalance = (id, balance) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((res) => {
				const newBalance = res.estimated.balance + balance;
				const newData = {
					...res,
					estimated: {
						...res.estimated,
						balance: newBalance,
					},
				};
				this.edit(id, newData)
					.then((edit) => resolve(edit))
					.catch((err) => reject(err));
			})
			.catch((err) => reject(err));
	});
};

exports.addEstimatedRemains = (id, remains) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((res) => {
				const newRemains = res.estimated.remains + remains;
				const newData = {
					...res,
					estimated: {
						...res.estimated,
						remains: newRemains,
					},
				};
				this.edit(id, newData)
					.then((edit) => resolve(edit))
					.catch((err) => reject(err));
			})
			.catch((err) => reject(err));
	});
};

exports.close = (id) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((note) => {
				if (note.closed) {
					reject(message["note.is_closed_already"]);
				} else {
					const editedNote = { closed: true };

					this.edit(id, editedNote)
						.then((edited) => resolve(edited))
						.catch((err) => reject(err));
				}
			})
			.catch((err) => reject(err));
	});
};

// exports.edit = (id, data) => {
// 	return new Promise((resolve, reject) => {
// 		schema.NoteSchema.findByIdAndUpdate(id, data, (err, result) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				this.getById(id)
// 					.then((res) => resolve(res))
// 					.catch((e) => reject(e));
// 			}
// 		}).lean();
// 	});
// };

// exports.delete = (id) => {
// 	return new Promise((resolve, reject) => {
// 		schema.NoteSchema.findByIdAndDelete(id, (err, result) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(result);
// 			}
// 		}).lean();
// 	});
// };
