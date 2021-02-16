const jwt = require("jsonwebtoken");
const Sauce = require("../models/sauce");

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
		} else if (req.method == "DELETE") {
			Sauce.findOne({ _id: req.params.id })
				.then((sauce) => {
					if (sauce.userId != userId) {
						throw "Not allowed to delete this sauce!";
					} else {
						next();
					}
				})
				.catch((error) => res.status(401).json({ error }));
		} else {
			next();
		}
	} catch (error) {
		console.log(error);
		res.status(401).json({
			error: error || "Invalid request !",
		});
	}
};
