import { NavLink, Outlet } from "react-router-dom";
import SideNavbar from "../Components/SideNavbar";
import { useState } from "react";
import { Button, Navbar } from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import logo from "./../assets/logo.png";

const Dashboard = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex">
			<div className={`max-w-lg md:block ${isOpen ? "block" : "hidden"}`}>
				<SideNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
			</div>
			{!isOpen && (
				<div className="w-full px-5">
					<div className="md:hidden block pb-5">
						<Navbar className="w-full flex justify-between">
							<NavLink to="/" className="mx-auto cursor-pointer ">
								<img
									src={logo}
									alt="MediCamp Logo"
									className="w-72 mx-auto h-auto"
								/>
							</NavLink>
							<Button
								variant="text"
								className="md:hidden top-0 left-0 flex gap-1 items-center text-xl"
								onClick={() => setIsOpen(!isOpen)}
							>
								<Bars3Icon className="h-5 w-5" /> Menu
							</Button>
						</Navbar>
					</div>
					<Outlet />
				</div>
			)}
		</div>
	);
};

export default Dashboard;
