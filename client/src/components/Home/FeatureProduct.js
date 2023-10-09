import React, { useState, useEffect, memo } from "react";
import { ProductCard } from "components";
import { apiGetProducts } from "apis";

const FeatureProduct = () => {
	const [products, setProducts] = useState(null);
	const fetchProducts = async () => {
		const response = await apiGetProducts({
			limit: 9,
		});
		if (response.success) setProducts(response.products);
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<div className="w-full">
			<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">
				Featured Products
			</h2>
			<div className="flex flex-wrap mt-[15px] mx-[-10px]">
				{products?.map((el, index) => (
					<ProductCard key={index} image={el.thumb} title={el.title} totalRatings={el.totalRatings} price={el.price} />
				))}
			</div>
			<div className="flex justify-between gap-5">
				<img
					src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
					alt="banner 1"
					className="w-[50%]"
				></img>
				<div className="flex flex-col justify-between w-[25%]">
					<img
						src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
						alt="banner 1"
						className="object-contain"
					></img>
					<img
						src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
						alt="banner 1"
					></img>
				</div>
				<img
					className="w-[25%] object-contain"
					src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
					alt="banner 1"
				></img>
			</div>
		</div>
	);
};

export default memo(FeatureProduct);
