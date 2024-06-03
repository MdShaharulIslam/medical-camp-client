import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Spinner } from "@material-tailwind/react";
import useAuth from "../Hooks/useAuth";

const Main = () => {
	const { loading } = useAuth();
	const location = useLocation();
	const noHeaderFooter =
		location.pathname.includes("login") ||
		location.pathname.includes("register");

	if (loading) {
		return <Spinner className="h-16 w-16 text-gray-900/50 mx-auto" />;
	}
	return (
		<div className="max-w-screen-2xl mx-auto">
			{noHeaderFooter || <Header />}
			<Outlet />
			{noHeaderFooter || <Footer />}
		</div>
	);
};

export default Main;
