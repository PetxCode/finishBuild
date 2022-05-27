const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
	service: process.env.SERVICE,
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	},
});

module.exports = transport;
