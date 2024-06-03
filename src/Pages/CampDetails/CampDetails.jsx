import { AwesomeButton } from "react-awesome-button";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
	Dialog,
	DialogBody,
	DialogHeader,
	Input,
	Typography,
} from "@material-tailwind/react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useUserLoggedIn from "../../Hooks/useUserLoggedIn";
import Swal from "sweetalert2";

const CampDetails = () => {
	const [open, setOpen] = useState(true);
	const camp = useLoaderData();
	const userData = useUserLoggedIn();
	const { register, control, handleSubmit } = useForm();
	const axiosSecure = useAxiosSecure();

	const navigate = useNavigate();

	const {
		camp_name,
		image,
		date,
		name,
		service,
		audience,
		camp_fees,
		participants,
		location,
		healthcare,
		description,
	} = camp;

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleJoinCamp = (data) => {
		const participant = {
			camp: camp,
			participant_name: data.participant_name,
			email: userData.email,
			gender: data.gender.value,
			age: data.age,
			phone: data.phone,
			address: data.address,
			camp_fees: camp_fees,
			emergency_contact: data.emergency_contact,
		};
		axiosSecure.post("/participant", participant).then((res) => {
			console.log(res);
			if (res.data.joinResult && res.data.updateCamps.modifiedCount) {
				Swal.fire({
					title: "Successfully",
					text: "Registered Successfully!",
					icon: "success",
					showConfirmButton: false,
					timer: 1000,
				});
				navigate("/dashboard/registered-camps");
			}
		});
	};

	return (
		<>
			<Helmet>
				<title>MediCamp | Camp Details</title>
			</Helmet>
			<main className="pt-10">
				<div className="flex flex-col md:flex-row">
					<div className="w-full">
						<img
							src={image}
							alt={camp_name}
							className="w-full max-h-[500px] object-cover rounded-xl"
						/>
						<div className="flex justify-between my-5">
							<h2 className="text-2xl md:text-4xl font-bold">{camp_name}</h2>
							<div>
								{userData?.role === "participant" && (
									<AwesomeButton type="primary" onMouseDown={handleOpen}>
										Join Camp
									</AwesomeButton>
								)}
							</div>
						</div>
						<p className="text-sm md:text-lg">{description}</p>
					</div>
					<div className="w-full md:w-80 lg:w-96 max-h-screen my-5 md:m-5 lg:m-10 py-5 px-5 bg-[#054279] text-white">
						<h3 className="text-xl mb-5 pb-1 border-b font-semibold">
							Additional Information
						</h3>
						<div className="text-lg">
							<table>
								<tbody>
									<tr>
										<td>Date</td>
										<td>:</td>
										<td>{date}</td>
									</tr>
									<tr>
										<td>Venue</td>
										<td>:</td>
										<td>{location}</td>
									</tr>
									<tr>
										<td>Audience</td>
										<td>:</td>
										<td>{audience}</td>
									</tr>
									<tr>
										<td>Services</td>
										<td>:</td>
										<td>{service}</td>
									</tr>
									<tr>
										<td>Healthcare</td>
										<td>:</td>
										<td>{healthcare}</td>
									</tr>
									<tr>
										<td>Organizer</td>
										<td>:</td>
										<td>{name}</td>
									</tr>
									<tr>
										<td>Participant</td>
										<td>:</td>
										<td>{participants ? participants : 0}</td>
									</tr>
									<tr>
										<td>Camp Fees</td>
										<td>:</td>
										<td>{camp_fees} Tk</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</main>

			<Dialog open={!open} size="lg" handler={handleOpen}>
				<DialogHeader className="flex justify-between">
					Participant Register
					<XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleOpen} />
				</DialogHeader>
				<DialogBody>
					<form onSubmit={handleSubmit(handleJoinCamp)} className="w-full">
						<div className="mb-1 flex flex-col gap-6">
							<div className="w-full">
								<Typography variant="h6" color="blue-gray" className="mb-3">
									Name
								</Typography>
								<Input
									type="text"
									size="lg"
									defaultValue={userData?.name}
									{...register("participant_name")}
									placeholder="John Wick"
									className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
									labelProps={{
										className: "before:content-none after:content-none",
									}}
								/>
							</div>
							<div className="md:flex justify-between gap-5">
								<div className="w-full md:w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Gender
									</Typography>
									<Controller
										name="gender"
										control={control}
										rules={{
											required: true,
										}}
										render={({ field }) => (
											<Select
												className="z-10 border-t-blue-gray-200"
												{...field}
												options={[
													{ value: "male", label: "Male" },
													{ value: "female", label: "Female" },
												]}
											/>
										)}
									/>
								</div>
								<div className="w-full md:w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Age
									</Typography>
									<Input
										size="lg"
										type="text"
										{...register("age")}
										placeholder="24"
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
										Phone Number
									</Typography>
									<Input
										type="text"
										size="lg"
										{...register("phone")}
										placeholder="+8801300001111"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
								<div className="w-full md:w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Address
									</Typography>
									<Input
										size="lg"
										type="text"
										{...register("address")}
										placeholder="Dhaka, Bangladesh"
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
										Camp Fees
									</Typography>
									<Input
										type="text"
										size="lg"
										readOnly
										defaultValue={camp_fees}
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
								<div className="w-full md:w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Emergency Contact
									</Typography>
									<Input
										size="lg"
										type="text"
										{...register("emergency_contact")}
										placeholder="Phone Number or Email Address"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
							</div>
						</div>
						<div className="flex justify-center mt-5">
							<AwesomeButton type="primary">Update</AwesomeButton>
						</div>
					</form>
				</DialogBody>
			</Dialog>
		</>
	);
};

export default CampDetails;
