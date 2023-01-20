const schema = require("./schema");
const categoryModel = require("./category.model");
const noteModel = require("./note.model");

// exports.create = (data) => {
// 	return new Promise((resolve, reject) => {
// 		schema.CategoryNoteSchema.find(
// 			{ noteId: data.noteId, categoryId: data.categoryId },
// 			async (err, result) => {
// 				if (err) {
// 					reject(err);
// 				} else {
// 					if (result.length === 0) {
// 						new schema.CategoryNoteSchema(data).save(
// 							(err, response) => {
// 								if (err) {
// 									reject(err);
// 								} else {
// 									// console.log(response);
// 									resolve(response.toObject());
// 								}
// 							}
// 						);
// 					} else {
// 						reject("Category is already added");
// 					}
// 				}
// 			}
// 		).lean();
// 	});
// };
exports.create = (datas) => {
	return new Promise((resolve, reject) => {
		let checkDatas = datas.map(async (data) => {
			const checkFromDB = await schema.CategoryNoteSchema.find({
				noteId: data.noteId,
				categoryId: data.categoryId,
			}).lean();

			if (checkFromDB.length === 0) {
				return data;
			}
		});

		Promise.all(checkDatas)
			.then((res) => {
				const dataToAdd = res.filter((el) => el !== undefined);

				if (dataToAdd.length !== datas.length) {
					reject(
						"Cannot add category, there is Category which has been added"
					);
				} else {
					let savingData = datas.map(async (data) => {
						const saveData = await new schema.CategoryNoteSchema(
							data
						).save();

						return saveData;
					});

					Promise.all(savingData)
						.then((res) => resolve(res))
						.catch((err) => reject(err));
				}
			})
			.catch((err) => reject(err));
	});
};

exports.getAll = (query, noteId) => {
	let { limit = 5, page = 1, ...search } = query;
	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.CategoryNoteSchema.find(
			{ [key]: { $regex: `^${value}`, $options: "i" }, noteId: noteId },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					let data = result.map(async (el) => {
						const { categoryId, noteId, ...rest } = el;

						const category = await categoryModel.getById(
							categoryId
						);
						const note = await noteModel.getById(noteId);

						return {
							...rest,
							category,
							note,
						};
					});

					Promise.all(data).then(async (res) => {
						resolve(res);
					});
				}
			}
		).lean();
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		console.log(id);
		schema.CategoryNoteSchema.findById(id, async (err, result) => {
			if (err) {
				reject(err);
			} else {
				const { categoryId, noteId, ...rest } = result;

				const category = await categoryModel.getById(categoryId);
				const note = await noteModel.getById(noteId);

				resolve({
					...rest,
					category,
					note,
				});
			}
		}).lean();
	});
};

exports.getAllAvailableByNoteId = (query, noteId, userId) => {
	let { limit = 5, page = 1, ...search } = query;
	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.CategoryNoteSchema.find(
			{ [key]: { $regex: `^${value}`, $options: "i" }, noteId: noteId },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					const unAvailableCategory = result.map(
						(el) => el.categoryId
					);

					const usersCategory = await categoryModel.getAll(
						query,
						userId
					);

					unAvailableCategory.forEach((el) => {
						const findIdx = usersCategory.findIndex(
							(category) => category._id.toString() === el
						);
						// console.log(findIdx);
						usersCategory.splice(findIdx, 1);
					});

					// console.log(unAvailableWallet, usersWallet);

					resolve(usersCategory);
				}
			}
		).lean();
	});
};

exports.edit = (id, data) => {
	return new Promise((resolve, reject) => {
		schema.CategoryNoteSchema.findByIdAndUpdate(id, data, (err, result) => {
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

// exports.delete = (id) => {
// 	return new Promise((resolve, reject) => {
// 		schema.CategoryNoteSchema.findByIdAndDelete(id, (err, result) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(result);
// 			}
// 		}).lean();
// 	});
// };
