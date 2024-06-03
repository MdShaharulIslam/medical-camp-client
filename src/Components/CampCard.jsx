import {
	AcademicCapIcon,
	CalendarDaysIcon,
	CurrencyBangladeshiIcon,
	MapPinIcon,
	UserGroupIcon,
	UserIcon,
} from "@heroicons/react/24/solid";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
} from "@material-tailwind/react";
import { AwesomeButton } from "react-awesome-button";
import { Link } from "react-router-dom";

const CampCard = ({ camp }) => {
	const {
		camp_name,
		image,
		date,
		name,
		_id,
		audience,
		camp_fees,
		location,
		healthcare,
		description,
	} = camp;
	const short_description = description?.slice(0, 120);
	return (
		<Card className="mt-6 w-full">
			<CardHeader color="blue-gray" className="relative h-56">
				<img
					src={image}
					alt={camp_name}
					className="w-full h-full object-cover"
				/>
			</CardHeader>
			<CardBody>
				<Typography variant="h4" className="mb-2 text-[#054279]">
					{camp_name}
				</Typography>
				<div className="flex justify-between">
					<Typography className="flex">
						<CalendarDaysIcon className="h-5 w-5 mr-1" /> {date}
					</Typography>
					<Typography className="flex">
						<MapPinIcon className="h-5 w-5 mr-1" /> {location}
					</Typography>
					<Typography className="flex">
						<CurrencyBangladeshiIcon className="h-5 w-5 mr-1" /> {camp_fees}
					</Typography>
				</div>
				<div className="flex justify-between my-3">
					<Typography className="flex">
						<UserIcon className="h-5 w-5 mr-1" /> {name}
					</Typography>
					<Typography className="flex">
						<AcademicCapIcon className="h-5 w-5 mr-1" /> {healthcare}
					</Typography>
					<Typography className="flex">
						<UserGroupIcon className="h-5 w-5 mr-1" /> {audience}
					</Typography>
				</div>
				<Typography>{short_description} ....</Typography>
			</CardBody>
			<CardFooter className="pt-0 mt-auto">
				<Link to={`/camp-details/${_id}`}>
					<AwesomeButton type="primary">Join Camp</AwesomeButton>
				</Link>
			</CardFooter>
		</Card>
	);
};

export default CampCard;
