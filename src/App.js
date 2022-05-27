import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthAdminRegister from "./component/AuthAdminRegister";
import AuthRegister from "./component/AuthRegister";
import Confirm from "./component/Confirm";
import Header from "./component/Header";
import AdminPage from "./component/Pages/AdminPage";
import Private from "./component/Pages/Private";
import UserPage from "./component/Pages/UserPage";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import SignUpAdmin from "./component/SignUpAdmin";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/auth/:id/:token" element={<AuthRegister />} />
				<Route path="/auth/admin/:id/:token" element={<AuthAdminRegister />} />

				<Route path="/signup" element={<SignUp />} />
				<Route path="/confirm" element={<Confirm />} />
				<Route path="/signupAdmin" element={<SignUpAdmin />} />
				<Route path="/signup/signin" element={<SignIn />} />
				<Route path="/signupAdmin/signin" element={<SignIn />} />

				<Route path="/user" element={<UserPage />} />

				<Route
					path="/"
					element={
						<Private>
							<AdminPage />
						</Private>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
