const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
	try {
		const authToken = req.headers.authorization;

		if (authToken) {
			const token = authToken.split(" ")[1];
			if (token) {
				jwt.verify(token, process.env.SECRET, (err, payload) => {
					if (err) {
						res.status(404).json({
							message: err.message,
						});
					} else {
						req.user = payload;
						next();
					}
				});
			} else {
				res.status(404).json({
					message: "unauthorized/invalid token",
				});
			}
		} else {
			res.status(404).json({
				message: "You can Access this operation",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
};

module.exports = verify;
