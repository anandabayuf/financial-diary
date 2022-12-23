const express = require("express");
const router = express.Router();

const walletNodeModel = require("../models/waletnote.model");

router.get("/note/:noteId", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get wallet note",
			data: await walletNodeModel.getAll(req.query, req.params.noteId),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get wallet note",
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get wallet note data",
			data: await walletNodeModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get wallet note data",
			detail: err,
		});
	}
});

router.post("/", async (req, res) => {
	let data = req.body;

	data.balance = 0;

	try {
		res.status(201).json({
			status: 201,
			message: "Successfully create wallet note",
			data: await walletNodeModel.create(data),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to create wallet note",
			detail: err,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: "Successfully edit wallet note data",
			data: await walletNodeModel.edit(req.params.id, req.body),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to edit wallet note data",
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
