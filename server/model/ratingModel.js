const mongoose = require("mongoose");
const ratingModel = mongoose.Schema(
	{
		count: { type: Number },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		item: { type: mongoose.Schema.Types.ObjectId, ref: "items" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("ratings", ratingModel);
