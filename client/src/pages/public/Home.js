import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Sidebar, Banner, BestSeller, DailyDeal, FeatureProduct, HotCollections, CustomerSlider } from "components";

const Home = () => {
	const { newProducts } = useSelector((state) => state.products);
	return (
		<div className="mt-8">
			<div className="w-main flex">
				<div className="flex flex-col gap-5 w-[25%] flex-auto">
					<Sidebar />
					<DailyDeal />
				</div>
				<div className="flex flex-col gap-8 pl-5 w-[75%] flex-auto">
					<Banner />
					<BestSeller />
				</div>
			</div>
			<div className="my-4 w-main">
				<FeatureProduct />
			</div>
			<div className="my-4 w-main">
				<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">Mới nhất</h2>
				<div className="mt-2 mx-[-10px] pt-3">
					<CustomerSlider products={newProducts} />
				</div>
			</div>
			<div className="my-4 w-main">
				<HotCollections />
			</div>
			<div className="my-4 w-main">
				<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">
					BÀI ĐĂNG TRÊN BLOG
				</h2>
			</div>
			<div className="w-main h-[500px]"></div>
		</div>
	);
};

export default memo(Home);
