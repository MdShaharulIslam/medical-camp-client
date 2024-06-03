import { AwesomeButton } from "react-awesome-button";
import useCamps from "../Hooks/useCamps";
import CampCard from "./CampCard";
import PageHeader from "./PageHeader";
import { Link } from "react-router-dom";

const PopularMedicalCamps = () => {
	const [campsData] = useCamps();
	const popularCamps = campsData?.slice(0, 6);
	return (
		<div>
			<PageHeader title="Popular Medical Camps" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{popularCamps?.map((camp) => (
					<CampCard key={camp?._id} camp={camp} />
				))}
			</div>
			<Link to="/available-camps" className="flex justify-center mt-8">
				<AwesomeButton type="secondary">See All Camps</AwesomeButton>
			</Link>
		</div>
	);
};

export default PopularMedicalCamps;
