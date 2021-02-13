const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(
			token,
			"SOPEKOCKO_RandomTokenSecretKeyForSoPekockoUsers"
		);
		const userId = decodedToken.userId;
		const bodyUserId = req.file ? req.body.sauce.userId : req.body.userId;
		if (bodyUserId && bodyUserId !== userId) {
			throw "Invalid user ID";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!"),
		});
	}
};
