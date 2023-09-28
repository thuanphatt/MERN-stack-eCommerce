import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";

import { apiGetProduct } from "../../apis/product";
import { Breakcrumb } from "../../components";
var settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
};
const DetailProduct = () => {
	const { pid, title, category } = useParams();
	// eslint-disable-next-line no-unused-vars
	const [product, setProduct] = useState(null);
	const fetchProductData = async () => {
		const response = await apiGetProduct(pid);
		if (response.success) setProduct(response.productData);
	};
	useEffect(() => {
		if (pid) fetchProductData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pid]);
	return (
		<div className="w-full">
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3> {title}</h3>
					<Breakcrumb title={title} category={category} />
				</div>
			</div>
			<div className="w-main m-auto mt-5 flex">
				<div className="w-2/5 flex flex-col gap-4">
					<div className="h-[458px] w-[485px] border">
						<ReactImageMagnify
							{...{
								smallImage: {
									alt: "",
									isFluidWidth: true,
									src: product?.thumb,
									width: 485,
								},
								largeImage: {
									src: product?.thumb,
									width: 1000,
									height: 1000,
								},
							}}
						/>
					</div>
					<div className="w-[485px] mt-[30px]">
						<Slider {...settings} className="img-slider">
							{product?.images.map((el) => (
								<div className="px-2">
									<img
										key={el}
										src={el}
										alt="sub-product"
										className="h-[143px] w-[143px] border object-cover"
									/>
								</div>
							))}
							<div>
								<img
									src={product?.images[2]}
									alt="sub-product"
									className="h-[143px] w-[143px] border object-cover"
								/>
							</div>
						</Slider>
					</div>
				</div>
				<div className="w-2/5">price</div>
				<div className="w-1/5">infomation</div>
			</div>
			<div className="h-[800px] w-full"></div>
		</div>
	);
};

export default DetailProduct;
