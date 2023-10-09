import React, { useState } from "react";
import { Link } from "react-router-dom";

import { formatMoney, renderStarFromNumber } from "utils/helpers";

import newLabel from "assets/new.png";
import trendingLabel from "assets/trending.png";
import { SelectOption } from "components";
import icons from "utils/icons";
const { AiFillEye, AiFillHeart, IoMenu } = icons;
const Product = ({ productData, isNew, normal }) => {
	const [isShowOptions, setIsShowOptions] = useState(false);

	return (
		<div className="w-full text-base px-[10px]">
			<Link
				to={`/${productData?.category[0]}/${productData?._id}/${productData?.title}`}
				className="w-full border p-[15px] flex flex-col items-center"
				onMouseEnter={(e) => {
					e.stopPropagation();
					setIsShowOptions(true);
				}}
				onMouseLeave={(e) => {
					e.stopPropagation();
					setIsShowOptions(false);
				}}
			>
				<div className="relative w-full">
					{isShowOptions && (
						<div className="absolute bottom-[-10px]  w-full flex justify-center gap-4 animate-slide-top">
							<SelectOption icon={<AiFillHeart />} />
							<SelectOption icon={<IoMenu />} />
							<SelectOption icon={<AiFillEye />} />
						</div>
					)}
					<img
						src={
							productData?.thumb ||
							"https://stores.blackberrys.com/VendorpageTheme/Enterprise/EThemeForBlackberrys/images/product-not-found.jpg"
						}
						alt={productData.title}
						className="w-[274px] h-[274px] object-cover"
					></img>
					{!normal && (
						<img
							src={isNew ? newLabel : trendingLabel}
							alt="label"
							className="absolute right-[-16px] top-[-4px] w-[70px] object-cover"
						></img>
					)}
				</div>
				<div className="flex flex-col gap-1 mt-[15px] items-start w-full">
					<span className="flex h-4">
						{renderStarFromNumber(productData?.totalRatings)?.map((el, index) => (
							<span key={index}>{el}</span>
						))}
					</span>
					<span className="line-clamp-1 capitalize">{productData?.title.toLowerCase()}</span>
					<span>{formatMoney(productData?.price)}VND</span>
				</div>
			</Link>
		</div>
	);
};

export default Product;