const express = require("express");
const {
	createItems,
	getItems,
	getSingleItems,
	searchItems,
	updateItems,
	deleteItems,
	getSingleAllItems,
} = require("../controller/itemController");
const verify = require("../utils/verified");

const router = express.Router();

router.route("/:id").post(createItems);
router.route("/:id/:item").patch(verify, updateItems);
router.route("/:id/:item").delete(verify, deleteItems);
router.route("/all").get(getItems);
router.route("/search").get(searchItems);
router.route("/:id/:item").get(getSingleItems);
router.route("/:id").get(getSingleAllItems);

module.exports = router;
