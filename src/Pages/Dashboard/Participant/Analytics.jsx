
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import PageHeader from "../../../Components/PageHeader";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Analytics = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: campsData = [] } = useQuery({
        queryKey: ["registeredCampsAnalytics", `${user?.email}`],
        queryFn: async () => {
            const res = await axiosSecure.get(`/participant/camps/${user?.email}`);
            return res.data;
        },
    });

    const chartData = campsData.map(camp => ({
        name: camp.camp_name,
        fees: camp.camp_fees,
    }));

    return (
        <>
            <Helmet>
                <title>MediCamp | Analytics</title>
            </Helmet>
            <main>
                <PageHeader title="Analytics" />
                <Card className="h-full w-full">
                    <CardBody>
                        <Typography variant="h6" color="blue-gray" className="mb-4">
                            Camps Analytics
                        </Typography>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="fees" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </main>
        </>
    );
};

export default Analytics;
