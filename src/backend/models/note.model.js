const schema = require("./schema");

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		// console.log(data);
		schema.NoteSchema.find(
			{ date: data.date, userId: data.userId },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					if (result.length === 0) {
						new schema.NoteSchema(data).save((err, response) => {
							if (err) {
								reject(err);
							} else {
								resolve(response.toObject());
							}
						});
					} else {
						reject("Note with the month is already available");
					}
				}
			}
		).lean();
	});
};

exports.getAll = (query, userId) => {
	let { limit = 5, page = 1, ...search } = query;
	const key = Object.keys(search);
	const value = new Date(search[key]);

	return new Promise((resolve, reject) => {
		schema.NoteSchema.find(
			{ [key]: value, userId: userId },
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
		schema.NoteSchema.findById(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		}).lean();
	});
};

exports.setEstimatedBalance = (id, noteData, balance) => {
	const newNoteBalance = {
		...noteData,
		estimated: { ...noteData.estimated, balance: balance },
	};
	return new Promise((resolve, reject) => {
		schema.NoteSchema.findByIdAndUpdate(
			id,
			newNoteBalance,
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					this.getById(id)
						.then((res) => resolve(res))
						.catch((e) => reject(e));
				}
			}
		);
	});
};

exports.setEstimatedRemains = (id, noteData, remains) => {
	const newNoteRemains = {
		...noteData,
		estimated: { ...noteData.estimated, remains: remains },
	};
	return new Promise((resolve, reject) => {
		schema.NoteSchema.findByIdAndUpdate(
			id,
			newNoteRemains,
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					this.getById(id)
						.then((res) => resolve(res))
						.catch((e) => reject(e));
				}
			}
		);
	});
};

exports.addEstimatedBalance = (id, balance) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((res) => {
				const newBalance = res.estimated.balance + balance;
				this.setEstimatedBalance(id, res, newBalance)
					.then((result) => resolve(result))
					.catch((error) => reject(error));
			})
			.catch((err) => reject(err));
	});
};

exports.addEstimatedRemains = (id, remains) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((res) => {
				const newRemains = res.estimated.remains + remains;
				this.setEstimatedRemains(id, res, newRemains)
					.then((result) => resolve(result))
					.catch((error) => reject(error));
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
