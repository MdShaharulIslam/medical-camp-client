import { Helmet } from "react-helmet-async";
import PageHeader from "../../../Components/PageHeader";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	IconButton,
	Spinner,
	Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const RegisteredCamps = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const {
		data: regiData = [],
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

	const handleRegisteredCamps = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosSecure.delete(`/participant/${id}`).then((res) => {
					if (res.data.deletedCount > 0) {
						Swal.fire({
							title: "Deleted!",
							text: "Camp has been deleted.",
							icon: "success",
							showConfirmButton: false,
							timer: 1000,
						});
						refetch();
					}
				});
			}
		});
	};

	return (
		<>
			<Helmet>
				<title>MediCamp | Registered Camps</title>
			</Helmet>
			<main>
				<PageHeader title="Registered Camps" />

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
								{regiData.map((regiCamp, idx) => (
									<tr key={regiCamp._id} className="mb-3">
										<td>{idx + 1}</td>
										<td>{regiCamp?.camp?.camp_name}</td>
										<td>{regiCamp?.camp?.date}</td>
										<td>{regiCamp?.camp?.location}</td>
										<td>{regiCamp?.camp_fees}</td>
										<td>
											{regiCamp?.payment_status ? (
												<AwesomeButton type="primary" disabled>
													Paid
												</AwesomeButton>
											) : (
												<Link to="/dashboard/payment">
													<AwesomeButton type="primary">Pay</AwesomeButton>
												</Link>
											)}
										</td>
										<td>Pending</td>
										<td>
											<div className="inline-block">
												<AwesomeButton
													type="danger"
													onMouseUp={() => handleRegisteredCamps(regiCamp._id)}
												>
													Cancel
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
		</>
	);
};

export default RegisteredCamps;
