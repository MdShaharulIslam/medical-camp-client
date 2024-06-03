import { Card, Input, Typography } from "@material-tailwind/react";
import { AwesomeButton } from "react-awesome-button";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
	const { userLogin } = useAuth();
	const { register, handleSubmit, reset } = useForm();

	const navigate = useNavigate();
	const location = useLocation();
	let from = location.state?.from?.pathname || "/";

	const onSubmit = (data) => {
		userLogin(data.email, data.password).then((result) => {
			if (result) {
				Swal.fire({
					title: "Successfully!",
					text: "Your Account has been Login Successfully!",
					icon: "success",
					showConfirmButton: false,
					timer: 1000,
				});
				reset();
				navigate(from, { replace: true });
			}
		});
	};
	return (
		<>
			<Helmet>
				<title>MediCamp | Login</title>
			</Helmet>
			<Card
				color="transparent"
				shadow={false}
				className="mx-auto md:w-1/2 lg:w-1/4 py-20"
			>
				<Typography variant="h4" color="blue-gray">
					MediCamp | Login
				</Typography>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
				>
					<div className="mb-1 flex flex-col gap-6">
						<Typography variant="h6" color="blue-gray" className="-mb-3">
							Your Email
						</Typography>
						<Input
							size="lg"
							type="email"
							{...register("email", { required: true })}
							placeholder="name@mail.com"
							className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
							labelProps={{
								className: "before:content-none after:content-none",
							}}
						/>
						<Typography variant="h6" color="blue-gray" className="-mb-3">
							Password
						</Typography>
						<Input
							type="password"
							size="lg"
							{...register("password", { required: true })}
							placeholder="********"
							className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
							labelProps={{
								className: "before:content-none after:content-none",
							}}
						/>
					</div>
					<AwesomeButton type="primary" size="small">
						Login
					</AwesomeButton>
				</form>
				<Typography color="gray" className="my-4 text-center font-normal">
					Don&lsquo;t have an account?{" "}
					<Link
						to="/register"
						className="font-medium text-gray-900 hover:text-blue-700"
					>
						Sign Up
					</Link>
				</Typography>
			</Card>
		</>
	);
};

export default Login;
