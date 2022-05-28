import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import pix from "./babe.jpeg";

const MainAuthScreen = () => {
	const navigate = useNavigate();
	const [image, setImage] = useState(pix);
	const [avatar, setAvatar] = useState("");
	const [toggle, setToggle] = useState(false);
	const [toggleAdmin, setToggleAdmin] = useState(true);

	const formSchema = yup.object().shape({
		userName: yup.string().required("This field cannot be empty"),
		email: yup.string().email().required("This field cannot be empty"),
		password: yup.string().required("This field cannot be empty"),
		confirm: yup
			.string()
			.oneOf([yup.ref("password"), null], "Password must match"),
	});

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(formSchema),
	});

	const handleImage = (e) => {
		const file = e.target.files[0];
		const save = URL.createObjectURL(file);
		setImage(save);
		setAvatar(file);
	};

	const onSubmitAdmin = handleSubmit(async (value) => {
		console.log(value);
		const { userName, email, password } = value;
		const mainURL = "http://localhost:2233";
		const url = `${mainURL}/api/user/registerAdmin`;

		const formData = new FormData();
		formData.append("userName", userName);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("avatar", avatar);

		const config = {
			"content-type": "multipart/form-data",
			onUploadProgress: (ProgressEvent) => {
				const { loaded, total } = ProgressEvent;
				const percent = Math.floor((loaded * 100) / total);
				console.log(percent);
			},
		};

		const options = {
			onUploadProgress: (ProgressEvent) => {
				const { loaded, total } = ProgressEvent;
				const percent = Math.floor((loaded * 100) / total);
				console.log(percent);
			},
		};

		await axios.post(url, formData, config).then((res) => {
			console.log("Error Data: ", res);
		});

		navigate("/confirm");
	});

	const onSubmit = handleSubmit(async (value) => {
		console.log(value);
		const { userName, email, password } = value;
		const mainURL = "http://localhost:2233";
		const url = `${mainURL}/api/user/register`;

		const formData = new FormData();
		formData.append("userName", userName);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("avatar", avatar);

		const config = {
			"content-type": "multipart/form-data",
			onUploadProgress: (ProgressEvent) => {
				const { loaded, total } = ProgressEvent;
				const percent = Math.floor((loaded * 100) / total);
				console.log(percent);
			},
		};

		const options = {
			onUploadProgress: (ProgressEvent) => {
				const { loaded, total } = ProgressEvent;
				const percent = Math.floor((loaded * 100) / total);
				console.log(percent);
			},
		};

		await axios.post(url, formData, config).then((res) => {
			console.log("Error Data: ", res);
		});

		navigate("/confirm");
	});

	return (
		<Container>
			<Wrapper>
				<Card>
					<Bar>
						<BarButton
							bg={toggle ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)"}
							onClick={() => {
								setToggle(true);
								setToggleAdmin(false);
							}}
						>
							Regular Sign up
						</BarButton>
						<BarButton
							bg={toggleAdmin ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)"}
							onClick={() => {
								setToggle(false);
								setToggleAdmin(true);
							}}
						>
							Admin Sign up
						</BarButton>
					</Bar>
					{toggle ? (
						<div>
							{" "}
							<ImageHolder>
								<Image src={image} />
								<ImageLabel htmlFor="pix">Upload your Image</ImageLabel>
								<ImageInput
									id="pix"
									onChange={handleImage}
									type="file"
									accept="image/*"
								/>
							</ImageHolder>
							<Form onSubmit={onSubmit} type="multipart/form-data">
								<Holder>
									<Label>User Name</Label>
									<Input placeholder="userName" {...register("userName")} />
									<Error>{errors.message && errors?.message.userName}</Error>
								</Holder>
								<Holder>
									<Label>Email</Label>
									<Input placeholder="email" {...register("email")} />
									<Error>{errors.message && errors?.message.email}</Error>
								</Holder>
								<Holder>
									<Label>Password</Label>
									<Input placeholder="Password" {...register("password")} />
									<Error>{errors.message && errors?.message.password}</Error>
								</Holder>
								<Holder>
									<Label>Confirm Password</Label>
									<Input
										placeholder="Confirm Password"
										{...register("confirm")}
									/>
									<Error>{errors.message && errors?.message.confirm}</Error>
								</Holder>
								<br />
								<Button type="submit" bg="#004080">
									Register
								</Button>

								<Div>
									Already have an Account? <Span to="signin">Sign in Here</Span>
								</Div>
							</Form>
						</div>
					) : (
						<div>
							{" "}
							<ImageHolder>
								<Image src={image} />
								<ImageLabel htmlFor="pix">Upload your Image</ImageLabel>
								<ImageInput
									id="pix"
									onChange={handleImage}
									type="file"
									accept="image/*"
								/>
							</ImageHolder>
							<Form onSubmit={onSubmitAdmin} type="multipart/form-data">
								<Holder>
									<Label>User Name</Label>
									<Input placeholder="userName" {...register("userName")} />
									<Error>{errors.message && errors?.message.userName}</Error>
								</Holder>
								<Holder>
									<Label>Email</Label>
									<Input placeholder="email" {...register("email")} />
									<Error>{errors.message && errors?.message.email}</Error>
								</Holder>
								<Holder>
									<Label>Password</Label>
									<Input placeholder="Password" {...register("password")} />
									<Error>{errors.message && errors?.message.password}</Error>
								</Holder>
								<Holder>
									<Label>Confirm Password</Label>
									<Input
										placeholder="Confirm Password"
										{...register("confirm")}
									/>
									<Error>{errors.message && errors?.message.confirm}</Error>
								</Holder>
								<br />
								<Button type="submit" bg="red">
									Register as Admin
								</Button>

								<Div>
									Already have an Account? <Span to="signin">Sign in Here</Span>
								</Div>
							</Form>
						</div>
					)}
				</Card>
			</Wrapper>
		</Container>
	);
};

export default MainAuthScreen;

const BarButton = styled.div`
	flex: 1;
	background-color: ${({ bg }) => bg};
	display: flex;
	justify-content: center;
	box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
		rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
	align-items: center;
	text-transform: uppercase;
	transition: all 350ms;

	:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.7);
	}
`;

const Bar = styled.div`
	width: 100%;
	height: 60px;
	color: white;
	margin-bottom: 30px;
	display: flex;
`;

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
	margin-top: 5px;
	height: 40px;
	font-family: Poppins;
	font-size: 20px;
	text-transform: uppercase;
	color: white;
	font-weight: 300;
	outline: none;
	border: 0;
	background-color: ${({ bg }) => bg};

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
	width: 100px;
	height: 100px;
	object-fit: cover;
	border-radius: 50%;
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
	/* justify-content: center; */
	padding-bottom: 20px;
	flex-direction: column;
	overflow: hidden;
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
