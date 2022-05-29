const userModel = require("../model/userModel");
const itemModel = require("../model/itemsModel");
const likeModel = require("../model/likeModel");
const mongoose = require("mongoose");

const createLike = async (req, res) => {
	try {
		const { count, user } = req.body;
		const myUser = await likeModel.findOne({ user: req.params.id });
		newUser = myUser?.user.toString();
		console.log(newUser);

		if (myUser) {
			return res.status(201).json({ message: "Already Liked" });
		} else {
			const getItems = await itemModel.findById(req.params.item);
			const addLike = new likeModel({
				_id: req.params.id,
				isLiked: true,
				user: req.params.id,
			});

			addLike.item = getItems;
			addLike.save();

			getItems.like.push(mongoose.Types.ObjectId(addLike._id));
			getItems.save();

			res.status(201).json({ message: "add Like", data: addLike });
		}
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const viewLike = async (req, res) => {
	try {
		const addLike = await itemModel.findById(req.params.item).populate("like");

		res.status(201).json({ message: "add Like", data: addLike });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const viewAllLike = async (req, res) => {
	try {
		const addLike = await likeModel.find();
		// .populate("like");

		res.status(201).json({
			message: "view all Like",
			data: addLike,
		});
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const unLike = async (req, res) => {
	try {
		const disLike = await itemModel.findById(req.params.item);

		const remove = await likeModel.findByIdAndRemove(req.params.like);

		disLike.like.pull(remove);
		disLike.save();

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
	viewLike,
	createLike,
	unLike,
	viewAllLike,
};
