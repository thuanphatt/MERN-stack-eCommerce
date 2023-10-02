import React, { memo, useEffect, useState } from "react";
import icons from "../utils/icons";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { colors } from "../utils/contants";
const { AiOutlineDown } = icons;
const FilterItem = ({
	name,
	activeClick,
	changeActiveFilter,
	type = "checkbox",
}) => {
	const navigate = useNavigate();
	const { category } = useParams();
	const [selected, setSelected] = useState([]);
	const handleSelect = (e) => {
		const alreadyEl = selected.find((el) => el === e.target.value);
		if (alreadyEl)
			setSelected((prev) => prev.filter((el) => el !== e.target.value));
		else setSelected((prev) => [...prev, e.target.value]);
		changeActiveFilter(null);
	};
	useEffect(() => {
		navigate({
			pathname: `/${category}`,
			search: createSearchParams({
				color: selected,
			}).toString(),
		});
	}, [selected]);
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
				<div className="absolute top-[calc(100%+4px)] left-0 w-fit p-4 bg-white min-w-[150px] border z-10">
					{type === "checkbox" && (
						<div>
							<div className="p-4 flex items-center justify-between gap-8">
								<span className="cursor-pointer whitespace-nowrap">{`${selected.length} đã chọn`}</span>
								<span
									className="cursor-pointer underline hover:text-main whitespace-nowrap"
									onClick={(e) => {
										e.stopPropagation();
										setSelected([]);
									}}
								>
									Tải lại
								</span>
							</div>
							<div
								className="flex flex-col gap-2"
								onClick={(e) => e.stopPropagation()}
							>
								{colors?.map((el, index) => (
									<div className="flex items-center gap-2 pl-4" key={index}>
										<input
											type="checkbox"
											onChange={handleSelect}
											value={el}
											id={el}
											checked={selected.some(
												(selectedItem) => selectedItem === el
											)}
										/>
										<label
											htmlFor={el}
											className="capitalize text-gray-700 cursor-pointer"
										>
											{el}
										</label>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default memo(FilterItem);
