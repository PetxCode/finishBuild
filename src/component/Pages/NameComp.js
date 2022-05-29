import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const NameComp = ({ props }) => {
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
		<Div>
			This Item is for: <span>{data.fullName}</span>
		</Div>
	);
};

export default NameComp;

const Div = styled.div`
	margin: 10px;
	text-transform: uppercase;

	span {
		font-weight: 700;
	}
`;
