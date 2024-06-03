import { Input, Spinner, Textarea, Typography } from "@material-tailwind/react";
import { AwesomeButton } from "react-awesome-button";
import DatePicker from "react-datepicker";
import PageHeader from "../../../Components/PageHeader";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const UpdateCamps = () => {
	const [startDate, setStartDate] = useState(new Date());
	const date = startDate.toDateString();
	const { register, handleSubmit } = useForm();
	const axiosSecure = useAxiosSecure();
	const axiosPublic = useAxiosPublic();
	const { id } = useParams();

	const navigate = useNavigate();

	const { data: campData, isPending } = useQuery({
		queryKey: ["camps"],
		queryFn: async () => {
			const res = await axiosPublic(`/camps/${id}`);
			return res.data;
		},
	});

	if (isPending) {
		return <Spinner />;
	}

	const handleAddCamp = async (data) => {
		if (data) {
			const updateCamp = {
				camp_name: data.camp_name,
				date: date,
				camp_fees: data.camp_fees,
				location: data.location,
				service: data.service,
				healthcare: data.healthcare,
				audience: data.audience,
				description: data.description,
			};

			axiosSecure.patch(`/camps/${id}`, updateCamp).then((res) => {
				if (res.data.modifiedCount > 0) {
					Swal.fire({
						title: "Successfully",
						text: "Camp has been updated Successfully!",
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
				<title>MediCamp | Update Camp</title>
			</Helmet>
			<main>
				<PageHeader title="Update Camp" />
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
									defaultValue={campData?.camp_name}
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
										defaultValue={campData?.camp_fees}
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
										defaultValue={campData?.location}
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
										defaultValue={campData?.service}
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
										defaultValue={campData?.healthcare}
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
										defaultValue={campData?.audience}
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
									defaultValue={campData?.description}
									placeholder="Write a Description"
									className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
									labelProps={{
										className: "before:content-none after:content-none",
									}}
								/>
							</div>
						</div>
						<div className="flex justify-center mt-5">
							<AwesomeButton type="primary">Update Camp</AwesomeButton>
						</div>
					</form>
				</div>
			</main>
		</>
	);
};

export default UpdateCamps;
