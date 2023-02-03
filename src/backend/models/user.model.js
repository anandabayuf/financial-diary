const schema = require("./schema");

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		new schema.UserSchema(data).save((err, response) => {
			if (err) {
				reject(err);
			} else {
				// console.log(response);
				resolve(response.toObject());
			}
		});
	});
};

exports.getAll = (query) => {
	let { limit = 5, page = 1, ...search } = query;
	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.UserSchema.find(
			{ [key]: { $regex: `^${value}`, $options: "i" } },
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
		schema.UserSchema.findById(id, (err, result) => {
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
		schema.UserSchema.findByIdAndUpdate(id, data, (err, result) => {
			if (err) {
				if (err.codeName === "DuplicateKey")
					reject({
						message:
							"Username is already exist, Please input unique username!",
					});
				else reject(err);
			} else {
				this.getById(id)
					.then((res) => resolve(res))
					.catch((e) => reject(e));
			}
		}).lean();
	});
};

exports.delete = (id) => {
	return new Promise((resolve, reject) => {
		schema.UserSchema.findByIdAndDelete(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		}).lean();
	});
};
