import {
	Navbar,
	Collapse,
	Typography,
	Button,
	IconButton,
	Menu,
	MenuHandler,
	Avatar,
	MenuList,
	MenuItem,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
	HomeIcon,
	Bars3Icon,
	XMarkIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	HomeModernIcon,
	SquaresPlusIcon,
	ChevronDownIcon,
	UserIcon,
	PowerIcon,
	AcademicCapIcon,
} from "@heroicons/react/24/solid";

import logo from "./../assets/logo.png";
import useAuth from "./../Hooks/useAuth";
import Swal from "sweetalert2";
import useUserLoggedIn from "../Hooks/useUserLoggedIn";

const Header = () => {
	const [openNav, setOpenNav] = useState(false);
	const { user } = useAuth();
	const userData = useUserLoggedIn();
console.log(userData);
	const navList = (
		<ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<NavLink to="/">
				<Typography
					as="li"
					variant="small"
					color="blue-gray"
					className="flex items-center gap-x-2 p-1 font-semibold hover:text-blue-800 transition-all border-b border-transparent hover:border-b-blue-800"
				>
					<HomeIcon className="h-5 w-5" />

					<div className="flex items-center">Home</div>
				</Typography>
			</NavLink>
			<NavLink to="/available-camps">
				<Typography
					as="li"
					variant="small"
					color="blue-gray"
					className="flex items-center gap-x-2 p-1 font-semibold hover:text-blue-800 transition-all border-b border-transparent hover:border-b-blue-800"
				>
					<HomeModernIcon className="h-5 w-5" />

					<div className="flex items-center">Available Camps</div>
				</Typography>
			</NavLink>

			
			<NavLink to="/contact">
				<Typography
					as="li"
					variant="small"
					color="blue-gray"
					className="flex items-center gap-x-2 p-1 font-semibold hover:text-blue-800 transition-all border-b border-transparent hover:border-b-blue-800"
				>
					<ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />

					<div className="flex items-center">Contact Us</div>
				</Typography>
			</NavLink>
		</ul>
	);
	return (
		<Navbar className="mx-auto max-w-screen-2xl px-4 py-2 sticky z-10 rounded-none top-0">
			<div className="container mx-auto flex items-center justify-between text-blue-gray-900">
				<NavLink to="/" className="mr-4 cursor-pointer">
					<img src={logo} alt="MediCamp Logo" className="lg:w-32 w-60" />
				</NavLink>
				<div className="hidden lg:block">{navList}</div>
				<div className="flex items-center gap-x-1">
					{user ? (
						<>
							<div className="hidden lg:inline-block ">
								<ProfileMenu />
							</div>
						</>
					) : (
						<>
							<Link to="/login">
								<Button
									variant="text"
									size="sm"
									className="hidden lg:inline-block "
								>
									<span>Log In</span>
								</Button>
							</Link>
							<Link to="/register">
								<Button
									variant="gradient"
									size="sm"
									className="hidden lg:inline-block "
								>
									<span>Join Us</span>
								</Button>
							</Link>
						</>
					)}
				</div>
				<IconButton
					variant="text"
					className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<XMarkIcon className="h-6 w-6" />
					) : (
						<Bars3Icon className="h-6 w-6" />
					)}
				</IconButton>
			</div>
			<Collapse open={openNav}>
				<div className="container mx-auto">
					{navList}
					<div className="flex items-center gap-x-1">
						{user ? (
							<>
								<ProfileMenu />
							</>
						) : (
							<>
								<Link to="/login">
									<Button fullWidth variant="text" size="sm">
										<span>Log In</span>
									</Button>
								</Link>
								<Link to="/register">
									<Button fullWidth variant="gradient" size="sm">
										<span>Join Us</span>
									</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Collapse>
		</Navbar>
	);
};

function ProfileMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, logOut } = useAuth();
	const navigate = useNavigate();
	const userData = useUserLoggedIn();

	const handleLogout = () => {
		logOut().then(() => {
			Swal.fire({
				title: "Successfully",
				text: "Your Account has been Log Out!",
				icon: "success",
				showConfirmButton: false,
				timer: 1000,
			});
			navigate("/");
		});
	};

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
				>
					<Avatar
						variant="circular"
						size="sm"
						alt={user?.displayName}
						className="border border-gray-600"
						src={user?.photoURL}
					/>
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${
							isMenuOpen ? "rotate-180" : ""
						}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				<MenuItem className="flex items-center gap-2 rounded">
					<Typography
						as="span"
						variant="small"
						className="font-normal flex items-center gap-2"
					>
						<UserIcon className="h-4 w-4" />
						{user?.displayName}
					</Typography>
				</MenuItem>
				<MenuItem className="flex items-center gap-2 rounded">
					<Typography
						as="span"
						variant="small"
						className="font-normal flex items-center gap-2 capitalize"
					>
						<AcademicCapIcon className="h-4 w-4" /> {userData?.role}
					</Typography>
				</MenuItem>
				<NavLink
				to={
					(userData?.role === "organizer" && "/dashboard/organizer-profile") ||
					(userData?.role === "participant" &&
						"/dashboard/participant-profile") ||
					(userData?.role === "healthcare-professional" &&
						"/dashboard/professional-profile") ||
					"/login"
				}
			>
				<Typography
					as="li"
					variant="small"
					color="blue-gray"
					className="flex items-center gap-x-2 p-1 font-semibold hover:text-blue-800 transition-all border-b border-transparent hover:border-b-blue-800"
				>
					<SquaresPlusIcon className="h-5 w-5" />

					<div className="flex items-center">Dashboard</div>
				</Typography>
			</NavLink>
				<MenuItem className="flex items-center gap-2 rounded">
					<Typography
						as="span"
						variant="small"
						className="font-normal flex items-center gap-2 hover:text-red-500"
						onClick={handleLogout}
					>
						<PowerIcon className="h-4 w-4" /> Log Out
					</Typography>
				</MenuItem>
			</MenuList>
		</Menu>
	);
}

export default Header;
