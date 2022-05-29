import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	items: [],
	cart: [],
	totalCollected: 0,
	totalBalance: 0,
};

const Global = createSlice({
	name: "authUser",
	initialState,
	reducers: {
		createUser: (state, { payload }) => {
			state.user = payload;
		},
		allItems: (state, { payload }) => {
			state.items = payload;
		},

		cartItems: (state, { payload }) => {
			const check = state.cart.findIndex((el) => el._id === payload._id);
			if (check >= 0) {
				return;
			} else {
				state.cart.push({ ...payload });
			}
		},

		removeItems: (state, { payload }) => {
			state.cart = state.cart.filter((el) => el._id !== payload._id);
		},

		signOut: (state) => {
			state.user = null;
		},

		totalCollect: (state, { payload }) => {
			const { Money, Balance } = state.cart.reduce(
				(totalGiven, totalToGive) => {
					const { given, balance } = totalToGive;

					totalGiven.Balance += balance;
					totalGiven.Money += given;

					return totalGiven;
				},
				{
					Money: 0,
					Balance: 0,
				}
			);
			state.totalCollected = Money;
			state.totalBalance = Balance;
		},

		totalState: (state, { payload }) => {
			const { totalCost, totalDays } = state.bookings.reduce(
				(totalPrice, allBookings) => {
					const { price, QTY } = allBookings;

					const mainCost = price * QTY;

					totalPrice.totalDays += QTY;
					totalPrice.totalCost += mainCost;

					return totalPrice;
				},
				{
					totalCost: 0,
					totalDays: 0,
				}
			);

			state.tatalRoomCost = totalCost;
			state.totalRoomDays = totalDays;
		},
	},
});

export const {
	createUser,
	signOut,
	allItems,
	cartItems,
	removeItems,
	totalCollect,
	totalState,
} = Global.actions;

export default Global.reducer;
