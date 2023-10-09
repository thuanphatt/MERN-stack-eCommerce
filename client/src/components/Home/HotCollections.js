import React from "react";
import icons from "utils/icons";
import { useSelector } from "react-redux";
const { IoIosArrowForward } = icons;
const HotCollections = () => {
	const { categories } = useSelector((state) => state.app);
	return (
		<>
			<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">
				hot collections
			</h2>
			<div className="flex flex-wrap justify-between mt-4">
				{categories
					?.filter((el) => el.brand.length > 0)
					?.map((el) => (
						<div key={el._id} className="w-1/3 flex-initial p-2 mx-[-8px]">
							<div className="border flex min-h-[230px] p-4 gap-4 items-center">
								<img src={el.image} alt={el.title} className="w-[144px] h-[129px] object-cover flex-1"></img>
								<div className="flex-1 text-gray-700">
									<h4 className="font-semibold uppercase m-1">{el.title}</h4>
									<ul className="text-sm">
										{el?.brand?.map((item, index) => (
											<span className="flex items-center text-gray-500 mt-2" key={index}>
												<IoIosArrowForward size={14} /> <li>{item}</li>
											</span>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default HotCollections;
