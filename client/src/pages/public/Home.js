import React, { memo } from "react";
import { useSelector } from "react-redux";
import {
	Sidebar,
	Banner,
	BestSeller,
	DailyDeal,
	FeatureProduct,
	HotCollections,
	CustomerSlider,
	Feedback,
	InfoNews,
	DiscountCode,
} from "components";

const Home = () => {
	const { newProducts } = useSelector((state) => state.products);
	return (
		<div className="mt-8 md:w-main w-full">
			<div className="md:w-main flex w-full md:flex-row flex-col-reverse">
				<div className="flex flex-col gap-5 md:w-[25%] w-full md:px-0 px-4">
					<Sidebar />
					<DailyDeal />
				</div>
				<div className="flex flex-col gap-8 md:pl-5 md:w-[75%] w-full ">
					<Banner />
					<BestSeller />
				</div>
			</div>
			<div className="my-4 md:w-main w-full">
				<DiscountCode />
			</div>
			<div className="my-4 md:w-main w-full md:px-0 px-4">
				<FeatureProduct />
			</div>
			<div className="my-4 md:w-main w-full md:px-0 px-4">
				<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">Mới nhất</h2>
				<div className="mt-2 pt-3 w-full">
					<CustomerSlider products={newProducts} />
				</div>
			</div>
			<div className="my-4 md:w-main w-full md:px-0 px-4">
				<HotCollections />
			</div>
			<div className="my-4 md:w-main w-full md:px-0 px-4">
				<Feedback />
			</div>
			<div className="my-4 md:w-main w-full md:px-0 px-4">
				<InfoNews />
			</div>
			<div className="md:w-main h-[50px] w-full md:px-0 px-4"></div>
		</div>
	);
};

export default memo(Home);
