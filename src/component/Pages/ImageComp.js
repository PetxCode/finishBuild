import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ImageComp = ({ props }) => {
	const user = useSelector((state) => state.user);
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const mainURL = "http://localhost:2233";

			const url = `${mainURL}/api/user/${props.user}`;
			await axios.get(url).then((res) => {
				setData(res.data.data);
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<div>
			<Image src={data?.avatar} />
		</div>
	);
};

export default ImageComp;

const Image = styled.img`
	width: 100%;
	height: 200px;
	background-color: darkorange;
	object-fit: cover;
`;
