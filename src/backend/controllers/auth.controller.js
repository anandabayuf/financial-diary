const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const authModel = require("../models/auth.model");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.post("/login", async (req, res) => {
	const credential = req.body;

	try {
		res.json({
			message: "Successfully sign in",
			token: await authModel.authenticate(credential),
		});
	} catch (err) {
		res.status(401).json({
			status: 401,
			message: "Failed to sign in",
			detail: err,
		});
	}
});

router.post("/register", upload.single("picture"), async (req, res) => {
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
		const response = await authModel.register(payload);
		// console.log(response);
		const { password, salt, ...rest } = response;
		// console.log(rest);
		res.status(201).json({
			status: 201,
			message: "Successfully register",
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: "Failed to register",
			detail: err,
		});
	}
});

router.get("/authToken", async (req, res) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	try {
		res.status(200).json({
			status: 200,
			message: "Token is valid",
			data: await authModel.authToken(token),
		});
	} catch (err) {
		res.status(401).json({
			status: 401,
			message: "Token is not valid",
			detail: err,
		});
	}
});

module.exports = router;
