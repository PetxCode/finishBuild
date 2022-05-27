const mongoose = require("mongoose");
const verifiedModel = mongoose.Schema(
	{
		token: {
			type: String,
		},
		userID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("verifieds", verifiedModel);
