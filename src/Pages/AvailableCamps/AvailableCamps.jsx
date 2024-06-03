import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Input, Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import PageHeader from "../../Components/PageHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import CampCard from "../../Components/CampCard";

const AvailableCamps = () => {
	const axiosPublic = useAxiosPublic();
	const {
		data: campsData = [],
		isPending: loading,
		refetch,
	} = useQuery({
		queryKey: ["camps"],
		queryFn: async () => {
			const res = await axiosPublic.get("/camps");
			return res.data;
		},
	});
	const [searchItem, setSearchItem] = useState("");
	const [filteredCamps, setFilteredCamps] = useState(campsData);

	const handleInputChange = (e) => {
		const searchTerm = e.target.value;
		setSearchItem(searchTerm);

		const filteredItems = campsData.filter((camp) =>
			camp.camp_name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredCamps(filteredItems);
		refetch();
	};

	return (
		<>
			<Helmet>
				<title>MediCamp | Home</title>
			</Helmet>
			<main>
				<PageHeader title="Available Camps" />
				<div className="w-4/6 md:w-1/2 lg:w-1/3 mx-auto">
					<Input
						size="lg"
						type="text"
						value={searchItem}
						onChange={handleInputChange}
						label="Type to search camps"
						icon={<MagnifyingGlassIcon />}
						color="blue"
					/>
				</div>
				{loading && <Spinner />}

				<div className="py-10">
					{searchItem.length > 0 ? (
						filteredCamps.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
								{filteredCamps.map((camp) => (
									<CampCard key={camp._id} camp={camp} />
								))}
							</div>
						) : (
							<div className="py-10">
								<h2 className="text-5xl text-[#054279] font-semibold text-center mb-3">
									Sorry!
								</h2>
								<p className="text-3xl text-[#054279] font-semibold text-center">
									Your Search Not Found!
								</p>
							</div>
						)
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							{campsData.map((camp) => (
								<CampCard key={camp._id} camp={camp} />
							))}
						</div>
					)}
				</div>
			</main>
		</>
	);
};

export default AvailableCamps;
