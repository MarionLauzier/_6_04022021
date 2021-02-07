const express = require("express");

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/users");

const app = express();
app.use((req, res, next) => {
	res.end("Voila la rep de l'app");
});

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);
module.exports = app;
