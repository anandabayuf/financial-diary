const schema = require("./schema");
// const categoryModel = require("./category.model");
const walletModel = require("./wallet.model");
const noteModel = require("./note.model");

exports.create = (datas) => {
	return new Promise((resolve, reject) => {
		let checkDatas = datas.map(async (data) => {
			const checkFromDB = await schema.WalletNoteSchema.find({
				noteId: data.noteId,
				walletId: data.walletId,
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
						"Cannot add wallet, there is Wallet which has been added"
					);
				} else {
					let savingData = datas.map(async (data) => {
						const saveData = await new schema.WalletNoteSchema(
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
		schema.WalletNoteSchema.find(
			{ [key]: { $regex: `^${value}`, $options: "i" }, noteId: noteId },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					let data = result.map(async (el) => {
						const { walletId, noteId, ...rest } = el;

						const wallet = await walletModel.getById(walletId);
						const note = await noteModel.getById(noteId);

						return {
							...rest,
							wallet,
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
		schema.WalletNoteSchema.findById(id, async (err, result) => {
			if (err) {
				reject(err);
			} else {
				const { walletId, noteId, ...rest } = result;

				const wallet = await walletModel.getById(walletId);
				const note = await noteModel.getById(noteId);

				resolve({
					...rest,
					wallet,
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
		schema.WalletNoteSchema.find(
			{ [key]: { $regex: `^${value}`, $options: "i" }, noteId: noteId },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					const unAvailableWallet = result.map((el) => el.walletId);

					const usersWallet = await walletModel.getAll(query, userId);

					unAvailableWallet.forEach((el) => {
						const findIdx = usersWallet.findIndex(
							(wallet) => wallet._id.toString() === el
						);
						// console.log(findIdx);
						usersWallet.splice(findIdx, 1);
					});

					// console.log(unAvailableWallet, usersWallet);

					resolve(usersWallet);
				}
			}
		).lean();
	});
};

exports.edit = (id, data) => {
	return new Promise((resolve, reject) => {
		schema.WalletNoteSchema.findByIdAndUpdate(id, data, (err, result) => {
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
