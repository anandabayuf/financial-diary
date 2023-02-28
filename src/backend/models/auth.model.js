const schema = require("./schema");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const message = require("../constants/message");
const PublicModel = require("./public.model");
const userModel = require("./user.model");
const nodemailer = require("nodemailer");
const {
	NODEMAILER_AUTH_USER,
	NODEMAILER_AUTH_PASS,
	SECRET_KEY,
	CLIENT_BASE_URL,
} = require("../constants/constants");
const ejs = require("ejs");

config();

exports.authenticate = (data) => {
	let { username, password } = data;

	return new Promise((resolve, reject) => {
		schema.UserSchema.findOne({ username }, async (err, response) => {
			if (err) {
				reject(err);
			}

			if (response) {
				let decryptedPassword;
				try {
					decryptedPassword = await PublicModel.decrypt(password);
				} catch (error) {
					reject(error);
				}

				const passwordFromDB = response.password;
				const passwordFromUser = crypto
					.pbkdf2Sync(
						decryptedPassword,
						response.salt,
						1000,
						64,
						`sha512`
					)
					.toString(`hex`);

				if (passwordFromDB == passwordFromUser) {
					if (response.isEmailVerified) {
						const data = {
							id: response._id,
							username: response.username,
							name: response.name,
							email: response.email,
							isEmailVerified: response.isEmailVerified,
						};
						const token = jwt.sign(data, SECRET_KEY, {
							expiresIn: "86400s",
							algorithm: "HS256",
						});
						resolve(token);
					} else {
						reject(message["login.email_is_not_verified"]);
					}
				} else {
					reject(message["login.invalid_username_or_password"]);
				}
			} else {
				reject(message["login.invalid_username_or_password"]);
			}
		}).lean();
	});
};

exports.register = (data) => {
	return new Promise(async (resolve, reject) => {
		let decryptedPassword;
		try {
			decryptedPassword = await PublicModel.decrypt(data.password);
		} catch (error) {
			reject(error);
		}

		data.salt = crypto.randomBytes(16).toString("hex");
		data.password = crypto
			.pbkdf2Sync(decryptedPassword, data.salt, 1000, 64, `sha512`)
			.toString(`hex`);
		data.isEmailVerified = false;

		new schema.UserSchema(data).save((err, response) => {
			if (err) {
				if (err.code === 11000) {
					reject(message["register.username_taken"]);
				} else {
					reject(err);
				}
			} else {
				const data = response.toObject();
				const { password, salt, ...rest } = data;

				this.sendVerificationEmail(rest)
					.then((res) => {
						resolve(rest);
					})
					.catch((error) => reject(error));
			}
		});
	});
};

exports.authToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, SECRET_KEY, (err, user) => {
			if (err) {
				reject(message["auth.token_is_not_valid"]);
			} else {
				resolve(user);
			}
		});
	});
};

exports.sendVerificationEmail = (user) => {
	return new Promise(async (resolve, reject) => {
		const token = jwt.sign(user, SECRET_KEY, {
			expiresIn: "86400s",
			algorithm: "HS256",
		});

		try {
			let transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: NODEMAILER_AUTH_USER,
					pass: NODEMAILER_AUTH_PASS,
				},
			});
			ejs.renderFile(
				__dirname + "/../views/verification-email.ejs",
				{
					name: user.name,
					link: `${CLIENT_BASE_URL}/email-verification?token=${token}`,
				},
				(err, data) => {
					if (err) {
						reject(err);
					} else {
						let message = {
							from: {
								name: "No-Reply - Financial Diary App",
								address: "no-reply@financial-diary.com",
							},
							to: user.email,
							subject: "Financial Diary - Email Verification", // Subject line
							html: data,
							attachments: [
								{
									filename: "Logo-Full-Light.png",
									path:
										__dirname +
										"/../public/images/Logo-Full-Light.png",
									cid: "logo",
								},
							],
						};

						transporter.sendMail(message, (err, info) => {
							if (err) {
								reject("Error occurred. " + err.message);
							} else {
								resolve(true);
							}
						});
					}
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};

exports.verifyEmail = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, SECRET_KEY, (err, res) => {
			if (err) {
				reject(message["verify_email.invalid_token"]);
			} else {
				userModel
					.getById(res._id)
					.then((user) => {
						if (user.isEmailVerified) {
							reject(message["verify_email.already_verified"]);
						} else {
							userModel
								.edit(res._id, { isEmailVerified: true })
								.then((result) => resolve(true))
								.catch((err) => reject(err));
						}
					})
					.catch((error) =>
						reject(message["verify_email.invalid_token"])
					);
			}
		});
	});
};
