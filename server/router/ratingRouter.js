const express = require("express");
const {
	viewRating,
	createRating,
	unRating,
} = require("../controller/ratingController");
const router = express.Router();

router.route("/:id/:item").get(viewRating).post(createRating);
router.route("/:id/:item/:rating").delete(unRating);

module.exports = router;
