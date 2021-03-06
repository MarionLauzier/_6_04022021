const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/users");
const path = require("path");

const app = express();
//connexion à la base de données
mongoose
	.connect(
		"mongodb+srv://sopekockouser:hotsauce@cluster0.lftb8.mongodb.net/sopekocko?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));
// paramétrage des en-tête des autorisations
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
