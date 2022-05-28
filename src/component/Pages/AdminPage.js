import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiTwotoneDelete, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { allItems, cartItems } from "../GlobalState/Global";

const MainScreen = () => {
	const memo = useSelector((state) => state.items);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const getItems = async (req, res) => {
		try {
			const mainURL = "http://localhost:2233";

			const url = `${mainURL}/api/item/all`;
			await axios.get(url).then((res) => {
				console.log(res.data.data);
				dispatch(allItems(res.data.data));
			});
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<Container>
			<Wrapper>
				{memo?.map((props) => (
					<Card key={props._id}>
						<Image src={user.avatar} />

						<TextHolder>
							<Holder>
								<Title1>{props.name}</Title1>
								<Icon
									onClick={() => {
										dispatch(cartItems(props));
									}}
								/>
							</Holder>
							<Message>{props.description}</Message>
							<br />
							<Holder>
								<Title>Amount: {props.given}</Title>
								<Title>Change: {props.balance}</Title>
								<Title>QTY: {props.quantity}</Title>
							</Holder>
						</TextHolder>
					</Card>
				))}
			</Wrapper>
		</Container>
	);
};

export default MainScreen;

const Icon = styled(AiFillEye)`
	color: red;
	font-size: 25px;
	transition: all 350ms;
	transform: scale(1);
	transform-origin: center;
	:hover {
		cursor: pointer;
		transform: scale(1.01);
	}
`;
const Holder = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Message = styled.div`
	color: gray;
`;

const Title = styled.div`
	text-transform: uppercase;
	font-weight: 500;
	font-size: 12px;
`;

const Title1 = styled.div`
	text-transform: uppercase;
	font-weight: 500;
`;

const TextHolder = styled.div`
	padding: 5px 10px;
`;

const Image = styled.img`
	width: 100%;
	height: 200px;
	background-color: darkorange;
	object-fit: cover;
`;

const Card = styled.div`
	margin: 10px;
	width: 300px;
	min-height: 320px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
`;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding-top: 40px;
`;

const Container = styled.div`
	width: 100%;
	min-height: calc(100vh - 70px);
	height: 100%;
	padding-top: 70px;
`;
