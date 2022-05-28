import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import pix from "./babe.jpeg";
import { signOut } from "./GlobalState/Global";

const Header = () => {
	const [auth, authState] = useState(false);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	return (
		<Container>
			<Wrapper>
				<Navigation>
					<Logo to="/">Logo</Logo>

					{user ? (
						<div>
							<Nav to="/mainView">Main View</Nav>
							<Nav to="/best">Best</Nav>

							<Nav to="/createMemories">Create</Nav>
						</div>
					) : null}
				</Navigation>

				{user ? (
					<Navigation>
						<Avatar src={user?.avatar} />
						<strong style={{ marginRight: "10px" }}>{user.fullName}</strong>
						<Nav1
							onClick={() => {
								dispatch(signOut());
							}}
						>
							Log Out
						</Nav1>
					</Navigation>
				) : (
					<Navigation>
						<Nav to="/auth">Register</Nav>
						{/* <Nav to="/log">Log Out</Nav> */}
					</Navigation>
				)}
			</Wrapper>
		</Container>
	);
};

export default Header;

const Logo = styled(Link)`
	margin-right: 20px;
	font-style: italic;
	font-weight: 900;
	font-size: 30px;
	transition: all 350ms;
	color: black;
	text-decoration: none;

	:hover {
		cursor: pointer;
		transform: scale(1.02);
	}
`;

const Avatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	object-fit: cover;
	background-color: darkorange;
	margin-right: 20px;
`;

const Nav1 = styled.div`
	margin-right: 25px;
	transition: all 350ms;
	color: black;
	text-decoration: none;
	position: relative;

	::after {
		content: "";
		position: absolute;
		background-color: darkorange;
		height: 3px;
		width: 100%;
		left: 0;
		top: 21px;
		opacity: 0;
		transition: all 550ms;
		transform: scale(0);
		transform-origin: center left;
	}
	&.active {
		::after {
			content: "";
			position: absolute;
			background-color: darkorange;
			height: 3px;
			width: 80%;
			left: 0;
			top: 21px;
			opacity: 1;
			transition: all 550ms;
			transform: scale(1);
			transform-origin: center left;
		}
	}
	:hover {
		cursor: pointer;
		transform: scale(1.02);

		::after {
			opacity: 1;
			transform: scale(1);
		}
	}
`;

const Nav = styled(NavLink)`
	margin-right: 25px;
	transition: all 350ms;
	color: black;
	text-decoration: none;
	position: relative;

	::after {
		content: "";
		position: absolute;
		background-color: darkorange;
		height: 3px;
		width: 100%;
		left: 0;
		top: 21px;
		opacity: 0;
		transition: all 550ms;
		transform: scale(0);
		transform-origin: center left;
	}
	&.active {
		::after {
			content: "";
			position: absolute;
			background-color: darkorange;
			height: 3px;
			width: 80%;
			left: 0;
			top: 21px;
			opacity: 1;
			transition: all 550ms;
			transform: scale(1);
			transform-origin: center left;
		}
	}
	:hover {
		cursor: pointer;
		transform: scale(1.02);

		::after {
			opacity: 1;
			transform: scale(1);
		}
	}
`;

const Navigation = styled.div`
	display: flex;
	align-items: center;
`;

const Wrapper = styled.div`
	height: 100%;
	width: 95%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Container = styled.div`
	position: fixed;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	width: 100%;
	height: 70px;
	display: flex;
	justify-content: center;
	background-color: white;
	z-index: 10;
`;
