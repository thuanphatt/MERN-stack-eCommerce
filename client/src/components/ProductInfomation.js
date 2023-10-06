import React, { memo, useState } from "react";

import { productInfoTabs } from "../utils/contants";
import { renderStarFromNumber } from "../utils/helpers";
import { Votebar } from "../components";

const ProductInfomation = ({ totalRatings, totalCount }) => {
	const [activedTab, setActivedTab] = useState(1);
	return (
		<div>
			<div className="flex items-center gap-1 relative bottom-[-1px]">
				{productInfoTabs.map((el) => (
					<span
						key={el.id}
						className={`p-2 px-4 text-[#505050] cursor-pointer ${
							activedTab === el.id ? "bg-white border border-b-0" : "bg-[#f1f1f1]"
						}`}
						onClick={() => {
							setActivedTab(el.id);
						}}
					>
						{el.name.toUpperCase()}
					</span>
				))}
				<div
					className={`p-2 px-4 text-[#505050] cursor-pointer ${
						activedTab === 5 ? "bg-white border border-b-0" : "bg-[#f1f1f1]"
					}`}
					onClick={() => {
						setActivedTab(5);
					}}
				>
					ĐÁNH GIÁ CỦA KHÁCH HÀNG
				</div>
			</div>
			<div className="border w-full p-4">
				{productInfoTabs.some((el) => activedTab === el.id) &&
					productInfoTabs.find((el) => el.id === activedTab)?.content}
				{activedTab === 5 && (
					<div className="flex">
						<div className="flex-4 flex flex-col items-center justify-center gap-2">
							<span className="font-semibold text-[22px]">{`${totalRatings}/5`}</span>
							<span className="flex items-center gap-1">
								{renderStarFromNumber(totalRatings)?.map((el, index) => (
									<span key={index}>{el}</span>
								))}
							</span>
							<span className="underline text-blue-500">{`${totalCount} đánh giá`}</span>
						</div>
						<div className="flex-6 flex flex-col-reverse gap-2">
							{Array.from(Array(5).keys()).map((el) => (
								<Votebar key={el} number={el + 1} ratingCount={5} ratingTotal={10} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default memo(ProductInfomation);
