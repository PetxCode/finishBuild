import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	items: [],
	cart: [],
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
	},
});

export const { createUser, signOut, allItems, cartItems, removeItems } =
	Global.actions;

export default Global.reducer;
