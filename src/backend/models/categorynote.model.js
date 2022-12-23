const schema = require("./schema");
const categoryModel = require("./category.model");
const noteModel = require("./note.model");

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		schema.CategoryNoteSchema.find(
			{ noteId: data.noteId, categoryId: data.categoryId },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					if (result.length === 0) {
						new schema.CategoryNoteSchema(data).save(
							(err, response) => {
								if (err) {
									reject(err);
								} else {
									// console.log(response);
									resolve(response.toObject());
								}
							}
						);
					} else {
						reject("Category is already added");
					}
				}
			}
		).lean();
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
