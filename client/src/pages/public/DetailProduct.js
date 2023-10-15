/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useState } from "react";
import { useParams, Link, createSearchParams } from "react-router-dom";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { IoIosArrowRoundBack } from "react-icons/io";
import DOMPurify from "dompurify";

import { apiGetProduct, apiGetProducts } from "apis/product";
import { productExtraInfo } from "utils/contants";
import {
	Breakcrumb,
	Button,
	ProductExtraInfoItem,
	SelectQuantity,
	ProductInfomation,
	CustomerSlider,
} from "components";
import { formatMoney, formatPrice, renderStarFromNumber } from "utils/helpers";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withBaseComponent from "hocs/withBaseComponent";
import { apiAddToCart } from "apis";
import { getCurrent } from "store/user/asyncActions";
import { toast } from "react-toastify";
import path from "utils/path";
var settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
};
const DetailProduct = ({ isQuickView, data, dispatch, navigate, location }) => {
	const { current } = useSelector((state) => state.user);
	const params = useParams();
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [relatedProducts, setRelatedProducts] = useState(null);
	const [currentImage, setCurrentImage] = useState(null);
	const [update, setUpdate] = useState(false);
	const [variant, setVariant] = useState(null);
	const [pid, setPid] = useState(null);
	const [category, setCategory] = useState(null);
	const [currentProduct, setCurrentProduct] = useState({
		title: "",
		price: "",
		images: [],
		color: "",
		thumb: "",
	});

	useEffect(() => {
		if (data) {
			setPid(data.pid);
			setCategory(data.category.toString());
		} else if (params && params.pid) {
			setPid(params.pid);
			setCategory(params.category.toString());
		}
	}, [data, params]);

	const fetchProductData = async () => {
		const response = await apiGetProduct(pid);
		// console.log(response)
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
	const handleAddToCart = async () => {
		if (!current) {
			Swal.fire({
				title: "Opps!",
				text: "Hãy đăng nhập trước để thêm giỏ hàng",
				showConfirmButton: true,
				confirmButtonText: "Đăng nhập",
				showCancelButton: true,
				cancelButtonText: "Hủy",
			}).then((rs) => {
				if (rs.isConfirmed) {
					navigate({
						pathname: `/${path.LOGIN}`,
						search: createSearchParams({ redirect: location.pathname }).toString(),
					});
				}
			});
		}
		const response = await apiAddToCart({
			pid,
			color: currentProduct.color || product?.color,
			quantity,
			price: currentProduct.price || product?.price,
			thumbnail: currentProduct.thumb || product?.thumb,
			title: currentProduct.title || product?.title,
		});
		if (response.success) {
			toast.success(response.mes);
			dispatch(getCurrent());
		} else {
			if (current) toast.error(response.mes);
		}
	};

	useEffect(() => {
		if (pid) {
			fetchProductData();
			fetchProductsData();
		}
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pid]);
	useEffect(() => {
		if (pid) fetchProductData();
	}, [update]);
	const rerender = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	useEffect(() => {
		if (variant) {
			setCurrentProduct({
				title: product?.varriants?.find((el) => el.sku === variant)?.title,
				price: product?.varriants?.find((el) => el.sku === variant)?.price,
				color: product?.varriants?.find((el) => el.sku === variant)?.color,
				images: product?.varriants?.find((el) => el.sku === variant)?.images,
				thumb: product?.varriants?.find((el) => el.sku === variant)?.thumb,
			});
		} else {
			setCurrentProduct({
				title: product?.title,
				price: product?.price,
				color: product?.color,
				images: product?.images || [],
				thumb: product?.thumb,
			});
		}
	}, [variant]);
	const handleClickImage = (e, el) => {
		e.stopPropagation();
		setCurrentImage(el);
	};
	console.log(current.cart);
	return (
		<div className="w-full">
			{!isQuickView && (
				<div className="h-[81px] bg-gray-100 flex justify-center items-center">
					<div className="w-main">
						<h3 className="uppercase font-semibold mb-1"> {currentProduct.title || product?.title}</h3>
						<Breakcrumb title={currentProduct.title || product?.title} category={category} />
					</div>
				</div>
			)}
			<div
				className={clsx(
					"w-main m-auto mt-5 flex bg-white",
					isQuickView && "max-w-[70%] max-h-[80vh] overflow-y-auto gap-[150px] p-8"
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={clsx("w-2/5 flex flex-col gap-4", isQuickView && "w-1/2 max-w-[50%]")}>
					<ReactImageMagnify
						className={clsx("h-[458px] w-[485px] border")}
						{...{
							smallImage: {
								alt: "",
								isFluidWidth: true,
								src:
									currentProduct?.thumb ||
									currentImage ||
									"https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
							},
							largeImage: {
								src:
									currentProduct?.thumb ||
									currentImage ||
									"https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
								width: 1200,
								height: 1200,
							},
						}}
					/>

					<div className="w-[485px] mt-[30px]">
						<Slider {...settings} className="img-slider">
							{typeof currentProduct.images?.length === "undefined" &&
								product?.images.map((el) => (
									<div className="px-2" key={el}>
										<img
											onClick={(e) => handleClickImage(e, el)}
											src={el}
											alt="sub-product"
											className="h-[143px] w-[143px] border object-cover cursor-pointer"
										/>
									</div>
								))}
							{currentProduct.images?.length > 0 &&
								currentProduct.images.map((el) => (
									<div className="px-2" key={el}>
										<img
											onClick={(e) => handleClickImage(e, el)}
											src={el}
											alt="sub-product"
											className="h-[143px] w-[143px] border object-cover cursor-pointer"
										/>
									</div>
								))}
						</Slider>
					</div>
				</div>
				<div className={clsx("w-2/5 flex flex-col gap-4 pl-[45px] pr-6", isQuickView && "w-1/2")}>
					<div className="flex items-center justify-between">
						<h3 className="text-[30px] font-semibold">{`${formatMoney(
							formatPrice(currentProduct.price || product?.price)
						)} VND`}</h3>
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
						{product?.description?.length > 1 &&
							product?.description?.map((el, index) => (
								<li key={index} className="leading-[28px]">
									{el}
								</li>
							))}
						{product?.description?.length === 1 && (
							<div
								dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}
								className="text-sm line-clamp-[10] mb-8"
							></div>
						)}
					</ul>
					<div className="flex flex-col gap-8">
						<div className="my-4 flex gap-4">
							<span className="font-semibold">Màu sắc:</span>
							<div className="flex flex-wrap items-center gap-4">
								<div
									className={clsx(
										"flex items-center gap-2 p-2 border cursor-pointer",
										!variant && "border-red-500 text-red-500"
									)}
									onClick={() => {
										setVariant(null);
									}}
								>
									<img src={product?.thumb} alt="thumb" className="w-8 h-8 object-cover" />
									<span className="flex flex-col">
										<span>{product?.color}</span>
										<span className="text-sm">{`${formatMoney(formatPrice(product?.price))} VND`}</span>
									</span>
								</div>
								{product?.varriants?.map((el) => (
									<div
										className={clsx(
											"flex items-center gap-2 p-2 border cursor-pointer",
											variant === el.sku && "border-red-500 text-red-500"
										)}
										key={el.sku}
										onClick={() => {
											setVariant(el.sku);
										}}
									>
										<img src={el?.thumb} alt="thumb" className="w-8 h-8 object-cover" />
										<span className="flex flex-col">
											<span>{el?.color}</span>
											<span className="text-sm">{`${formatMoney(formatPrice(el?.price))} VND`}</span>
										</span>
									</div>
								))}
							</div>
						</div>
						<div className="flex items-center gap-2 font-bold">
							<h3 className="text-[16px] font-semibold cursor-pointer pr-3">Số lượng</h3>
							<SelectQuantity
								quantity={quantity}
								handleQuantity={handleQuantity}
								handleChangeQuantity={handleChangeQuantity}
							/>
						</div>
						<Button
							fullwidth
							handleOnClick={() => {
								handleAddToCart();
							}}
						>
							THÊM VÀO GIỎ HÀNG
						</Button>
						{!isQuickView && (
							<Link to={`/${category}`}>
								<div className="flex items-center gap-2 hover:text-main cursor-pointer">
									<span>
										<IoIosArrowRoundBack size={24} />
									</span>
									<span className="uppercase"> Quay lại {category}</span>
								</div>
							</Link>
						)}
					</div>
				</div>
				{!isQuickView && (
					<div className="w-1/5">
						{productExtraInfo.map((el) => (
							<ProductExtraInfoItem key={el.id} title={el.title} sub={el.sub} icon={el.icon} />
						))}
					</div>
				)}
			</div>
			{!isQuickView && (
				<>
					<div className="w-main m-auto mt-8">
						<ProductInfomation
							totalRatings={product?.totalRatings}
							ratings={product?.ratings}
							nameProduct={product?.title}
							pid={product?._id}
							rerender={rerender}
						/>
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
				</>
			)}
		</div>
	);
};

export default withBaseComponent(memo(DetailProduct));
