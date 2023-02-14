const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const authModel = require("../models/auth.model");
const message = require("../constants/message");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", async (req, res) => {
	const credential = req.body;

	try {
		res.json({
			message: message["login.success"],
			token: await authModel.authenticate(credential),
		});
	} catch (err) {
		res.status(401).json({
			status: 401,
			message: message["login.failed"],
			detail: err,
		});
	}
});

router.post("/register", upload.single("picture"), async (req, res) => {
	let payload = JSON.parse(req.body.data);

	if (req.file) {
		payload["picture"] = {
			data: req.file.buffer,
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
			message: message["register.success"],
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["register.failed"],
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
			message: message["authtoken.success"],
			data: await authModel.authToken(token),
		});
	} catch (err) {
		res.status(401).json({
			status: 401,
			message: message["authtoken.failed"],
			detail: err,
		});
	}
});

module.exports = router;
