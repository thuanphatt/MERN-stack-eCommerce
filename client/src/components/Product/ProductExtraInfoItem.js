import React, { memo } from "react";

const ProductExtraInfoItem = ({ title, sub, icon }) => {
	return (
		<div className="flex items-center border gap-3 p-3 mb-3">
			<span className="rounded-full bg-gray-600 p-2 text-white flex items-center justify-center">
				{icon}
			</span>
			<div className="flex flex-col items-start">
				<span className="text-sm text-gray-700 leading-[18px]">{title}</span>
				<span className="text-[12px] text-gray-500">{sub}</span>
			</div>
		</div>
	);
};

export default memo(ProductExtraInfoItem);
