import logo from "./../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="w-full bg-white p-8">
			<div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
				<img src={logo} alt="logo-ct" className="w-60" />
				<ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
					<li>
						<Link
							to="/about"
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							About Us
						</Link>
					</li>
					<li>
						<Link
							to="/contact"
							color="blue-gray"
							className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
						>
							Contact Us
						</Link>
					</li>
				</ul>
			</div>
			<hr className="my-8 border-blue-gray-50" />
			<div color="blue-gray" className="text-center font-normal">
				&copy; 2024 MediCamp By{" "}
				<Link
					to="https://github.com/shehabweb1"
					className="text-blue-900 hover:text-blue-800"
				>
					Shaharul Islam
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
