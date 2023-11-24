/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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
import { apiAddToCart, apiGetSales } from "apis";
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
	const { current, currentViewedProducts } = useSelector((state) => state.user);

	const params = useParams();
	const titleRef = useRef();
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [relatedProducts, setRelatedProducts] = useState(null);
	const [products, setProducts] = useState(null);
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
	const [sales, setSales] = useState(null);
	const fetchProductSales = async () => {
		const response = await apiGetSales();
		if (response.success) {
			setSales(response.sales[0]);
		}
	};

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
		if (response.success) {
			setProduct(response.productData);
			setCurrentImage(response?.productData?.thumb);
		}
	};
	const fetchProductsCateData = async () => {
		const response = await apiGetProducts({ category });
		if (response.success) setRelatedProducts(response.products);
	};
	const fetchProductsData = async () => {
		const response = await apiGetProducts();
		if (response.success) setProducts(response.products);
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
		if (product?.quantity === 0) {
			toast.warn("Sản phẩm tạm thời đã hết hàng!");
			return;
		}
		if (quantity > product?.quantity) {
			toast.warn("Số lượng đã vượt quá giới hạn của kho hiện tại");
			return;
		}
		const response = await apiAddToCart({
			pid,
			color: currentProduct.color || product?.color,
			quantity,
			price: isProductInCategories
				? currentProduct?.price - (currentProduct?.price * Number(sales?.discount)) / 100 ||
				  product?.price - (product?.price * Number(sales?.discount)) / 100
				: currentProduct.price || product?.price,
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
			fetchProductsCateData();
		}
		titleRef.current?.scrollIntoView({ behavior: "smooth" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pid]);
	useEffect(() => {
		if (pid) fetchProductData();
	}, [update, pid]);
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
			setCurrentImage(product?.varriants?.find((el) => el.sku === variant)?.thumb);
		} else {
			setCurrentProduct({
				title: product?.title,
				price: product?.price,
				color: product?.color,
				images: product?.images || [],
				thumb: product?.thumb,
			});
			setCurrentImage(product?.thumb);
		}
	}, [variant, product]);
	const handleClickImage = (e, el) => {
		e.stopPropagation();
		setCurrentImage(el);
	};

	const isProductInCategories = product?._id === sales?.products[0]._id;

	useEffect(() => {
		fetchProductSales();
	}, []);
	return (
		<div className="w-full" ref={titleRef}>
			{!isQuickView && (
				<div className="h-[81px] bg-gray-100 flex md:justify-center md:items-center md:px-0 px-4 md:flex-row flex-col md:pt-0 pt-4">
					<div className="md:w-main w-full">
						<h3 className="uppercase font-semibold mb-1 truncate md:max-w-full max-w-[400px]">
							{currentProduct.title || product?.title}
						</h3>
						<Breakcrumb title={currentProduct.title || product?.title} category={category} />
					</div>
				</div>
			)}
			<div
				className={clsx(
					"md:w-main m-auto mt-5 flex bg-white md:flex-row flex-col w-full",
					isQuickView && "md:max-w-[70%] max-h-[80vh] overflow-y-auto gap-[150px] p-8"
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={clsx("md:w-2/5 flex flex-col gap-4 w-full", isQuickView && "md:w-1/2 max-w-[50%] w-full")}>
					<ReactImageMagnify
						className={clsx("h-[458px] md:w-[470px] border w-full")}
						{...{
							smallImage: {
								alt: "smallImage",
								isFluidWidth: true,
								width: 100,
								height: 100,
								sizes: "(height: 480px)",
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
								alt: "largeImage",
							},
						}}
					/>

					<div className="md:w-[488px] mt-[30px] w-full">
						<Slider {...settings} className="img-slider">
							{typeof currentProduct.images?.length === "undefined" &&
								product?.images.map((el) => (
									<div className="px-2" key={el}>
										<img
											onClick={(e) => handleClickImage(e, el)}
											src={el}
											alt="sub-product"
											className="h-[143px] w-[143px] border object-contain cursor-pointer"
										/>
									</div>
								))}
							{currentProduct.images?.length > 0 &&
								currentProduct.images.map((el) => (
									<div key={el}>
										<img
											onClick={(e) => handleClickImage(e, el)}
											src={el}
											alt="sub-product"
											className="h-[143px] w-[143px] border object-contain cursor-pointer"
										/>
									</div>
								))}
						</Slider>
					</div>
				</div>
				<div className={clsx("md:w-2/5 flex flex-col gap-4 pl-[45px] pr-6", isQuickView && "w-1/2")}>
					<div className="flex items-center justify-between">
						{isProductInCategories ? (
							<>
								<h3 className="text-[22px] font-semibold line-through ">{`${formatMoney(
									formatPrice(currentProduct.price || product?.price)
								)} VND`}</h3>
								{variant ? (
									<h3 className="text-[22px] font-semibold text-red-500">{`${formatMoney(
										formatPrice(
											product?.varriants?.map((el) =>
												isProductInCategories ? el?.price - (el?.price * Number(sales?.discount)) / 100 : el?.price
											)
										)
									)} VND`}</h3>
								) : (
									<h3 className="text-[22px] font-semibold text-red-500">{`${formatMoney(
										formatPrice(
											isProductInCategories
												? product?.price - (product?.price * Number(sales?.discount)) / 100
												: currentProduct.price || product?.price
										)
									)} VND`}</h3>
								)}
							</>
						) : (
							<h3 className="text-[30px] font-semibold">{`${formatMoney(
								formatPrice(
									isProductInCategories
										? product?.price - (product?.price * Number(sales?.discount)) / 100
										: currentProduct.price || product?.price
								)
							)} VND`}</h3>
						)}
						<div>
							<span className="text-gray-500">Kho:</span>
							<span className="text-[16px] font-medium px-1">{product?.quantity}</span>
						</div>
					</div>
					<div className="flex items-center">
						{renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
							<span key={index}>{el}</span>
						))}
						<div className="border-l-2 ml-2">
							<span className="text-[16px] font-medium px-1">{product?.ratings?.length}</span>
							<span className="text-gray-500">Đánh giá</span>
						</div>
						<div className="border-l-2 ml-2">
							<span className="text-[16px] font-medium px-1">{product?.sold}</span>
							<span className="text-gray-500">Đã bán</span>
						</div>
					</div>
					<ul className="list-square text-sm text-gray-500">
						{product?.description?.length > 1 &&
							product?.description?.map((el, index) => (
								<li key={index} className="leading-[28px]">
									{el}
								</li>
							))}
						{product?.description?.length === 1 && (
							<div className="text-sm mb-8 ">
								<div
									dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}
									className="h-[400px] overflow-y-auto"
								/>
							</div>
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
										<span className="text-sm">{`${formatMoney(
											formatPrice(
												isProductInCategories
													? product?.price - (product?.price * Number(sales?.discount)) / 100
													: product?.price
											)
										)} VND`}</span>
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
											<span className="text-sm">{`${formatMoney(
												formatPrice(
													isProductInCategories ? el?.price - (el?.price * Number(sales?.discount)) / 100 : el?.price
												)
											)} VND`}</span>
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
								<div className="flex items-center gap-2 hover:text-main cursor-pointer md:mb-0 mb-4">
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
					<div className="md:w-1/5 w-full md:px-0 px-4">
						{productExtraInfo.map((el) => (
							<ProductExtraInfoItem key={el.id} title={el.title} sub={el.sub} icon={el.icon} />
						))}
					</div>
				)}
			</div>
			{!isQuickView && (
				<>
					<div className="w-full mt-8 md:px-0 px-4">
						<ProductInfomation
							product={product}
							products={products}
							totalRatings={product?.totalRatings}
							ratings={product?.ratings}
							nameProduct={product?.title}
							pid={product?._id}
							rerender={rerender}
						/>
					</div>

					<div className="md:w-main mx-auto mb-6 w-full md:px-0 px-4">
						<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main mb-6">
							CÓ THỂ BẠN CŨNG THÍCH
						</h2>
						<div className="mb-6 md:mx-[-10px]">
							<CustomerSlider products={relatedProducts} normal={true} />
						</div>
					</div>
					<div className="md:w-main mx-auto mb-6 w-full md:px-0 px-4">
						<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main mb-6">
							NHỮNG SẢN PHẨM BẠN ĐÃ XEM
						</h2>
						<div className="mb-6 md:mx-[-10px]">
							<CustomerSlider products={currentViewedProducts} normal={true} />
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default withBaseComponent(memo(DetailProduct));
