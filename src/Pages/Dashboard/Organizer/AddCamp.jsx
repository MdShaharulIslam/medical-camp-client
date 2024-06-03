import { Helmet } from "react-helmet-async";
import PageHeader from "./../../../Components/PageHeader";
import { AwesomeButton } from "react-awesome-button";
import { Input, Textarea, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUserLoggedIn from "../../../Hooks/useUserLoggedIn";

const image_key = import.meta.env.VITE_IMAGE_KEY;
const image_api = `https://api.imgbb.com/1/upload?key=${image_key}`;
const AddCamp = () => {
	const [startDate, setStartDate] = useState(new Date());
	const date = startDate.toDateString();
	const { register, handleSubmit } = useForm();
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();
	const userData = useUserLoggedIn();

	const handleAddCamp = async (data) => {
		const imageFile = { image: data.image[0] };
		const res = await axiosPublic.post(image_api, imageFile, {
			headers: {
				"content-type": "multipart/form-data",
			},
		});
		if (res.data) {
			const newCamp = {
				camp_name: data.camp_name,
				image: res.data.data.display_url,
				date: date,
				camp_fees: data.camp_fees,
				location: data.location,
				service: data.service,
				healthcare: data.healthcare,
				audience: data.audience,
				description: data.description,
				name: userData.name,
				email: userData.email,
				profile: userData.image,
				participants: 0,
			};

			axiosSecure.post("/camps", newCamp).then((res) => {
				if (res.data.insertedId) {
					Swal.fire({
						title: "Successfully",
						text: "Added new camp Successfully!",
						icon: "success",
						showConfirmButton: false,
						timer: 1000,
					});
					navigate("/dashboard/manage-camps");
				}
			});
		}
	};
	return (
		<>
			<Helmet>
				<title>MediCamp | Add A Camp</title>
			</Helmet>
			<main>
				<PageHeader title="Add A Camp" />
				<div className="py-5">
					<form onSubmit={handleSubmit(handleAddCamp)} className="w-full">
						<div className="w-3/4 mx-auto flex flex-col gap-6">
							<div className="w-full">
								<Typography variant="h6" color="blue-gray" className="mb-3">
									Camp Name
								</Typography>
								<Input
									type="text"
									size="lg"
									{...register("camp_name")}
									placeholder="John Wick"
									className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
									labelProps={{
										className: "before:content-none after:content-none",
									}}
								/>
							</div>
							<div className="md:flex justify-between gap-5">
								<div className="w-full md:w-1/3">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Camp Image
									</Typography>

									<Input
										type="file"
										{...register("image", { required: true })}
										name="image"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
									/>
								</div>
								<div className="w-full md:w-1/3">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Camp Fees (BDT)
									</Typography>
									<Input
										type="number"
										size="lg"
										{...register("camp_fees")}
										placeholder="520"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
								<div className="w-full md:w-1/3">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Scheduled Date
									</Typography>
									<DatePicker
										showIcon
										selected={startDate}
										onChange={(date) => setStartDate(date)}
										isClearable
										placeholderText="Select Date!"
									/>
								</div>
							</div>
							<div className="md:flex justify-between gap-5">
								<div className="w-full md:w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Venue Location
									</Typography>
									<Input
										type="text"
										size="lg"
										{...register("location")}
										placeholder="Dhaka"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
								<div className="w-full md:w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Specialized Services
									</Typography>
									<Input
										size="lg"
										type="text"
										{...register("service")}
										placeholder="Eyes Treatment"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
							</div>
							<div className="md:flex justify-between gap-5">
								<div className="w-full md:w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Healthcare Professionals in Attendance,
									</Typography>
									<Input
										type="text"
										size="lg"
										{...register("healthcare")}
										placeholder="Dr. Khan"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
								<div className="w-full md:w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Target Audience
									</Typography>
									<Input
										size="lg"
										type="text"
										{...register("audience")}
										placeholder="Teenage"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
							</div>
							<div className="w-full">
								<Typography variant="h6" color="blue-gray" className="mb-3">
									Comprehensive Description
								</Typography>
								<Textarea
									{...register("description")}
									placeholder="Write a Description"
									className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
									labelProps={{
										className: "before:content-none after:content-none",
									}}
								/>
							</div>
						</div>
						<div className="flex justify-center mt-5">
							<AwesomeButton type="primary">Add New Camp</AwesomeButton>
						</div>
					</form>
				</div>
			</main>
		</>
	);
};

export default AddCamp;
