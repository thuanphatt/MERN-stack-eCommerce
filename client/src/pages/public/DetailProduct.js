/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { IoIosArrowRoundBack } from "react-icons/io";

import { apiGetProduct, apiGetProducts } from "../../apis/product";
import { productExtraInfo } from "../../utils/contants";
import {
	Breakcrumb,
	Button,
	ProductExtraInfoItem,
	SelectQuantity,
	ProductInfomation,
	CustomerSlider,
} from "../../components";
import { formatMoney, formatPrice, renderStarFromNumber } from "../../utils/helpers";
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
	const [quantity, setQuantity] = useState(1);
	const [relatedProducts, setRelatedProducts] = useState(null);
	const [currentImage, setCurrentImage] = useState(null);

	const fetchProductData = async () => {
		const response = await apiGetProduct(pid);
		if (response.success) {
			setProduct(response.productData);
			setCurrentImage(response?.productData?.thumb);
		}
	};
	const fetchProductsData = async () => {
		const response = await apiGetProducts({ category });

		if (response.success) setRelatedProducts(response.products);
	};
	const handleQuantity = useCallback(
		(number) => {
			console.log(number);
			if (!Number(number) || Number(number) < 1) {
				return;
			} else {
				setQuantity(number);
			}
		},
		[quantity]
	);
	const handleChangeQuantity = useCallback((flag) => {
		if (flag === "minus" && quantity === 1) return;
		if (flag === "minus") {
			setQuantity((prev) => +prev - 1);
		}
		if (flag === "plus") {
			setQuantity((prev) => +prev + 1);
		}
	});
	const handleClickImage = (e, el) => {
		e.stopPropagation();
		setCurrentImage(el);
	};
	useEffect(() => {
		if (pid) {
			fetchProductData();
			fetchProductsData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pid]);
	return (
		<div className="w-full">
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3 className="uppercase font-semibold mb-1"> {title}</h3>
					<Breakcrumb title={title} category={category} />
				</div>
			</div>
			<div className="w-main m-auto mt-5 flex">
				<div className="w-2/5 flex flex-col gap-4">
					<ReactImageMagnify
						className="h-[458px] w-[485px] border"
						{...{
							smallImage: {
								alt: "",
								isFluidWidth: true,
								src:
									currentImage ||
									"https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
							},
							largeImage: {
								src:
									currentImage ||
									"https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
								width: 1200,
								height: 1200,
							},
						}}
					/>

					<div className="w-[485px] mt-[30px]">
						<Slider {...settings} className="img-slider">
							{product?.images.map((el) => (
								<div className="px-2">
									<img
										onClick={(e) => handleClickImage(e, el)}
										key={el}
										src={el}
										alt="sub-product"
										className="h-[143px] w-[143px] border object-cover cursor-pointer"
									/>
								</div>
							))}
							{product?.images.length <= 3 && (
								<div>
									<img
										src={product?.images[2]}
										alt="sub-product"
										className="h-[143px] w-[143px] border object-cover cursor-pointer"
									/>
								</div>
							)}
						</Slider>
					</div>
				</div>
				<div className="w-2/5 flex flex-col gap-4 pl-[45px] pr-6">
					<div className="flex items-center justify-between">
						<h3 className="text-[30px] font-semibold">{`${formatMoney(formatPrice(product?.price))} VND`}</h3>
						<div>
							<span className="text-gray-500">Kho:</span>
							<span className="text-[16px] font-medium px-1">{product?.quantity}</span>
						</div>
					</div>
					<div className="flex items-center">
						{renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
							<span key={index}>{el}</span>
						))}
						<div className="border-l-2 ml-1">
							<span className="text-[16px] font-medium px-1">{product?.sold}</span>
							<span className="text-gray-500">Đã bán</span>
						</div>
					</div>
					<ul className="list-square text-sm text-gray-500 pl-[16px]">
						{product?.description?.map((el, index) => (
							<li key={index} className="leading-[28px]">
								{el}
							</li>
						))}
					</ul>
					<div className="flex flex-col gap-8">
						<SelectQuantity
							quantity={quantity}
							handleQuantity={handleQuantity}
							handleChangeQuantity={handleChangeQuantity}
						/>
						<Button fullwidth>THÊM VÀO GIỎ HÀNG</Button>
						<Link to={`/${category}`}>
							<div className="flex items-center gap-2 hover:text-main cursor-pointer">
								<span>
									<IoIosArrowRoundBack size={24} />
								</span>
								<span className="uppercase"> Quay lại {category}</span>
							</div>
						</Link>
					</div>
				</div>
				<div className="w-1/5">
					{productExtraInfo.map((el) => (
						<ProductExtraInfoItem key={el.id} title={el.title} sub={el.sub} icon={el.icon} />
					))}
				</div>
			</div>
			<div className="w-main m-auto mt-8">
				<ProductInfomation totalRatings={product?.totalRatings} totalCount={15} />
			</div>
			<div className="w-main m-auto mt-4">
				<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main mb-4">
					CÓ THỂ BẠN CŨNG THÍCH
				</h2>
				<div className="mt-2 mx-[-10px] pt-3">
					<CustomerSlider products={relatedProducts} normal={true} />
				</div>
			</div>
			<div className="h-[800px] w-full"></div>
		</div>
	);
};

export default DetailProduct;
