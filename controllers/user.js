const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const MD5 = require("crypto-js/hmac-md5");

exports.signup = (req, res, next) => {
	// validation du format de l'adresse email avec regex
	var emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	if (!emailExp.test(req.body.email)) {
		return res.status(400).json({ error: "Email adress is not valid!" });
	} else {
		//hashage du mot de passe
		bcrypt
			.hash(req.body.password, 10)
			.then((pHash) => {
				//hashage de l'email
				const emailHash = MD5(
					req.body.email,
					"SecretKeyForSoPekockoUsers"
				).toString();
				//création et enregistrement de l'utilisateur
				const user = new User({ email: emailHash, password: pHash });
				user
					.save()
					.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
					.catch((error) => res.status(400).json({ error }));
			})
			.catch((error) => res.status(500).json({ error }));
	}
};

exports.login = (req, res, next) => {
	//hashage de l'adresse email envoyé pour comparaison avec la base de donnée
	const emailHash = MD5(
		req.body.email,
		"SecretKeyForSoPekockoUsers"
	).toString();
	User.findOne({ email: emailHash })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}
			// vérification du mot de passe si l'utilisateur a été trouvé
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					//envoi de la réponse avec le userId et le jeton d'authentification
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							{ userId: user._id },
							"SOPEKOCKO_RandomTokenSecretKeyForSoPekockoUsers",
							{
								expiresIn: "12h",
							}
						),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
