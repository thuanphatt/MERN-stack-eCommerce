import React, { memo } from "react";
import icons from "../utils/icons";
const { AiOutlineDown } = icons;
const FilterItem = ({ name, activeClick, changeActiveFilter }) => {
	return (
		<div
			className="relative flex items-center justify-between border border-gray-800 p-3 text-[12px] gap-6"
			onClick={() => {
				changeActiveFilter(name);
			}}
		>
			<span className="text-gray-500">{name}</span>
			<AiOutlineDown />
			{activeClick === name && (
				<div className="absolute top-full left-0 w-fit p-4 bg-red-400">
					content
				</div>
			)}
		</div>
	);
};

export default memo(FilterItem);
