import { Input } from "@material-tailwind/react";
import { AwesomeButton } from "react-awesome-button";
import Swal from "sweetalert2";

const NewsLetter = () => {
	const handleSubscribe = (e) => {
		e.preventDefault();
		const form = e.target;

		Swal.fire({
			text: "Thank you for subscribing to our newsletter!",
			icon: "success",
		});
		form.email.value = "";
	};
	return (
		<div className="my-10">
			<div
				className="w-full h-auto bg-cover bg-center py-10"
				style={{
					backgroundImage:
						"url(https://i.ibb.co/crF5g7F/Banner1.jpg)",
				}}
			>
				<div className="max-w-sm md:max-w-xl lg:max-w-3xl mx-auto bg-black bg-opacity-70 rounded-xl py-5">
					<h3 className="text-3xl lg:text-5xl font-bold text-white text-opacity-75 uppercase text-center tracking-[10px] lg:tracking-[20px] py-4">
						NewsLetter
					</h3>
					<div className="card-body text-center flex flex-col gap-4 text-gray-400">
						<h2 className="text-xl lg:text-2xl font-black">
							Don&#39;t miss new camp posts!
						</h2>
						<div>
							<p className="font-bold">
								Subscribe to all update health info and camp details.
							</p>
							<p className="text-xs">
								You will only receive an email when a new camp and health info.
								No spam. No ads.
							</p>
						</div>
						<div>
							<form onSubmit={handleSubscribe}>
								<div className="form-control w-full max-w-md mx-auto">
									<div className="flex gap-1 pb-5">
										<Input
											type="email"
											name="email"
											color="blue"
											label="Enter your email"
											required
										/>
										<AwesomeButton
											type="primary"
											name="subscribe"
											className="join-item btn lg:btn-lg bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
										>
											Subscribe
										</AwesomeButton>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsLetter;
