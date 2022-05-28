import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import pix from "./babe.jpeg";
import { useSelector } from "react-redux";

const CreateRequest = () => {
	const user = useSelector((state) => state.user);
	const id = user?._id;
	console.log(user.token, id);

	const navigate = useNavigate();

	const formSchema = yup.object().shape({
		name: yup.string().required("This field cannot be empty"),
		given: yup.number().required("This field cannot be empty"),
		balance: yup.number().required("This field cannot be empty"),
		quantity: yup.number().required("This field cannot be empty"),
		description: yup.string().required("This field cannot be empty"),
	});

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(formSchema),
	});

	const onSubmit = handleSubmit(async (value) => {
		console.log(value);
		const { name, balance, given, quantity, description } = value;
		const path = "http://localhost:2233";
		const url = `${path}/api/item/${id}`;

		const config = {
			authorization: `CodeLab ${user?.token}`,
		};

		await axios.post(
			url,
			{ name, balance, given, quantity, description },
			config
		);

		navigate("/");
	});

	return (
		<Container>
			<Wrapper>
				<Card>
					<Form onSubmit={onSubmit}>
						<Holder>
							<Label>Name</Label>
							<Input placeholder="Name" {...register("name")} />
							<Error>{errors.message && errors?.message.name}</Error>
						</Holder>
						<Holder>
							<Label>Amount Given</Label>
							<Input placeholder="Amount Given" {...register("given")} />
							<Error>{errors.message && errors?.message.given}</Error>
						</Holder>
						<Holder>
							<Label>Quantity</Label>
							<Input placeholder="Quantity" {...register("quantity")} />
							<Error>{errors.message && errors?.message.quantity}</Error>
						</Holder>
						<Holder>
							<Label>Balance</Label>
							<Input placeholder="Balance" {...register("balance")} />
							<Error>{errors.message && errors?.message.balance}</Error>
						</Holder>

						<Holder>
							<Label>Description</Label>
							<InputArea
								placeholder="Description"
								{...register("description")}
							/>
							<Error>{errors.message && errors?.message.description}</Error>
						</Holder>

						<Button>Create Request</Button>
					</Form>
				</Card>
			</Wrapper>
		</Container>
	);
};

export default CreateRequest;

const Span = styled(Link)`
	margin-left: 5px;
	text-decoration: none;
	color: darkorange;
	cursor: pointer;
`;

const Div = styled.div`
	display: flex;
	margin-top: 10px;
`;

const Button = styled.button`
	width: 80%;
	margin-top: 30px;
	height: 40px;
	font-family: Poppins;
	font-size: 20px;
	text-transform: uppercase;
	color: white;
	font-weight: 300;
	outline: none;
	border: 0;
	background-color: #004080;

	transition: all 350ms;
	:hover {
		cursor: pointer;
		transform: scale(1.01);
	}
`;

const Error = styled.div`
	color: red;
	font-weight: 500;
	font-size: 12px;
`;

const InputArea = styled.textarea`
	width: 100%;
	height: 150px;
	border-radius: 3px;
	padding-left: 5px;

	resize: none;
	::placeholder {
		font-family: Poppins;
	}
	border: 1px solid silver;
	outline: none;
`;

const Input = styled.input`
	width: 100%;
	height: 30px;
	border-radius: 3px;
	padding-left: 5px;
	::placeholder {
		font-family: Poppins;
	}
	border: 1px solid silver;
	outline: none;
`;

const Label = styled.label`
	font-weight: 500;
`;

const Holder = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	align-items: flex-start;
	margin-top: 10px;
`;

const Form = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 28px;
`;

const ImageInput = styled.input`
	display: none;
`;

const ImageLabel = styled.label`
	padding: 10px 20px;
	background-color: #004080;
	color: white;
	border-radius: 3px;
	transition: all 350ms;
	:hover {
		cursor: pointer;
		transform: scale(1.01);
	}
`;

const ImageHolder = styled.div`
	width: 100%;
	align-items: center;
	display: flex;
	flex-direction: column;
`;

const Image = styled.img`
	width: 300px;
	height: 200px;
	object-fit: cover;
	border-radius: 5px;
	background-color: darkorange;
	margin-bottom: 20px;

	transition: all 350ms;
	:hover {
		cursor: pointer;
		transform: scale(1.02);
	}
`;

const Card = styled.div`
	box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
		rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
	width: 500px;
	min-height: 650px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	padding: 20px 0;
	flex-direction: column;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	justify-content: center;
	display: flex;
	align-items: center;
`;

const Container = styled.div`
	width: 100%;
	height: calc(100vh - 70px);
	padding-top: 70px;
`;
