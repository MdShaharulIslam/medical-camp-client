import { Helmet } from "react-helmet-async";
import SliderBanner from "../../Components/SliderBanner";
import PopularMedicalCamps from "../../Components/PopularMedicalCamps";
import Testimonials from "./../../Components/Testimonials";
import Healthcare from "../../Components/Healthcare";
import NewsLetter from "../../Components/NewsLetter";

const Home = () => {
	return (
		<>
			<Helmet>
				<title>MediCamp | Home</title>
			</Helmet>
			<main>
				<SliderBanner />
				<PopularMedicalCamps />
				<Testimonials />
				<Healthcare />
				<NewsLetter />
			</main>
		</>
	);
};

export default Home;
