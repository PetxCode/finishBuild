const mongoose = require("mongoose");
const likeModel = mongoose.Schema(
	{
		count: { type: Number, default: 1 },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		item: { type: mongoose.Schema.Types.ObjectId, ref: "items" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("likes", likeModel);
