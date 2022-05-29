import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiTwotoneDelete, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { allItems, removeItems, totalCollect } from "./GlobalState/Global";
import NameComp from "./Pages/NameComp";
import ImageComp from "./Pages/ImageComp";

const Preview = () => {
	const memo = useSelector((state) => state.cart);
	const cost = useSelector((state) => state.totalCollected);
	const balance = useSelector((state) => state.totalBalance);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(totalCollect());
	}, [memo]);

	return (
		<Container>
			{" "}
			<BalanceHolder>
				<Content bg="red">
					Total Money Collected: <span>#{cost}</span>
				</Content>
				<Content bg="green">
					Total Balance to give back: <span>#{balance}</span>
				</Content>
			</BalanceHolder>
			<Wrapper>
				{memo.length > 0 ? (
					<div>
						{memo?.map((props) => (
							<Card key={props._id}>
								<ImageComp props={props} />

								<TextHolder>
									<Holder>
										<Title1>{props.name}</Title1>
										<Icon
											onClick={() => {
												dispatch(removeItems(props));
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

								<NameComp props={props} />
							</Card>
						))}
					</div>
				) : (
					<center style={{ paddingTop: "100px" }}>
						<Card24>
							<Diva>
								No item selected or Perhaps you've purchased all Items... Greate
								Job rep!❤️❤️❤️🎉🍾🎊🎊🎊🎉🎉🎉🍾
							</Diva>
						</Card24>
					</center>
				)}
			</Wrapper>
		</Container>
	);
};

export default Preview;

const Diva = styled.div`
	text-align: center;
	font-weight: bold;
	font-size: 20px;
	color: #004080;
	text-transform: uppercase;
`;

const Content = styled.div`
	margin: 0 20px;
	padding: 10px 20px;
	color: white;
	background-color: ${({ bg }) => bg};
	box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
		rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
	border-radius: 3px;
	transition: all 350ms;

	:hover {
		cursor: pointer;
		transform: scale(1.03);
	}
	span {
		font-size: 20px;
		font-weight: 600;
	}
`;

const BalanceHolder = styled.div`
	margin-top: 40px;
	font-weight: 500;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Icon = styled(AiTwotoneDelete)`
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

const Card24 = styled.div`
	margin: 10px;
	width: 60%;
	min-height: 220px;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
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
	flex-direction: column;
	align-items: center;
	display: flex;
`;
