import React from "react";
import styled from "styled-components";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeBestMemories } from "./GlobalState";

const BestMemories = () => {
	const memo = useSelector((state) => state.bestMemories);
	const dispatch = useDispatch();
	return (
		<Container>
			<Wrapper>
				{memo?.map((props) => (
					<Card key={props._id}>
						<Image src={props.image} />

						<TextHolder>
							<Holder>
								<Title>{props.title}</Title>
								<Icon
									onClick={() => {
										dispatch(removeBestMemories(props));
									}}
								/>
							</Holder>
							<Message>{props.message}</Message>
						</TextHolder>
					</Card>
				))}
			</Wrapper>
		</Container>
	);
};

export default BestMemories;

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
