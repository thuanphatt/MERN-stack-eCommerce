import React, { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Masonry from "react-masonry-css";

import { apiGetProducts } from "../../apis";
import { Breakcrumb, Product, FilterItem } from "../../components";
const Products = () => {
	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1,
	};
	const { category } = useParams();
	const [productsCategory, setProductsCategory] = useState(null);
	const [activeClick, setActiveClick] = useState(null);
	const fetchProductsByCateroty = async (queries) => {
		const reponse = await apiGetProducts(queries);
		if (reponse.success) setProductsCategory(reponse.products);
	};
	const changeActiveFilter = useCallback(
		(name) => {
			if (activeClick === name) setActiveClick(null);
			else setActiveClick(name);
		},
		[activeClick]
	);
	useEffect(() => {
		fetchProductsByCateroty();
	}, []);
	return (
		<div className="w-full">
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3 className="uppercase font-semibold mb-1"> {category}</h3>
					<Breakcrumb category={category} />
				</div>
			</div>
			<div className="w-main m-auto flex items-center justify-between border py-6 px-4 mt-8">
				<div className="w-4/5 flex flex-col gap-2">
					<span className="font-semibold text-[14px]">Lọc theo</span>
					<div className="flex items-center gap-2 text-gray-700">
						<FilterItem
							name="Giá"
							activeClick={activeClick}
							changeActiveFilter={changeActiveFilter}
						/>
						<FilterItem
							name="Màu sắc"
							activeClick={activeClick}
							changeActiveFilter={changeActiveFilter}
						/>
					</div>
				</div>
				<div className="w-1/5 ">
					<span className="font-semibold text-[14px]">Sắp xếp theo</span>
				</div>
			</div>
			<div className="w-main m-auto mt-8">
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid flex flex-wrap mx-[-10px]"
					columnClassName="my-masonry-grid_column"
				>
					{productsCategory?.map((el) => (
						<Product key={el} productData={el} normal={true} />
					))}
				</Masonry>
			</div>
			<div className="w-full h-[500px]"></div>
		</div>
	);
};

export default Products;
