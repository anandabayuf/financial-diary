const express = require("express");
const router = express.Router();

const walletModel = require("../models/wallet.model");

router.get("", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get user wallet",
			data: await walletModel.getAll(req.query, req.user.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get user wallet",
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get user wallet data",
			data: await walletModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get user wallet data",
			detail: err,
		});
	}
});

router.post("/", async (req, res) => {
	let data = req.body;

	data.userId = req.user.id;

	try {
		res.status(201).json({
			status: 201,
			message: "Successfully create user wallet",
			data: await walletModel.create(data),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to create user wallet",
			detail: err,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: "Successfully edit user wallet data",
			data: await walletModel.edit(req.params.id, req.body),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to edit user wallet data",
			detail: err,
		});
	}
});

// router.delete("/:id", async (req, res) => {
// 	try {
// 		await userModel.delete(req.params.id);
// 		res.status(200).json({
// 			status: 204,
// 			message: "Successfully delete user data",
// 		});
// 	} catch (err) {
// 		res.status(404).json({
// 			status: 404,
// 			message: "Failed to delete user data",
// 			detail: err,
// 		});
// 	}
// });

module.exports = router;
