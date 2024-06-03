import { Helmet } from "react-helmet-async";
import PageHeader from "../../../Components/PageHeader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Dialog,
	DialogBody,
	DialogHeader,
	IconButton,
	Input,
	Spinner,
	Textarea,
	Typography,
} from "@material-tailwind/react";
import { AwesomeButton } from "react-awesome-button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useUserLoggedIn from "../../../Hooks/useUserLoggedIn";
import Swal from "sweetalert2";

const FeedbackRatings = () => {
	const [open, setOpen] = useState(true);
	const user = useUserLoggedIn();
	const { register, handleSubmit } = useForm();
	const axiosSecure = useAxiosSecure();

	const {
		data: campsData = [],
		isPending,
		refetch,
	} = useQuery({
		queryKey: ["camps", `${user?.email}`],
		queryFn: async () => {
			const res = await axiosSecure.get(`/participant/${user?.email}`);
			return res.data;
		},
	});

	if (isPending) {
		return <Spinner />;
	}

	const TABLE_HEAD = [
		"No.",
		"Camp Name",
		"Scheduled",
		"Location",
		"Camp Fees",
		"Payment Status",
		"Confirmation Status",
		"Action",
	];

	const handleOpen = () => {
		setOpen(!open);
	};

	const handleReview = (data) => {
		if (data) {
			const feedbackInfo = {
				participant_image: user.image,
				participant_name: user.name,
				participant_email: user.email,
				rating: data.rating,
				feedback: data.feedback,
			};

			axiosSecure.post(`/feedback`, feedbackInfo).then((res) => {
				if (res.data) {
					handleOpen();
					Swal.fire({
						title: "Thank you!",
						text: "Thanks for your Feedback!",
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
				<title>MediCamp | Feedback and Ratings</title>
			</Helmet>
			<main className="relative">
				<PageHeader title="Participant Profile" />

				<Card className="h-full w-full">
					<CardBody className="overflow-scroll px-0">
						<table className="w-full min-w-max table-auto text-left">
							<thead>
								<tr>
									{TABLE_HEAD.map((head) => (
										<th
											key={head}
											className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
										>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal leading-none opacity-70"
											>
												{head}
											</Typography>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{campsData.map((regiCamp, idx) => (
									<tr key={regiCamp._id} className="mb-3">
										<td>{idx + 1}</td>
										<td>{regiCamp?.camp?.camp_name}</td>
										<td>{regiCamp?.camp?.date}</td>
										<td>{regiCamp?.camp?.location}</td>
										<td>{regiCamp?.camp_fees}</td>
										<td>{regiCamp?.payment_status ? "Paid" : "Unpaid"}</td>
										<td>Pending</td>
										<td>
											<div className="inline-block">
												<AwesomeButton type="primary" onMouseUp={handleOpen}>
													Review
												</AwesomeButton>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</CardBody>
					<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
						<Button variant="outlined" size="sm">
							Previous
						</Button>
						<div className="flex items-center gap-2">
							<IconButton variant="outlined" size="sm">
								1
							</IconButton>
						</div>
						<Button variant="outlined" size="sm">
							Next
						</Button>
					</CardFooter>
				</Card>
			</main>

			<Dialog open={!open} size="lg" handler={handleOpen}>
				<DialogHeader className="flex justify-between">
					Write your Feedback
					<XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleOpen} />
				</DialogHeader>
				<DialogBody>
					<form onSubmit={handleSubmit(handleReview)} className="w-full">
						<div className="mb-1 flex flex-col gap-6">
							<div className="flex justify-between gap-5">
								<div className="w-1/2">
									<Typography variant="h6" color="blue-gray" className="mb-3">
										Your Name
									</Typography>
									<Input
										type="text"
										size="lg"
										defaultValue={user?.name}
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
										Rating
									</Typography>
									<Input
										size="lg"
										type="number"
										{...register("rating", { required: true })}
										placeholder="5"
										className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
										labelProps={{
											className: "before:content-none after:content-none",
										}}
									/>
								</div>
							</div>
							<div className="w-full">
								<Typography variant="h6" color="blue-gray" className="mb-3">
									Write Your Feedback
								</Typography>
								<Textarea
									{...register("feedback", { required: true })}
									placeholder="Write a your feedback"
									className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
									labelProps={{
										className: "before:content-none after:content-none",
									}}
								/>
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

export default FeedbackRatings;
