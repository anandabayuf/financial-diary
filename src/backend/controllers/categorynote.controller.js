const express = require("express");
const router = express.Router();

const categoryNoteModel = require("../models/categorynote.model");

router.get("/note/:noteId", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get category note",
			data: await categoryNoteModel.getAll(req.query, req.params.noteId),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get category note",
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: "Successfully get category note data",
			data: await categoryNoteModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get category note data",
			detail: err,
		});
	}
});

router.post("/", async (req, res) => {
	let data = req.body;

	data.total = 0;

	try {
		res.status(201).json({
			status: 201,
			message: "Successfully create category note",
			data: await categoryNoteModel.create(data),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to create category note",
			detail: err,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: "Successfully edit category note data",
			data: await categoryNoteModel.edit(req.params.id, req.body),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to edit category note data",
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
