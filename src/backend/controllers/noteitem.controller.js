const express = require("express");
const router = express.Router();

const noteItemModel = require("../models/noteItem.model.js");

router.get("/note/:noteId", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get user note item",
			data: await noteItemModel.getAll(
				req.query,
				req.params.noteId,
				req.user.id
			),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get user note item",
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get user note item data",
			data: await noteItemModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get user note item data",
			detail: err,
		});
	}
});

router.post("/note/:noteId", async (req, res) => {
	let data = req.body;
	data["noteId"] = req.params.noteId;
	data["userId"] = req.user.id;

	try {
		res.status(201).json({
			status: 201,
			message: "Successfully create user note item",
			data: await noteItemModel.create(req.params.noteId, data),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to create user note item",
			detail: err,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: "Successfully edit user note item data",
			data: await noteItemModel.editFunction(req.params.id, req.body),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to edit user note item data",
			detail: err,
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await noteItemModel.deleteFunction(req.params.id);
		res.status(200).json({
			status: 204,
			message: "Successfully delete user note item data",
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to delete user note item data",
			detail: err,
		});
	}
});

module.exports = router;
