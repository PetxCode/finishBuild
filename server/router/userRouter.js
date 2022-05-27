const express = require("express");
const {
	getAllUsers,
	getSingleUser,
	editSingleUser,
	createUser,
	verifyUser,
	signinUser,
	createAdmin,
	verifyAdmin,
} = require("../controller/userController");
const upload = require("../utils/multer");
const router = express.Router();

router.route("/admin/:id/:token").post(verifyAdmin);
router.route("/registerAdmin").post(upload, createAdmin);

router.route("/:id/:token").get(verifyUser);

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser).patch(editSingleUser);

router.route("/register").post(upload, createUser);
router.route("/signin").post(signinUser);

module.exports = router;
