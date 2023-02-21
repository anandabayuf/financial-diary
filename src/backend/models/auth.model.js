const schema = require("./schema");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const message = require("../constants/message");
const PublicModel = require("./public.model");

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
					const data = {
						id: response._id,
						username: response.username,
						name: response.name,
					};
					const token = jwt.sign(data, process.env.SECRET_KEY, {
						expiresIn: "86400s",
						algorithm: "HS256",
					});
					resolve(token);
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

		new schema.UserSchema(data).save((err, response) => {
			if (err) {
				if (err.code === 11000) {
					reject(message["register.username_taken"]);
				} else {
					reject(err);
				}
			} else {
				// console.log(response);
				resolve(response.toObject());
			}
		});
	});
};

exports.authToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
			if (err) {
				reject(message["auth.token_is_not_valid"]);
			} else {
				resolve(user);
			}
		});
	});
};
