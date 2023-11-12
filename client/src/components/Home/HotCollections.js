import React, { memo } from "react";
import icons from "utils/icons";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
const { IoIosArrowForward } = icons;
const HotCollections = () => {
	const { categories } = useSelector((state) => state.app);
	const navigate = useNavigate();
	return (
		<>
			<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">
				BỘ SƯU TẬP HOT
			</h2>
			<div className="grid md:grid-cols-3 grid-cols-1 justify-between mt-4 gap-2">
				{categories
					?.filter((el) => el.brand.length > 0)
					?.map((el) => (
						<div key={el._id} id="hot-product" className="col-span-1 md:p-2 md:mx-[-8px] ">
							<div className="border flex min-h-[230px] p-4 gap-4 items-center ">
								<img
									src={el.image}
									alt={el.title}
									className="md:w-[144px] h-[129px] object-contain flex-1 max-w-[144px]"
								></img>
								<div className="flex-1 text-gray-700">
									<h4 className="font-semibold uppercase m-1  hover:text-gray-500">{el.title}</h4>
									<ul className="text-sm">
										{el?.brand?.map((item, index) => (
											<span
												className="flex items-center text-gray-500 mt-2 cursor-pointer hover:text-main hover:underline"
												key={index}
												onClick={(e) => {
													e.stopPropagation();
													navigate({
														pathname: `${el.title}`,
														search: createSearchParams({ brand: item }).toString(),
													});
													window.scrollTo({ top: 0, behavior: "smooth" });
												}}
											>
												<IoIosArrowForward size={14} />
												<li>{item}</li>
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

export default memo(HotCollections);
