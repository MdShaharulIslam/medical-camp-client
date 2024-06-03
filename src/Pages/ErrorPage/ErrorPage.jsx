import { AwesomeButton } from "react-awesome-button";
import { Link } from "react-router-dom";
import "react-awesome-button/dist/styles.css";

const ErrorPage = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-9xl font-bold text-[#054279] mt-20">404</h1>
			<h4 className="text-2xl">This page is not found</h4>

			<Link to="/" className="py-10">
				<AwesomeButton type="primary" size="medium">
					Go Home Page
				</AwesomeButton>
			</Link>
		</div>
	);
};

export default ErrorPage;
