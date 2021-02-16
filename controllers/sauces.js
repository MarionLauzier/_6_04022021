const Sauce = require("../models/sauce");
const fs = require("fs");

exports.getAllSauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(404).json({ error }));
};

exports.getTheSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(404).json({ error }));
};

exports.addSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
		likes: 0,
		dislikes: 0,
		usersLiked: [],
		usersDisliked: [],
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Sauce enregistrée!" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.updateSauce = (req, res, next) => {
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body };
	// vérifier que le user a l'origine de la requête à l'autorisation de modifier cette sauce
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			if (sauce.userId == sauceObject.userId) {
				const oldImage = sauce.imageUrl.split("/images/")[1];
				Sauce.updateOne(
					{ _id: req.params.id },
					{ ...sauceObject, _id: req.params.id }
				)
					.then(() => {
						//suppression de l'ancienne photo dans le cas ou une nouvelle est chargée
						if (req.file) {
							fs.unlink(`images/${oldImage}`, (err) => {
								if (err) throw err;
							});
						}
						res.status(200).json({ message: "Sauce modifiée !" });
					})
					.catch((error) => res.status(400).json({ error }));
			} else {
				throw "Vous n'avez pas l'autorisation de modifier cette sauce!";
			}
		})
		.catch((error) => res.status(403).json({ error }));
};
// --------------------V2 de updateSauce
// exports.updateSauce = (req, res, next) => {
// 	const sauceObject = req.file
// 		? {
// 				...JSON.parse(req.body.sauce),
// 				imageUrl: `${req.protocol}://${req.get("host")}/images/${
// 					req.file.filename
// 				}`,
// 		  }
// 		: { ...req.body };
// 	// vérifier que le user a l'origine de la requête à l'autorisation de modifier cette sauce
// 	Sauce.findOne({ _id: req.params.id })
// 		.then((sauce) => {
// 			if (sauce.userId != sauceObject.userId) {
// 				return res
// 					.status(403)
// 					.json({
// 						error: "Vous n'avez pas l'autorisation de modifier cette sauce!",
// 					});
// 			}
// 			Sauce.updateOne(
// 				{ _id: req.params.id },
// 				{ ...sauceObject, _id: req.params.id }
// 			)
// 				.then(() => res.status(200).json({ message: "Sauce modifiée !" }))
// 				.catch((error) => res.status(400).json({ error }));
// 		})
// 		.catch((error) => res.status(500).json({ error }));
//
// };

exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split("/images/")[1];
			//suppression de l'image
			fs.unlink(`images/${filename}`, () => {
				//Suppression de la sauce dans la base de données
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "Sauce supprimée !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
	const user = req.body.userId;
	const like = req.body.like;
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			if (like == 1) {
				if (!sauce.usersLiked.includes(user)) {
					sauce.likes++;
					sauce.usersLiked.push(user);
				}
			} else if (like == 0) {
				if (sauce.usersLiked.includes(user)) {
					sauce.likes--;
					const indexL = sauce.usersLiked.indexOf(user);
					sauce.usersLiked.splice(indexL, 1);
				} else if (sauce.usersDisliked.includes(user)) {
					sauce.dislikes--;
					const indexD = sauce.usersDisliked.indexOf(user);
					sauce.usersDisliked.splice(indexD, 1);
				}
			} else if (like == -1) {
				if (!sauce.usersDisliked.includes(user)) {
					sauce.dislikes++;
					sauce.usersDisliked.push(user);
				}
			} else {
				throw "La requête est erronnée!";
			}
			sauce
				.save()
				.then(() =>
					res.status(200).json({ message: "Préférences enregistrées!" })
				)
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
