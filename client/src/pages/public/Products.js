/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import Masonry from "react-masonry-css";

import { apiGetProducts } from "apis";
import { Breakcrumb, Product, ProductFilter, InputSelect, Pagination } from "components";
import { sorts } from "utils/contants";
const breakpointColumnsObj = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
};
const Products = () => {
	const navigate = useNavigate();
	const [productCategories, setProductCategories] = useState(null);
	const [activeClick, setActiveClick] = useState(null);
	const [params] = useSearchParams();
	const [sort, setSort] = useState("");
	const fetchProductsByCateroty = async (queries) => {
		const response = await apiGetProducts(queries);
		if (response.success) setProductCategories(response);
	};
	const { category } = useParams();
	useEffect(() => {
		let param = [];
		for (let i of params.entries()) param.push(i);
		const queries = {};
		let priceQuery = {};
		for (let i of params) queries[i[0]] = i[1];
		if (queries.to && queries.from) {
			priceQuery = {
				$and: [{ price: { gte: queries.from } }, { price: { lte: queries.to } }],
			};
			delete queries.price;
		} else {
			if (queries.from) queries.price = { gte: queries.from };
			if (queries.to) queries.price = { lte: queries.to };
		}
		delete queries.to;
		delete queries.from;
		const q = { ...priceQuery, ...queries };
		fetchProductsByCateroty(q);
		window.scrollTo(0, 0);
	}, [params]);
	const changeActiveFilter = useCallback(
		(name) => {
			if (activeClick === name) setActiveClick(null);
			else setActiveClick(name);
		},
		[activeClick]
	);
	const changeValue = useCallback(
		(value) => {
			setSort(value);
		},
		[sort]
	);

	useEffect(() => {
		if (sort) {
			// let param = [];
			// for (let i of params.entries()) param.push(i);
			// const queries = ;
			// for (let i of params) queries[i[0]] = i[1];
			navigate({
				pathname: `/${category}`,
				search: createSearchParams({ sort }).toString(),
			});
		}
	}, [sort, params]);

	return (
		<div className="w-full">
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3 className="uppercase font-semibold mb-1">{category}</h3>
					<Breakcrumb category={category} />
				</div>
			</div>
			<div className="w-main m-auto flex items-center justify-between border py-6 px-4 mt-8">
				<div className="w-4/5 flex flex-col gap-2">
					<span className="font-semibold text-[14px]">Lọc theo</span>
					<div className="flex items-center gap-2 text-gray-700">
						<ProductFilter name="Giá" activeClick={activeClick} changeActiveFilter={changeActiveFilter} type="input" />
						<ProductFilter name="Màu sắc" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
					</div>
				</div>
				<div className="w-1/5 flex flex-col gap-2">
					<span className="font-semibold text-[14px]">Sắp xếp theo</span>
					<div className="w-full">
						<InputSelect value={sort} options={sorts} changeValue={changeValue} />
					</div>
				</div>
			</div>
			<div className="w-main m-auto mt-8">
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid flex flex-wrap mx-[-10px]"
					columnClassName="my-masonry-grid_column"
				>
					{productCategories?.products?.map((el) => (
						<Product key={el._id} pid={el._id} productData={el} normal={true} />
					))}
				</Masonry>
			</div>
			<div className="w-main m-auto my-4 flex justify-end">
				<Pagination totalCount={productCategories?.counts} />
			</div>
			<div className="w-full h-[500px]"></div>
		</div>
	);
};

export default Products;
