const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/users");
const path = require("path");

const app = express();

mongoose
	.connect(
		"mongodb+srv://ocuser:mongopassword@cluster0.lftb8.mongodb.net/sopekocko?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

// app.use((req, res, next) => {
// 	res.end("Voila la rep de l'app");
// });
module.exports = app;
