const userModel = require("../model/userModel");
const itemsModel = require("../model/itemsModel");
const mongoose = require("mongoose");

const createItems = async (req, res) => {
	try {
		// if (req.user.isVerify) {
		const { name, description, given, balance, quantity } = req.body;

		const getUser = await userModel.findById(req.params.id);
		const createItems = new itemsModel({
			name,
			description,
			given,
			balance,
			quantity,
		});

		createItems.user = getUser;
		createItems.save();

		getUser.item.push(mongoose.Types.ObjectId(createItems._id));
		getUser.save();

		res.status(201).json({
			message: "items has been created",
			data: createItems,
		});
		// } else {
		// 	res.status(201).json({
		// 		message: "check your access",
		// 	});
		// }
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const getItems = async (req, res) => {
	try {
		const { pages, limit } = req.query;

		const allItems = await itemsModel
			.find()
			.limit(limit)
			.skip((pages - 1) * limit);

		res.status(201).json({
			total: allItems.length,
			message: "items has been created",
			data: allItems,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const searchItems = async (req, res) => {
	try {
		const makeSearch = req.query.search
			? {
					$or: [
						{ name: { $regex: req.query.search, $options: "i" } },
						{ description: { $regex: req.query.search, $options: "i" } },
						{ given: { $regex: req.query.search, $options: "i" } },
					],
			  }
			: {};

		const allItems = await itemsModel.find(makeSearch);

		res.status(201).json({
			message: "items has been created",
			data: allItems,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const getSingleItems = async (req, res) => {
	try {
		const allItems = await itemsModel.findById(req.params.item);

		res.status(201).json({
			message: "items has been created",
			data: allItems,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const getSingleAllItems = async (req, res) => {
	try {
		const allItems = await userModel.findById(req.params.id).populate("item");

		res.status(201).json({
			message: "items has been created",
			data: allItems,
		});
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const updateItems = async (req, res) => {
	try {
		if (req.user.isVerify) {
			const { name, description, given, balance, quantity } = req.body;

			const updateData = await itemsModel.findByIdAndUpdate(
				req.params.item,
				req.body,
				{ new: true }
			);
			res.status(201).json({
				message: "updated",
				data: updateData,
			});
		} else {
			res.status(404).json({
				message: "invalid token",
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const deleteItems = async (req, res) => {
	try {
		if (req.user.isVerify && req.user.isAdmin) {
			const user = await userModel.findById(req.params.id);
			const deleteData = await itemsModel.findByIdAndRemove(req.params.item);

			user.item.pull(deleteData);
			user.save();

			res.status(201).json({
				message: "deleted successfully",
			});
		} else {
			res.status(404).json({
				message: "You cannot perform this Task",
			});
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
};

// const getItems = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(404).json({
//             message: error.message,
//         })
//     }
// }

module.exports = {
	createItems,
	getItems,
	// getSingleItems,
	getSingleItems,
	searchItems,
	updateItems,
	deleteItems,
	getSingleAllItems,
};
