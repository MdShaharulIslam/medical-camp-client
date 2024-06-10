import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AwesomeButton } from "react-awesome-button";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CheckOutForm = () => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: regiData = [] } = useQuery({
        queryKey: ["camps", `${user?.email}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/participant/${user?.email}`);
            return res.data;
        },
    });

    const totalFees = regiData.reduce((total, item) => total + item.camp_fees, 0);

    useEffect(() => {
        if (totalFees > 0) {
            axiosSecure
                .post('/create-payment-intent', { fees: totalFees })
                .then((res) => {
                    console.log("Response from /create-payment-intent:", res);
                    setClientSecret(res.data.clientSecret);
                })
                .catch((error) => {
                    console.error("Error fetching client secret:", error);
                    setError("Error fetching client secret");
                });
        }
    }, [axiosSecure, totalFees]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
            return;
        }

        try {
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous",
                    },
                },
            });

            if (confirmError) {
                setError(confirmError.message);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    fees: totalFees,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    regiId: regiData.map((item) => item._id),
                    campIds: regiData.map((item) => item.camp._id),
                    status: "pending",
                };

                const res = await axiosSecure.post("/payments", payment);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the fees",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                    navigate("/dashboard/payment-history");
                }
            }
        } catch (error) {
            setError("Payment confirmation failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <div className="my-5">
                <AwesomeButton type="primary">Pay</AwesomeButton>
            </div>
            <p className="text-red-600">{error}</p>
            {transactionId && (
                <p className="text-green-600"> Your transaction id: {transactionId}</p>
            )}
        </form>
    );
};

export default CheckOutForm;
