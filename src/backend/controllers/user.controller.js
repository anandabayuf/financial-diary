const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const userModel = require("../models/user.model");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get("", async (req, res) => {
	try {
		const data = await userModel.getAll(req.query);

		let users = [];

		if (data.length > 0) {
			users = data.map((el) => {
				const { password, salt, ...rest } = el;
				return rest;
			});
		}

		res.status(200).json({
			status: 200,
			message: "Successfully get all users data",
			data: users,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get all users data",
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await userModel.getById(req.params.id);

		const { password, salt, ...rest } = user;

		res.status(200).json({
			status: 200,
			message: "Successfully get user data",
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to get user data",
			detail: err,
		});
	}
});

router.post("/", upload.single("picture"), async (req, res) => {
	let payload = JSON.parse(req.body.data);

	if (req.file) {
		payload["picture"] = {
			data: fs.readFileSync(
				path.join(__dirname, "..", "/uploads/" + req.file.filename)
			),
			contentType: "image/png",
		};
	}

	payload.salt = crypto.randomBytes(16).toString("hex");
	payload.password = crypto
		.pbkdf2Sync(payload.password, payload.salt, 1000, 64, `sha512`)
		.toString(`hex`);

	try {
		const response = await userModel.create(payload);
		// console.log(response);
		const { password, salt, ...rest } = response;
		// console.log(rest);
		res.status(201).json({
			status: 201,
			message: "Successfully create user",
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to create user",
			detail: err,
		});
	}
});

router.put("/:id", upload.single("picture"), async (req, res) => {
	let payload = JSON.parse(req.body.data);

	if (req.file) {
		payload["picture"] = {
			data: fs.readFileSync(
				path.join(__dirname, "..", "/uploads/" + req.file.filename)
			),
			contentType: "image/png",
		};
	}

	if (payload.password) {
		payload.salt = crypto.randomBytes(16).toString("hex");
		payload.password = crypto
			.pbkdf2Sync(payload.password, payload.salt, 1000, 64, `sha512`)
			.toString(`hex`);
	}

	try {
		const user = await userModel.edit(req.params.id, payload);

		const { password, salt, ...rest } = user;

		res.status(201).json({
			status: 201,
			message: "Successfully edit user data",
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to edit user data",
			detail: err,
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await userModel.delete(req.params.id);
		res.status(200).json({
			status: 204,
			message: "Successfully delete user data",
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to delete user data",
			detail: err,
		});
	}
});

module.exports = router;
