const PageBanner = ({ title }) => {
	return (
		<div className="bg-[url('https://i.ibb.co/D1rQvGJ/about-banner.jpg')] bg-center bg-cover h-[350px] w-full relative">
			<div className="absolute w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
				<h1 className="text-5xl text-white font-semibold uppercase border-b-4">
					{title}
				</h1>
			</div>
		</div>
	);
};

export default PageBanner;
