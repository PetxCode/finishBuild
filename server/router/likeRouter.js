const express = require("express");
const {
	viewLike,
	createLike,
	unLike,
	viewAllLike,
} = require("../controller/likeController");
const router = express.Router();

router.route("/:id/:item").get(viewLike).post(createLike);
router.route("/:id/:item/:like").delete(unLike);
router.route("/").get(viewAllLike);

module.exports = router;
