import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
	baseURL: "https://medi-camp-server-main.vercel.app",
});
const useAxiosSecure = () => {
	const { logOut } = useAuth();
	const navigate = useNavigate();

	axiosSecure.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("access_token");
			config.headers.authorization = `Bearer ${token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axiosSecure.interceptors.response.use(
		(res) => {
			return res;
		},
		async (error) => {
			const status = error.response.status;
			if (status === 401 || status === 403) {
				await logOut();

				navigate("/login");
			}
			return Promise.reject(error);
		}
	);

	return axiosSecure;
};

export default useAxiosSecure;
