const mongoose = require("mongoose");
const userModel = mongoose.Schema(
	{
		fullName: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			trim: true,
		},
		phone: {
			type: Number,
		},
		avatar: {
			type: String,
		},
		avatarID: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
		},
		isVerify: {
			type: Boolean,
		},

		OTP: {
			type: String,
		},

		mainOTP: {
			type: String,
		},

		verifiedToken: {
			type: String,
		},
		item: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "items",
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", userModel);
