const jwt = require("jsonwebtoken");
const message = require("../constants/message");

exports.isAuthenticated = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
		if (err) {
			return res.status(401).json({
				status: 401,
				message: message["auth.token_is_not_valid"],
			});
		} else {
			req.user = user;
			next();
		}
	});
};
