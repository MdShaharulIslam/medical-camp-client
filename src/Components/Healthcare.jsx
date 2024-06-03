import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import PageHeader from "./PageHeader";
import { Spinner } from "@material-tailwind/react";

const Healthcare = () => {
	const axiosPublic = useAxiosPublic();
	const { data: healthcareData = [], isPending: loading } = useQuery({
		queryKey: ["healthcare"],
		queryFn: async () => {
			const res = await axiosPublic.get("/healthcare");
			return res.data;
		},
	});
	if (loading) {
		return <Spinner />;
	}
	return (
		<div>
			<PageHeader title="Our Healthcare Professional" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-5">
				{healthcareData?.map((healthcare) => (
					<div
						key={healthcare._id}
						className="rounded-xl shadow-xl bg-[#054279] text-white"
					>
						<img
							src={healthcare.image}
							alt={healthcare.name}
							className="w-full h-auto rounded-t-xl"
						/>
						<h3 className="text-2xl font-bold text-center mt-3">
							{healthcare.name}
						</h3>
						<p className="mb-3 text-center">{healthcare.specialist}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Healthcare;
