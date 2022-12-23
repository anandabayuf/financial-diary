const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
		if (err) {
			return res.status(401).json({
				status: 401,
				message:
					"A client is forbidden from accessing a valid resource",
			});
		} else {
			req.user = user;
			next();
		}
	});
};
