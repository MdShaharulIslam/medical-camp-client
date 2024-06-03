const PageHeader = ({ title }) => {
	return (
		<div className="py-5 md:py-10">
			<h1 className="text-2xl md:text-4xl text-center font-bold text-[#054279]">
				<span>----</span> {title} <span>----</span>
			</h1>
		</div>
	);
};

export default PageHeader;
