import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCamps = () => {
	const axiosPublic = useAxiosPublic();
	const {
		data: campsData = [],
		isPending: loading,
		refetch,
	} = useQuery({
		queryKey: ["camps"],
		queryFn: async () => {
			const res = await axiosPublic.get("/camps");
			return res.data;
		},
	});

	return [campsData, loading, refetch];
};

export default useCamps;
