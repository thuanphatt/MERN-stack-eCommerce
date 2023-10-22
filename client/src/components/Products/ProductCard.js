import React, { memo } from "react";
import { formatMoney, renderStarFromNumber } from "utils/helpers";
const ProductCard = ({ title, image, totalRatings, price, handleonClick }) => {
	return (
		<div
			className="w-1/3 flex-auto px-[10px] mb-4"
			onClick={() => {
				handleonClick();
			}}
		>
			<div className="flex border w-full cursor-pointer hover:bg-[#ccc] max-h-[150px]">
				<img
					src={
						image ||
						"https://stores.blackberrys.com/VendorpageTheme/Enterprise/EThemeForBlackberrys/images/product-not-found.jpg"
					}
					alt={title}
					className="w-[120px] h-[120px] object-contain p-4"
				></img>
				<div className="flex flex-col gap-2 mt-[15px] items-start w-full text-xs">
					<span className="line-clamp-1 capitalize">{title.toLowerCase()}</span>
					<span className="flex h-4">
						{renderStarFromNumber(totalRatings, 14)?.map((el, index) => (
							<span key={index}>{el}</span>
						))}
					</span>
					<span>{formatMoney(price)}VND</span>
				</div>
			</div>
		</div>
	);
};

export default memo(ProductCard);
