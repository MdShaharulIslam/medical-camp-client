import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";

const Testimonials = () => {
	const axiosPublic = useAxiosPublic();
	const { data: reviews = [], isPending } = useQuery({
		queryKey: ["feedback"],
		queryFn: async () => {
			const res = await axiosPublic.get("/feedback");
			return res.data;
		},
	});

	if (isPending) {
		return <Spinner />;
	}

	return (
		<section className="my-10 py-10 bg-[#054279]">
			<h1 className="text-2xl md:text-4xl text-center font-bold text-white">
				<span>----</span> Testimonials <span>----</span>
			</h1>
			<div className="py-10">
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Autoplay, Pagination, Navigation]}
					className="mySwiper"
				>
					{reviews.map((review) => (
						<SwiperSlide key={review._id}>
							<div className="flex flex-col md:flex-row md:justify-around w-full md:w-4/5 text-white mx-auto">
								<div className="w-full md:w-1/3">
									<img
										src={review.participant_image}
										alt={review.participant_name}
										className="w-20 h-20 rounded-full mx-auto mb-2"
									/>
									<h3 className="text-4xl font-semibold text-center">
										{review.participant_name}
									</h3>
								</div>
								<div className="w-full md:w-2/3">
									<Rating
										style={{ maxWidth: 160 }}
										value={review.rating}
										readOnly
										className="mx-auto"
									/>
									<p className="mx-auto text-center my-3">{review.feedback}</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

export default Testimonials;
