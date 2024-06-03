import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Banner1 from "../assets/Banner/Banner1.jpg";
import Banner2 from "../assets/Banner/Banner2.png";
import Banner3 from "../assets/Banner/Banner3.png";
import Banner4 from "../assets/Banner/Banner4.png";

const SliderBanner = () => {
	return (
		<div>
			<Swiper
				cssMode={true}
				navigation={true}
				pagination={true}
				mousewheel={true}
				keyboard={true}
				modules={[Navigation, Pagination, Mousewheel, Keyboard]}
				className="mySwiper"
			>
				<SwiperSlide>
					<figure className="relative w-full">
						<img
							className="h-[500px] w-full rounded-xl object-cover object-center"
							src={Banner1}
							alt="nature image"
						/>
						<figcaption className="absolute top-0 left-0 bg-black w-full h-full bg-opacity-40">
							<div className="flex justify-center items-start h-full flex-col ml-20">
								<h1 className="text-2xl font-semibold uppercase">
									Welcome to <br />{" "}
									<span className="text-7xl font-bold text-[#054279] z-50">
										MediCamp
									</span>
								</h1>
								<p>Your Trusted Provider of Medical Services</p>
								<Link to="/available-camps">
									<AwesomeButton
										type="primary"
										size="small"
										style={{ height: "35px", width: "120px" }}
									>
										Learn More
									</AwesomeButton>
								</Link>
							</div>
						</figcaption>
					</figure>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner4}
						alt="Banner4"
						className="h-[500px] w-full object-cover"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner3}
						alt="Banner3"
						className="h-[500px] w-full object-cover"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner2}
						alt="Banner2"
						className="h-[500px] w-full object-cover"
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default SliderBanner;
