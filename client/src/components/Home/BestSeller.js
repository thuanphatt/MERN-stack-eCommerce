import React, { useEffect, useState, memo } from "react";
import { apiGetProducts } from "apis/product";
import { CustomerSlider } from "components";
import { getNewProducts } from "store/products/asyncActions";
import { useSelector } from "react-redux";
import withBaseComponent from "hocs/withBaseComponent";
import { apiGetContents } from "apis";
const tabs = [
	{ id: 1, name: "Bán chạy" },
	{ id: 2, name: "Mới nhất" },
];
const BestSeller = ({ navigate, dispatch }) => {
	const [bestSeller, setBestSeller] = useState(null);
	const [activedTab, setActivedTab] = useState(1);
	const [products, setProducts] = useState(null);
	const [productBanner, setProductBanner] = useState(null);
	const { newProducts } = useSelector((state) => state.products);
	const [contents, setContents] = useState(null);
	const fetchProducts = async () => {
		const response = await apiGetProducts({ sort: "-sold", limit: 50 });
		if (response?.success) {
			setBestSeller(response.products);
			setProducts(response.products);
			setProductBanner(
				response.products.filter(
					(product) => product._id === "6534ecfca87c24c93c67b346" || product._id === "6534fe97a87c24c93c67b880"
				)
			);
		}
	};
	const fetchBanners = async () => {
		const response = await apiGetContents();
		if (response.success) setContents(response.contents[0]);
	};
	useEffect(() => {
		fetchBanners();
	}, []);
	useEffect(() => {
		fetchProducts();
		dispatch(getNewProducts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (activedTab === 1) setProducts(bestSeller);
		if (activedTab === 2) setProducts(newProducts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activedTab]);
	return (
		products && (
			<div className="w-full px-4 md:px-0">
				<div className="flex ml-[-32px]">
					{tabs.map((el) => (
						<span
							className={`font-semibold text-xl border-r px-8 cursor-pointer uppercase text-gray-500 ${
								activedTab === el.id ? "text-gray-950" : ""
							}`}
							key={el.id}
							onClick={() => setActivedTab(el.id)}
						>
							{el.name}
						</span>
					))}
				</div>
				<div className="w-full border-b-2 border-main mt-3"></div>
				<div className="mt-2 pt-3 w-full">
					<CustomerSlider products={products} activedTab={activedTab} />
				</div>
				<div className="flex gap-4 mt-5 w-full">
					<div
						className="cursor-pointer flex-1 hover:opacity-80"
						onClick={() => {
							productBanner &&
								navigate(`/products/${productBanner[1]?.category}/${productBanner[1]?._id}/${productBanner[1]?.title}`);
						}}
					>
						<img
							src={productBanner && contents?.bannerSub[0]}
							alt={productBanner && contents?.bannerSub[0]}
							className="object-contain"
						></img>
					</div>
					<div
						className="cursor-pointer flex-1 hover:opacity-80"
						onClick={() => {
							productBanner &&
								navigate(`/products/${productBanner[0]?.category}/${productBanner[0]?._id}/${productBanner[0]?.title}`);
						}}
					>
						<img
							src={productBanner && contents?.bannerSub[1]}
							alt={productBanner && contents?.bannerSub[1]}
							className="object-contain"
						></img>
					</div>
				</div>
			</div>
		)
	);
};

export default withBaseComponent(memo(BestSeller));
