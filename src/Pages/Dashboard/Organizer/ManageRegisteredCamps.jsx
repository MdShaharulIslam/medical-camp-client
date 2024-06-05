

import { Helmet } from "react-helmet-async";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography, Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const ManageRegisteredCamps = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: campsData, isPending, refetch } = useQuery({
        queryKey: ["registeredCamps", `${user?.email}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/participant`);
            return res.data;
        },
    });

    if (isPending) {
        return <Spinner />;
    }

    const TABLE_HEAD = [
        "No.",
        "camp_name",
        "Camp Fees",
        "Participant Name",
        "Payment Status",
        "Confirmation Status",
        "Action",
    ];

    const handleUpdateConfirmationStatus = (id) => {
        axiosSecure.patch(`/participant/${id}`, { confirmation_status: "Confirmed" }).then((res) => {
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Confirmed!",
                    text: "Participant has been confirmed.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                });
                refetch();
            }
        });
    };

    const handleCancelRegistration = (id, paymentStatus, confirmationStatus) => {
        if (paymentStatus === "Paid" && confirmationStatus === "Confirmed") {
            Swal.fire({
                title: "Cancellation Disabled",
                text: "Cannot cancel a confirmed and paid registration.",
                icon: "error",
                showConfirmButton: false,
                timer: 1000,
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/participant/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Registration has been cancelled.",
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
                <title>MediCamp | Manage Registered Camps</title>
            </Helmet>
            <main>
                <Card className="h-full w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <Typography variant="h5" className="mb-4">
                            Manage Registered Camps
                        </Typography>
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
                                {campsData.map((participant, idx) => (
                                    <tr key={participant._id} className="mb-3">
                                        <td>{idx + 1}</td>
                                        <td>{participant.camp_name}</td>
                                        <td>{participant.camp_fees}</td>
                                        <td>{participant.participant_name}</td>
                                        <td>{participant.payment_status}</td>
                                        <td>
                                            {participant.confirmation_status}
                                            {participant.confirmation_status === "Pending" && (
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        handleUpdateConfirmationStatus(participant._id)
                                                    }
                                                >
                                                    Confirm
                                                </Button>
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                size="sm"
                                                color="red"
                                                onClick={() =>
                                                    handleCancelRegistration(
                                                        participant._id,
                                                        participant.payment_status,
                                                        participant.confirmation_status
                                                    )
                                                }
                                                disabled={
                                                    participant.payment_status === "Paid" &&
                                                    participant.confirmation_status === "Confirmed"
                                                }
                                            >
                                                Cancel
                                            </Button>
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
                           
                                1
                            
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

export default ManageRegisteredCamps;
