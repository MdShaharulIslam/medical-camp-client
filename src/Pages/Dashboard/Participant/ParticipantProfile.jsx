import { XMarkIcon } from "@heroicons/react/24/solid";
import {
	Dialog,
	DialogBody,
	DialogHeader,
	Input,
	Spinner,
	Typography,
} from "@material-tailwind/react";
import { AwesomeButton } from "react-awesome-button";
import Profile from "../../../Components/Profile";
import PageHeader from "../../../Components/PageHeader";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ParticipantProfile = () => {
	const [open, setOpen] = useState(true);
	const { user } = useAuth();
	const { register, handleSubmit } = useForm();
	const axiosSecure = useAxiosSecure();
	const axiosPublic = useAxiosPublic();
	const {
		data: userData,
		isPending,
		refetch,
	} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await axiosPublic(`/users/${user?.email}`);
			return res.data;
		},
	});

	if (isPending) {
		return <Spinner />;
	}

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleUpdateProfile = (data) => {
		if (data) {
			const updateInfo = {
				address: data.address,
				contact_email: data.contact_email,
				participant_name: data.participant_name,
				phone: data.phone,
			};

			axiosSecure.patch(`/users/${userData.email}`, updateInfo).then((res) => {
				if (res.data.modifiedCount > 0) {
					handleOpen();
					Swal.fire({
						title: "Successfully",
						text: "Your Profile Updated Successfully!",
						icon: "success",
						showConfirmButton: false,
						timer: 1000,
					});
					refetch();
				}
			});
		}
	};
	return (
		<>
			<Helmet>
				<title>MediCamp | Participant Profile</title>
			</Helmet>
			<main className="relative">
				<PageHeader title="Participant Profile" />
				<Profile user={userData} handleModal={handleOpen} />
			</main>
			<Dialog open={!open} size="lg" handler={handleOpen}>
				<DialogHeader className="flex justify-between">
					Update Your Profile
					<XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleOpen} />
				</DialogHeader>
				<DialogBody>
					<form onSubmit={handleSubmit(handleUpdateProfile)} className="w-full">
						<div className="mb-1 flex flex-col gap-6">
							<div className="flex justify-between gap-5">
								<div className="w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Your Name
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
								<div className="w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Contact Email
									</Typography>
									<Input
										size="lg"
										type="email"
										defaultValue={userData?.email}
										{...register("contact_email")}
										placeholder="name@mail.com"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
							</div>
							<div className="flex justify-between gap-5">
								<div className="w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Phone Number
									</Typography>
									<Input
										type="text"
										size="lg"
										defaultValue={userData?.phone}
										{...register("phone")}
										placeholder="+8801300001111"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
								<div className="w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Address
									</Typography>
									<Input
										size="lg"
										type="text"
										defaultValue={userData?.address}
										{...register("address")}
										placeholder="Dhaka, Bangladesh"
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

export default ParticipantProfile;
