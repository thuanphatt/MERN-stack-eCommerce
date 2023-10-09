/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from "react";
import icons from "utils/icons";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { colors } from "utils/contants";

import { apiGetProducts } from "apis/product";
import { formatMoney, formatPrice } from "utils/helpers";
import useDebounce from "hooks/useDebounce";
const { AiOutlineDown } = icons;
const SearchItem = ({ name, activeClick, changeActiveFilter, type = "checkbox" }) => {
	const navigate = useNavigate();
	const { category } = useParams();
	const [selected, setSelected] = useState([]);
	const [bestPrice, setBestPrice] = useState(null);
	const [price, setPrice] = useState({ from: "", to: "" });
	const [params] = useSearchParams();
	const handleSelect = (e) => {
		const alreadyEl = selected.find((el) => el === e.target.value);
		if (alreadyEl) setSelected((prev) => prev.filter((el) => el !== e.target.value));
		else setSelected((prev) => [...prev, e.target.value]);
		changeActiveFilter(null);
	};
	const fetchBestPriceProduct = async () => {
		const response = await apiGetProducts({ sort: "-price", limit: 1 });
		if (response.success) setBestPrice(response.products[0]?.price);
	};
	useEffect(() => {
		let param = [];
		for (let i of params.entries()) param.push(i);
		const queries = {};
		for (let i of param) queries[i[0]] = i[1];
		if (selected.length > 0) {
			queries.color = selected.join(",");
			queries.page = 1;
		} else {
			delete queries.color;
		}
		navigate({
			pathname: `/${category}`,
			search: createSearchParams(queries).toString(),
		});
	}, [selected]);
	useEffect(() => {
		if (type === "input") fetchBestPriceProduct();
	}, [type]);
	useEffect(() => {
		if (price.from && price.to && price.from > price.to) {
			alert("Giá điều chỉnh chưa hợp lý, nên xem lại giá!");
		}
	}, [price]);
	const debouncePriceFrom = useDebounce(price.from, 500);
	const debouncePriceTo = useDebounce(price.to, 500);
	useEffect(() => {
		let param = [];
		for (let i of params.entries()) param.push(i);
		const queries = {};
		for (let i of param) queries[i[0]] = i[1];
		if (Number(price.from) > 0) queries.from = price.from;
		else delete queries.from;
		if (Number(price.to) > 0) queries.to = price.to;
		else delete queries.to;
		queries.page = 1;
		navigate({
			pathname: `/${category}`,
			search: createSearchParams(queries).toString(),
		});
	}, [debouncePriceFrom, debouncePriceTo]);

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
										changeActiveFilter(null);
									}}
								>
									Tải lại
								</span>
							</div>
							<div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
								{colors?.map((el, index) => (
									<div className="flex items-center gap-2 pl-4" key={index}>
										<input
											type="checkbox"
											onChange={handleSelect}
											value={el}
											id={el}
											checked={selected.some((selectedItem) => selectedItem === el)}
										/>
										<label htmlFor={el} className="capitalize text-gray-700 cursor-pointer">
											{el}
										</label>
									</div>
								))}
							</div>
						</div>
					)}
					{type === "input" && (
						<div
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							<div className="p-4 flex items-center justify-between gap-8">
								<span className="cursor-pointer whitespace-nowrap">{`Giá cao nhất là ${formatMoney(
									formatPrice(bestPrice)
								)} VNĐ`}</span>
								<span
									className="cursor-pointer underline hover:text-main whitespace-nowrap"
									onClick={(e) => {
										e.stopPropagation();
										setPrice({
											from: "",
											to: "",
										});
										changeActiveFilter(null);
									}}
								>
									Tải lại
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-2">
									<label htmlFor="from">Từ</label>
									<input
										type="number"
										id="from"
										className="border px-2 py-1 focus:outline-none"
										value={price.from}
										onChange={(e) => setPrice((prev) => ({ ...prev, from: e.target.value }))}
									/>
								</div>
								<div className="flex items-center gap-2">
									<label htmlFor="to">Đến</label>
									<input
										type="number"
										id="to"
										className="border px-2 py-1 focus:outline-none"
										value={price.to}
										onChange={(e) => setPrice((prev) => ({ ...prev, to: e.target.value }))}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default memo(SearchItem);
