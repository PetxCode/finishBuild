const userModel = require("../model/userModel");
const itemModel = require("../model/itemsModel");
const ratingModel = require("../model/ratingModel");
const mongoose = require("mongoose");

const createRating = async (req, res) => {
	try {
		const { count, user } = req.body;
		const myUser = await ratingModel.findOne({ user: req.params.id });
		newUser = myUser?.user.toString();
		console.log(newUser);

		if (newUser === req.params.id) {
			res.status(201).json({ message: "Already ratings", data: user });
		} else {
			const getItems = await itemModel.findById(req.params.item);
			const addrating = new ratingModel({
				count,
				user: req.params.id,
			});

			addrating.item = getItems;
			addrating.save();

			getItems.rating.push(mongoose.Types.ObjectId(addrating._id));
			getItems.save();

			res.status(201).json({ message: "add rating", data: addrating });
		}
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const viewRating = async (req, res) => {
	try {
		const addrating = await itemModel
			.findById(req.params.item)
			.populate("rating");

		res.status(201).json({
			total: addrating.length,
			message: "view rating",
			data: addrating,
		});
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const unRating = async (req, res) => {
	try {
		const disrating = await itemModel.findById(req.params.item);

		const remove = await ratingModel.findByIdAndRemove(req.params.rating);

		disrating.rating.pull(remove);
		disrating.save();

		res.status(201).json({ message: "remove successfully" });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

// const createLike = async(req, res) => {
//     try{

//     }catch(err){
//         res.status(404).json({message: err.message})
//     }
// }

module.exports = {
	viewRating,
	createRating,
	unRating,
};
