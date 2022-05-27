import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
};

const Global = createSlice({
	name: "authUser",
	initialState,
	reducers: {
		createUser: (state, { payload }) => {
			state.user = payload;
		},

		signOut: (state) => {
			state.user = null;
		},
	},
});

export const { createUser, signOut } = Global.actions;

export default Global.reducer;
