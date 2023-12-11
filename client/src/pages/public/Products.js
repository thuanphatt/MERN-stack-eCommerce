/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, memo } from "react";
import { useParams, useSearchParams, useNavigate, createSearchParams } from "react-router-dom";
import Masonry from "react-masonry-css";

import { apiGetProducts } from "apis";
import { Breakcrumb, Product, SearchItem, InputSelect, Pagination, Loading } from "components";
import { sorts } from "utils/contants";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";
const breakpointColumnsObj = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
};
const Products = ({ dispatch }) => {
	const navigate = useNavigate();
	const [productCategories, setProductCategories] = useState(null);
	const [activeClick, setActiveClick] = useState(null);
	const [counts, setCounts] = useState(0);
	const [params] = useSearchParams();
	const [sort, setSort] = useState("");

	const { category } = useParams();
	const fetchProductsByCateroty = async (queries) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiGetProducts(queries);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			setProductCategories(response.products);
			setCounts(response.counts);
		}
	};
	useEffect(() => {
		const queries = Object.fromEntries([...params]);
		let priceQuery = {};
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
		const q = { category, ...queries, ...priceQuery };
		if (q.category === ":category") {
			delete q.category;
		}
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
			navigate({
				pathname: `/products/${category}`,
				search: createSearchParams({ sort }).toString(),
			});
		}
	}, [sort, params]);
	return (
		<div className="w-full">
			<div className="h-[81px] bg-gray-100 flex md:justify-center md:items-center md:px-0 px-4 md:flex-row flex-col md:pt-0 pt-4">
				<div className="md:w-main w-full">
					<h3 className="uppercase font-semibold mb-1 truncate md:max-w-full max-w-[400px]">
						{category === ":category" ? "Sản phẩm" : category}
					</h3>
					<Breakcrumb category={category === ":category" ? "Sản phẩm" : category} />
				</div>
			</div>
			{Object.fromEntries([...params]).q && (
				<div className="md:w-main mx-auto mt-8 text-center text-lg font-semibold">{`Kết quả tìm kiếm cho "${
					Object.fromEntries([...params]).q
				}", có ${counts} sản phẩm phù hợp`}</div>
			)}

			<div className="md:w-main w-full m-auto flex md:items-center justify-between border py-6 px-4 mt-8 md:flex-row flex-col md:gap-0 gap-4">
				<div className="md:w-4/5 w-full flex flex-col gap-2">
					<span className="font-semibold text-[14px]">Lọc theo</span>
					<div className="flex items-center gap-2 text-gray-700">
						<SearchItem name="Giá" activeClick={activeClick} changeActiveFilter={changeActiveFilter} type="input" />
						<SearchItem name="Màu sắc" activeClick={activeClick} changeActiveFilter={changeActiveFilter} />
						<SearchItem
							name="Thương hiệu"
							activeClick={activeClick}
							changeActiveFilter={changeActiveFilter}
							type="input-brand"
						/>
					</div>
				</div>
				<div className="w-1/5 flex flex-col gap-2">
					<span className="font-semibold text-[12px] w-full">Sắp xếp theo</span>
					<div className="w-full">
						<InputSelect value={sort} options={sorts} changeValue={changeValue} />
					</div>
				</div>
			</div>
			<div className="md:w-main m-auto mt-8 w-full md:px-0 px-4">
				{counts === 0 && productCategories ? (
					<h2 className="font-semibold text-xl text-center w-full md:my-[200px]">Không có sản phẩm phù hợp</h2>
				) : (
					<Masonry
						breakpointCols={breakpointColumnsObj}
						className="my-masonry-grid flex flex-wrap md:mx-[-10px]"
						columnClassName="my-masonry-grid_column"
					>
						{productCategories
							?.filter((product) => product.inputPrice)
							?.map((el) => (
								<Product key={el._id} pid={el._id} productData={el} normal={true} />
							))}
					</Masonry>
				)}
			</div>
			{productCategories && (
				<div className="md:w-main m-auto my-4 flex justify-end w-full md:px-0 px-4">
					<Pagination totalCount={counts} />
				</div>
			)}
		</div>
	);
};

export default withBaseComponent(memo(Products));
