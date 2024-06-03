import { AwesomeButton } from "react-awesome-button";

const Profile = ({ user, handleModal }) => {
	const { name, image, role, phone, address } = user;

	return (
		<div className="p-5 w-full flex justify-between items-center text-white bg-blue-300">
			<div className="flex items-center flex-wrap gap-5">
				<img
					src={image}
					alt={name}
					className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4"
				/>
				<div>
					<span className="border-b mb-3">Profile Details</span>
					<h3 className="text-xl md:text-2xl font-semibold">{name}</h3>
					<p className="capitalize text-lg">{role}</p>
				</div>
			</div>
			<div>
				<span className="border-b mb-3">Contact Details</span>
				<p>Phone: {phone}</p>
				<p className="capitalize">Address: {address}</p>
			</div>
			<div className="text-2xl">
				<AwesomeButton type="secondary" onMouseDown={handleModal}>
					Update Profile
				</AwesomeButton>
			</div>
		</div>
	);
};

export default Profile;
