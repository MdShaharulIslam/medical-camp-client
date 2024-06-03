import { Spinner } from "@material-tailwind/react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useUserLoggedIn = () => {
	const { user } = useAuth();
	const axiosPublic = useAxiosPublic();
	const { data: userData, isPending } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await axiosPublic(`/users/${user.email}`);
			return res.data;
		},
	});

	if (isPending) {
		return <Spinner />;
	}

	return userData;
};

export default useUserLoggedIn;
