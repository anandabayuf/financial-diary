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
						reject("Note with the month is already availble");
					}
				}
			}
		).lean();
	});
};

exports.getAll = (query, userId) => {
	let { limit = 5, page = 1, ...search } = query;
	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.NoteSchema.find(
			{ [key]: { $regex: `^${value}`, $options: "i" }, userId: userId },
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
