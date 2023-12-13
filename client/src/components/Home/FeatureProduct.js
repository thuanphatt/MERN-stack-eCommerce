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
			<div className="grid md:grid-cols-3 grid-cols-1 mt-[15px] md:mx-[-10px] md:gap-0 gap-2">
				{products?.map((el, index) => (
					<ProductCard
						key={index}
						image={el.thumb}
						title={el.title}
						totalRatings={el.totalRatings}
						price={el.price}
						handleonClick={() => {
							navigate(`/products/${el?.category[0]}/${el?._id}/${el?.title}`);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default memo(FeatureProduct);
