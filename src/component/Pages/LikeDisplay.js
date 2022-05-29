import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import styled from "styled-components";

const LikeDisplay = ({ props }) => {
	const postUser = props?.user;
	const user = useSelector((state) => state.user);
	const id = user._id;

	const deleteItems = async () => {
		const mainURL = "http://localhost:2233";
		const url = `${mainURL}/api/item/like/${id}/${props._id}/${id}`;
		await axios.delete(url).then((res) => {
			console.log(res.data.message, id);
		});
	};

	const addLikeItems = async () => {
		try {
			const mainURL = "http://localhost:2233";

			const url = `${mainURL}/api/item/like/${id}/${props._id}`;
			await axios.post(url, { isLiked: true }).then((res) => {
				console.log(res);
			});
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div>
			{props?.like?.includes(id) ? (
				<div>
					<Like
						onClick={() => {
							deleteItems();
						}}
					/>
				</div>
			) : (
				<div>
					<Like1
						onClick={() => {
							addLikeItems();
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default LikeDisplay;
const Like1 = styled(MdFavoriteBorder)`
	color: red;
	font-size: 20px;
	transition: all 350ms;

	:hover {
		transform: scale(1.05);
		cursor: pointer;
	}
`;
const Like = styled(MdFavorite)`
	color: red;
	font-size: 20px;
	transition: all 350ms;

	:hover {
		transform: scale(1.05);
		cursor: pointer;
	}
`;

const Hold = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
