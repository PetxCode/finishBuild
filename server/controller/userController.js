const userModel = require("../model/userModel");
const verifiedModel = require("../model/verifiedModel");
const cloudinary = require("../utils/cloudinary");
const transport = require("../utils/email");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
	try {
		const user = await userModel.find();
		res.status(200).json({
			message: "success",
			data: user,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const getSingleUser = async (req, res) => {
	try {
		const user = await userModel.findById(req.params.id);
		res.status(200).json({
			message: "success",
			data: user,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const editSingleUser = async (req, res) => {
	try {
		const { fullName, phone, email } = req.body;

		const user = await userModel.findOne({ email });
		if (user) {
			await cloudinary.uploader.destroy(user.avatarID);
			const image = await cloudinary.uploader.upload(req.file.path);
			const mainUser = await userModel.findByIdAndUpdate(
				req.params.id,
				{
					fullName,
					phone,
					avatar: image.secure_url,
					avatarID: image.public_id,
				},
				{ new: true }
			);
			res.status(200).json({
				message: "success",
				data: mainUser,
			});
		} else {
			res.status(404).json({
				message: error.message,
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const createUser = async (req, res) => {
	try {
		const { email, password, fullName, phone } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);
		const image = await cloudinary.uploader.upload(req.file.path);

		const tokenValue = crypto.randomBytes(64).toString("hex");
		const myToken = jwt.sign({ tokenValue }, process.env.SECRET, {
			expiresIn: process.env.EXPIRES,
		});

		const user = await userModel.create({
			email,
			password: hashed,
			fullName,
			phone,
			avatar: image.secure_url,
			avatarID: image.public_id,
			verifiedToken: myToken,
		});

		await verifiedModel.create({
			token: myToken,
			userID: user._id,
			_id: user._id,
		});

		const mailOptions = {
			from: "ajmarketplace52@gmail.com",
			to: email,
			subject: "Account verification",
			html: `
            <h3>
            Thanks for sign up with us ${user.fullName}, Please use the <a
            href="http://localhost:3000/auth/${user._id}/${myToken}"
            >Link to complete your sign up</a>
            </h3>
            `,
		};

		transport.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err.message);
			} else {
				console.log("Email has been sent to your inbox", info.response);
			}
		});

		res.status(201).json({
			message: "Check your inbox to continue...!",
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const verifyUser = async (req, res) => {
	try {
		const user = await userModel.findById(req.params.id);
		if (user) {
			if (user.verifiedToken !== "") {
				await userModel.findByIdAndUpdate(
					user._id,
					{
						isVerify: true,
						verifiedToken: "",
					},
					{ new: true }
				);
				await verifiedModel.findByIdAndUpdate(
					user._id,
					{
						userID: user._id,
						token: "",
					},
					{ new: true }
				);

				res.status(201).json({
					message: "Verification complete, you can go sign in now!",
				});
			} else {
				res.status(404).json({
					message: error.message,
				});
			}
		} else {
			res.status(404).json({
				message: error.message,
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const createAdmin = async (req, res) => {
	try {
		const { email, password, fullName, phone } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);
		const image = await cloudinary.uploader.upload(req.file.path);

		const tokenValue = crypto.randomBytes(64).toString("hex");
		const adminToken = crypto.randomBytes(5).toString("hex");

		const myToken = jwt.sign({ tokenValue }, process.env.SECRET, {
			expiresIn: process.env.EXPIRES,
		});

		const user = await userModel.create({
			email,
			password: hashed,
			fullName,
			phone,
			avatar: image.secure_url,
			avatarID: image.public_id,
			verifiedToken: myToken,
			OTP: adminToken,
		});

		await verifiedModel.create({
			token: myToken,
			userID: user._id,
			_id: user._id,
		});

		const mailOptions = {
			from: "ajmarketplace52@gmail.com",
			to: email,
			subject: "Account verification",
			html: `
            <h3>
            Thanks for sign up with us ${user.fullName}, Please use the <a
            href="http://localhost:3000/auth/admin/${user._id}/${myToken}"
            >Link to complete your sign up use your secret key to complete this sign up: </a><h2><strong>${adminToken}</strong></h2> 
            </h3>
            `,
		};

		transport.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err.message);
			} else {
				console.log("Email has been sent to your inbox", info.response);
			}
		});

		res.status(201).json({
			message: "Check your inbox to continue...!",
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const verifyAdmin = async (req, res) => {
	try {
		const { mainOTP } = req.body;

		const user = await userModel.findById(req.params.id);
		if (user) {
			if (user.verifiedToken !== "") {
				if (user.OTP === mainOTP) {
					await userModel.findByIdAndUpdate(
						user._id,
						{
							isVerify: true,
							isAdmin: true,
							verifiedToken: "",
							OTP: "",
						},
						{ new: true }
					);

					await verifiedModel.findByIdAndUpdate(
						user._id,
						{
							userID: user._id,
							token: "",
						},
						{ new: true }
					);

					res.status(201).json({
						message: "Verification complete, you can go sign in now!",
					});
				}
			} else {
				res.status(404).json({
					message: error.message,
				});
			}
		} else {
			res.status(404).json({
				message: error.message,
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const signinUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });
		if (user) {
			const check = await bcrypt.compare(password, user.password);
			if (check) {
				if (user.isVerify) {
					const token = jwt.sign(
						{
							_id: user._id,
							isVerify: user.isVerify,
							isAdmin: user.isAdmin,
						},
						process.env.SECRET,
						{ expiresIn: process.env.EXPIRES_DATE }
					);
					const { password, ...info } = user._doc;

					res.status(201).json({
						message: `Welcome back ${user.fullName}`,
						data: { token, ...info },
					});
				} else {
					if (user.OTP !== "") {
						const tokenValue = crypto.randomBytes(64).toString("hex");
						const adminToken = crypto.randomBytes(5).toString("hex");

						const myToken = jwt.sign({ tokenValue }, process.env.SECRET, {
							expiresIn: process.env.EXPIRES,
						});

						const mailOptions = {
							from: "ajmarketplace52@gmail.com",
							to: email,
							subject: "Account verification",
							html: `
            <h3>
            Thanks for sign up with us ${user.fullName}, Please use the <a
            href="http://localhost:2233/api/user/admin/${user._id}/${myToken}"
            >Link to complete your sign up use your secret key to complete this sign up: </a><h2><strong>${adminToken}</strong></h2> 
            </h3>
            `,
						};

						transport.sendMail(mailOptions, (err, info) => {
							if (err) {
								console.log(err.message);
							} else {
								console.log("Email has been sent to your inbox", info.response);
							}
						});

						res.status(201).json({
							message: "Check your inbox to continue...!",
						});
					} else {
						const tokenValue = crypto.randomBytes(64).toString("hex");
						const myToken = jwt.sign({ tokenValue }, process.env.SECRET, {
							expiresIn: process.env.EXPIRES,
						});

						const mailOptions = {
							from: "ajmarketplace52@gmail.com",
							to: email,
							subject: "re-verification of your Account ",
							html: `
            <h3>
            Thanks for sign up with us ${user.fullName}, Please use the <a
            href="http://localhost:2233/api/user/${user._id}/${myToken}"
            >Link to complete your sign up</a> for re-verification of your account
            </h3>
            `,
						};

						transport.sendMail(mailOptions, (err, info) => {
							if (err) {
								console.log(err.message);
							} else {
								console.log("Email has been sent to your inbox", info.response);
							}
						});

						res.status(201).json({
							message: "Check your inbox to continue...!",
						});
					}
				}
			} else {
				res.status(404).json({
					message: error.message,
				});
			}
		} else {
			res.status(404).json({
				message: error.message,
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const forgetPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await userModel.findOne({ email });

		if (user) {
			if (user.isVerify && user.verifiedToken === "") {
				const tokenValue = crypto.randomBytes(64).toString("hex");

				const myToken = jwt.sign({ tokenValue }, process.env.SECRET, {
					expiresIn: process.env.EXPIRES,
				});

				await userModel.findByIdAndUpdate(
					user._id,
					{
						verifiedToken: myToken,
					},
					{ new: true }
				);

				const mailOptions = {
					from: "ajmarketplace52@gmail.com",
					to: email,
					subject: "Reset Password",
					html: `
            <h3>
            You requested for password reset ${user.fullName}, Please use the <a
            href="http://localhost:3000/reset/${user._id}/${myToken}"
            >Link to complete your sign up use your secret key to complete this sign up: </a><h2></h2> 
            </h3>
            `,
				};

				transport.sendMail(mailOptions, (err, info) => {
					if (err) {
						console.log(err.message);
					} else {
						console.log("Email has been sent to your inbox", info.response);
					}
				});

				res.status(201).json({
					message: "Check your inbox to continue...!",
				});
			} else {
				res.status(201).json({ message: "This can't be carried out" });
			}
		} else {
			res.status(201).json({ message: "user is not in our database" });
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const newPassword = async (req, res) => {
	try {
		const { password } = req.body;
		const user = await userModel.findById(req.params.id);

		if (user) {
			if (user.verifiedToken === req.params.token) {
				const salt = await bcrypt.genSalt(10);
				const hashed = await bcrypt.hash(password, salt);

				await userModel.findByIdAndUpdate(
					user._id,
					{
						password: hashed,
						verifiedToken: "",
					},
					{ new: true }
				);

				res.status(201).json({
					message: "Your password has been changed, please sign in now!",
				});
			} else {
				res.status(201).json({ message: "wrong token, access deny" });
			}
		} else {
			res.status(201).json({ message: "user is not in our database" });
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

// const getAllUsers = async(req, res) => {
//    try {

//    } catch (error) {
//        res.status(404).json({
//            message: error.message
//        })
//    }
// }

module.exports = {
	editSingleUser,
	getAllUsers,
	getSingleUser,
	createUser,
	verifyUser,
	signinUser,
	createAdmin,
	verifyAdmin,
	forgetPassword,
	newPassword,
};
