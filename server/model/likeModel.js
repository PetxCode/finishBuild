const mongoose = require("mongoose");
const likeModel = mongoose.Schema(
	{
		isLiked: { type: Boolean, default: false },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		item: { type: mongoose.Schema.Types.ObjectId, ref: "items" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("likes", likeModel);
