import { Button, Navbar } from "@material-tailwind/react";
import logo from "./../assets/logo.png";
import { NavLink } from "react-router-dom";
import {
	ChatBubbleOvalLeftEllipsisIcon,
	ClipboardDocumentCheckIcon,
	ClipboardDocumentListIcon,
	ClipboardIcon,
	HomeIcon,
	HomeModernIcon,
	PlusCircleIcon,
	PuzzlePieceIcon,
	UserIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import useUserLoggedIn from "../Hooks/useUserLoggedIn";

const SideNavbar = ({ isOpen, setIsOpen }) => {
	const user = useUserLoggedIn();

	return (
		<Navbar className="max-w-lg min-h-screen px-4 py-2 bg-blue-gray-700 rounded-none border-none">
			<div className="flex justify-between md:justify-center">
				<NavLink to="/" className="mx-auto cursor-pointer ">
					<img src={logo} alt="MediCamp Logo" className="w-96 mx-auto" />
				</NavLink>
				{isOpen && (
					<Button
						variant="text"
						className="flex gap-1 items-center text-xl"
						onClick={() => setIsOpen(!isOpen)}
					>
						<XMarkIcon className="w-6 h-6" /> Close
					</Button>
				)}
			</div>

			<div className="flex flex-col items-center justify-between text-lg uppercase mt-7 text-white">
				<ul>
					{user?.role === "participant" && (
						<>
							<NavLink
								to="/dashboard/participant-profile"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<UserIcon className="h-6 w-6" /> Profile Management
								</li>
							</NavLink>
							<NavLink
								to="/dashboard/registered-camps"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<UserIcon className="h-6 w-6" /> Registered Camps
								</li>
							</NavLink>
							<NavLink
								to="/dashboard/payment-history"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<UserIcon className="h-6 w-6" /> Payment History
								</li>
							</NavLink>
							<NavLink
								to="/dashboard/feedback-and-ratings"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<UserIcon className="h-6 w-6" /> Feedback and Ratings
								</li>
							</NavLink>							
						</>
					)}

					{user?.role === "healthcare-professional" && (
						<>
							<NavLink
								to="/dashboard/professional-profile"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<UserIcon className="h-6 w-6" /> Profile Management
								</li>
							</NavLink>
							<NavLink
								to="/dashboard/accepted-camps"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<UserIcon className="h-6 w-6" /> Accepted Camps
								</li>
							</NavLink>
						</>
					)}

					{user?.role === "organizer" && (
						<>
							<NavLink
								to="/dashboard/organizer-profile"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<UserIcon className="h-6 w-6" /> Profile
								</li>
							</NavLink>
							<NavLink
								to="/dashboard/add-a-camp"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<PlusCircleIcon className="h-6 w-6" /> Add A Camp
								</li>
							</NavLink>
							<NavLink
								to="/dashboard/manage-camps"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<ClipboardDocumentListIcon className="h-6 w-6" /> Manage Camps
								</li>
							</NavLink>
							<NavLink
								to="/dashboard/manage-registered-camps"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<ClipboardDocumentCheckIcon className="h-6 w-6" /> Manage
									Registered Camps
								</li>
							</NavLink>
							<NavLink
								to="/dashboard/add-upcoming-camp"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<PuzzlePieceIcon className="h-6 w-6" /> Add Upcoming Camps
								</li>
							</NavLink>
							<NavLink
								to="/dashboard/manage-upcoming-camps"
								className={({ isActive, isPending }) =>
									isActive ? "text-[#054279]" : isPending ? "pending" : ""
								}
							>
								<li className="mb-5 flex gap-2 font-semibold  hover:text-[#054279] transition-all">
									<ClipboardIcon className="h-6 w-6" /> Manage Upcoming Camps
								</li>
							</NavLink>
						</>
					)}

					<div className="h-1 w-dull bg-white mx-auto my-10"></div>
					<li className="mb-5">
						<NavLink
							to="/"
							className="flex gap-2 font-semibold hover:text-[#054279] transition-all"
						>
							<HomeIcon className="h-6 w-6" /> Home
						</NavLink>
					</li>
					<li className="mb-5">
						<NavLink
							to="/available-camps"
							className="flex gap-2 font-semibold hover:text-[#054279] transition-all"
						>
							<HomeModernIcon className="h-6 w-6" /> Available Camps
						</NavLink>
					</li>
					<li className="mb-5">
						<NavLink
							to="/contact"
							className="flex gap-2 font-semibold hover:text-[#054279] transition-all"
						>
							<ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" /> Contact Us
						</NavLink>
					</li>
				</ul>
			</div>
		</Navbar>
	);
};

export default SideNavbar;
