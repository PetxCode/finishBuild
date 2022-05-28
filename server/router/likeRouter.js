const express = require("express");
const {
	viewLike,
	createLike,
	unLike,
} = require("../controller/likeController");
const router = express.Router();

router.route("/:id/:item").get(viewLike).post(createLike);
router.route("/:id/:item/:like").delete(unLike);

module.exports = router;
