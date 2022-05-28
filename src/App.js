import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthAdminRegister from "./component/AuthAdminRegister";
import AuthRegister from "./component/AuthRegister";
import Confirm from "./component/Confirm";
import Header from "./component/Header";
import MainAuthScreen from "./component/MainAuthScreen";
import AdminPage from "./component/Pages/AdminPage";
import Private from "./component/Pages/Private";
import UserPage from "./component/Pages/UserPage";
import ScrollToTop from "./component/ScrollToTop";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import SignUpAdmin from "./component/SignUpAdmin";

const App = () => {
	const user = useSelector((state) => state.user);
	return (
		<BrowserRouter>
			<Header />
			<ScrollToTop>
				<Routes>
					<Route path="/auth/:id/:token" element={<AuthRegister />} />
					<Route
						path="/auth/admin/:id/:token"
						element={<AuthAdminRegister />}
					/>

					<Route path="/confirm" element={<Confirm />} />
					<Route path="/signupAdmin" element={<SignUpAdmin />} />
					<Route path="/signup/signin" element={<SignIn />} />

					<Route path="/signup" element={<SignUp />} />
					{user ? <Route path="/user" element={<UserPage />} /> : null}

					<Route path="/auth" element={<MainAuthScreen />} />
					<Route path="/auth/signin" element={<SignIn />} />

					<Route
						path="/"
						element={
							<Private>
								<AdminPage />
							</Private>
						}
					/>
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default App;
