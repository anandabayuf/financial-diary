const express = require("express");
const router = express.Router();
const message = require("../constants/message");

const noteModel = require("../models/note.model");

router.get("", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["note.success.get_all"],
			data: await noteModel.getAll(req.query, req.user.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["note.failed.get_all"],
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["note.success.get"],
			data: await noteModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["note.failed.get"],
			detail: err,
		});
	}
});

router.post("/", async (req, res) => {
	let data = req.body;

	data.userId = req.user.id;
	data.date = new Date(data.date);
	data.estimated = {
		balance: 0,
		remains: 0,
	};
	data.closed = false;

	try {
		res.status(201).json({
			status: 201,
			message: message["note.success.create"],
			data: await noteModel.create(data),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["note.failed.create"],
			detail: err,
		});
	}
});

router.put("/close/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: message["note.success.closed"],
			data: await noteModel.close(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["note.failed.close"],
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
