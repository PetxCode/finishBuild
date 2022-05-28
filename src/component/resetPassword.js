import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
	const { id, token } = useParams();

	const navigate = useNavigate();

	const formSchema = yup.object().shape({
		password: yup.string().required("This field cannot be empty"),
		confirm: yup
			.string()
			.oneOf([yup.ref("password"), null], "new password much match "),
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
		const { password } = value;
		const mainURL = "http://localhost:2233";
		const url = `${mainURL}/api/user/reset/${id}/${token}`;

		await axios.post(url, { password });

		navigate("/auth/signin");
	});

	return (
		<Container>
			<Wrapper>
				<Card>
					<Form onSubmit={onSubmit}>
						<Diva>
							Congratulations, your account is almost verified, PLease provide
							the OTP code send to you, to finish up and
							continue❤️❤️❤️🎉🍾🎊🎊🎊🎉🎉🎉🍾
						</Diva>
						<Holder>
							<Label>Provide your new Password</Label>
							<Input
								placeholder="Provide your password"
								{...register("password")}
							/>
							<Error>{errors.message && errors?.message.password}</Error>
						</Holder>
						<Holder>
							<Label>confirm password</Label>
							<Input placeholder="confirm password" {...register("confirm")} />
							<Error>{errors.message && errors?.message.confirm}</Error>
						</Holder>

						<Button type="submit">submit</Button>
					</Form>
				</Card>
			</Wrapper>
		</Container>
	);
};

export default ResetPassword;

const Diva = styled.div`
	text-align: center;
	font-weight: bold;
	font-size: 20px;
	color: #004080;
	text-transform: uppercase;
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
	min-height: 300px;
	/* height: 100%; */
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
