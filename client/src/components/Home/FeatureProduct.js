import React, { useState, useEffect, memo } from "react";
import { ProductCard } from "components";
import { apiGetProducts } from "apis";
import { useNavigate } from "react-router-dom";

const FeatureProduct = () => {
	const [products, setProducts] = useState(null);
	const fetchProducts = async () => {
		const response = await apiGetProducts({
			limit: 9,
			sort: "-totalRatings",
		});
		if (response.success) setProducts(response.products);
	};
	const navigate = useNavigate();
	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<div className="w-full">
			<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">
				Sản phẩm nổi bật
			</h2>
			<div className="flex flex-wrap mt-[15px] mx-[-10px]">
				{products?.map((el, index) => (
					<ProductCard
						key={index}
						image={el.thumb}
						title={el.title}
						totalRatings={el.totalRatings}
						price={el.price}
						handleonClick={() => {
							navigate(`/${el?.category[0]}/${el?._id}/${el?.title}`);
						}}
					/>
				))}
			</div>
			<div className="grid grid-cols-4 grid-rows-2 gap-5">
				<img
					src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg"
					alt="banner 1"
					className="w-full hover:opacity-80 h-full object-cover col-span-2 row-span-2"
				></img>
				<img
					src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg"
					alt="banner 2"
					className="w-full hover:opacity-80 h-full object-cover col-span-1 row-span-1"
				></img>
				<img
					className="w-full hover:opacity-80 h-full object-cover col-span-1 row-span-2"
					src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg"
					alt="banner 4"
				></img>
				<img
					src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg"
					alt="banner 3"
					className="w-full hover:opacity-80 h-full object-cover col-span-1 row-span-1"
				></img>
			</div>
		</div>
	);
};

export default memo(FeatureProduct);
