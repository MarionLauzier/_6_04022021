const mongoose = require("mongoose");
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "L'email n'est pas valide !";

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
	email: {
		type: mongoose.SchemaTypes.Email,
		correctTld: true,
		required: true,
		unique: true,
	},
	password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
