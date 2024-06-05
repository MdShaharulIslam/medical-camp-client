import { Helmet } from "react-helmet-async";
import PageHeader from "../../../Components/PageHeader";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	IconButton,
	Spinner,
	Typography,
} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const ManageCamps = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const {
		data: campsData,
		isPending,
		refetch,
	} = useQuery({
		queryKey: ["camps", `${user?.email}`],
		queryFn: async () => {
			const res = await axiosSecure.get(`/camps/organizer/${user?.email}`);
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
		"Healthcare",
		"Audience",
		"Action",
	];

	const handleDeleteCamp = (id) => {
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
				axiosSecure.delete(`/camps/${id}`).then((res) => {
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
				<title>MediCamp | Manage Camps</title>
			</Helmet>
			<main>
				<PageHeader title="Manage Camps" />

				<Card className="h-full w-full">
					<CardHeader floated={false} shadow={false} className="rounded-none">
						<div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
							<div className="flex w-full shrink-0 gap-2 md:w-max">
								<Link to="/dashboard/add-a-camp">
									<Button className="flex items-center gap-3" size="sm">
										<PlusCircleIcon className="h-4 w-4" />
										Add Camp
									</Button>
								</Link>
							</div>
						</div>
					</CardHeader>
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
								{campsData.map((camp, idx) => (
									<tr key={camp._id} className="mb-3">
										<td>{idx + 1}</td>
										<td>{camp.camp_name}</td>
										<td>{camp.date}</td>
										<td>{camp.location}</td>
										<td>{camp.healthcare}</td>
										<td>{camp.audience}</td>
										<td>
											<div className="inline-block mr-2">
												<Link to={`/dashboard/update-camps/${camp._id}`}>
													<AwesomeButton type="primary">Update</AwesomeButton>
												</Link>
											</div>
											<div className="inline-block">
												<AwesomeButton
													type="danger"
													onMouseUp={() => handleDeleteCamp(camp._id)}
												>
													Delete
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

export default ManageCamps;
