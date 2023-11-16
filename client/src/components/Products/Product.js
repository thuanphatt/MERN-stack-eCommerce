import React, { memo, useEffect, useState } from "react";

import { formatMoney, renderStarFromNumber } from "utils/helpers";
import newLabel from "assets/new.png";
import trendingLabel from "assets/trending.png";
import { SelectOption } from "components";
import icons from "utils/icons";
import withBaseComponent from "hocs/withBaseComponent";
import { showModal } from "store/app/appSlice";
import { DetailProduct } from "pages/public";
import { apiAddToCart, apiAddToViewedProducts, apiAddToWishList, apiGetSales } from "apis";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import path from "utils/path";
import clsx from "clsx";
import { createSearchParams } from "react-router-dom";
const { AiFillEye, AiFillHeart, BsCartPlusFill, BsFillCartCheckFill } = icons;
const Product = ({ productData, isNew, normal, navigate, dispatch, location }) => {
	const [isShowOptions, setIsShowOptions] = useState(false);
	const { current } = useSelector((state) => state.user);
	const [sales, setSales] = useState(null);
	const fetchProductSales = async () => {
		const response = await apiGetSales();
		if (response.success) {
			setSales(response.sales[0]);
		}
	};
	const isProductInCategories = productData._id === sales?.products[0]._id;

	const handleClickOptions = async (e, name) => {
		e.stopPropagation();
		if (name === "CART") {
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
				pid: productData?._id,
				color: productData?.color,
				quantity: 1,
				price: productData?.price,
				thumbnail: productData?.thumb,
				title: productData?.title,
			});
			if (response.success) {
				toast.success(response.mes);
				dispatch(getCurrent());
			} else {
				if (current) toast.error(response.mes);
			}
		}
		if (name === "QUICK_VIEW") {
			dispatch(
				showModal({
					isShowModal: true,
					modalChildren: (
						<DetailProduct isQuickView data={{ pid: productData?._id, category: productData?.category }} />
					),
				})
			);
		}
		if (name === "WISHLIST") {
			const response = await apiAddToWishList({
				pid: productData?._id,
				color: productData?.color,
				quantity: 1,
				price: productData?.price,
				thumbnail: productData?.thumb,
				title: productData?.title,
			});
			if (response.success) {
				toast.success(response.mes);
				dispatch(getCurrent());
			} else {
				if (current) toast.error(response.mes);
			}
		}
	};
	const handleClickProduct = async (e) => {
		e.stopPropagation();
		const response = await apiAddToViewedProducts({
			pid: productData?._id,
			color: productData?.color,
			quantity: 1,
			price: productData?.price,
			thumbnail: productData?.thumb,
			title: productData?.title,
			sold: productData?.sold,
			totalRatings: productData?.totalRatings,
			category: productData?.category,
		});
		if (response.success) {
			dispatch(getCurrent());
		} else {
			if (current) {
				return;
			}
		}
	};
	useEffect(() => {
		fetchProductSales();
	}, []);
	return (
		<div className="w-full text-base md:px-1">
			<div
				onClick={(e) => {
					navigate(`/${productData?.category[0]}/${productData?._id}/${productData?.title}`);
					handleClickProduct(e);
				}}
				className="w-full border p-[15px] flex flex-col items-center cursor-pointer"
				onMouseEnter={(e) => {
					e.stopPropagation();
					setIsShowOptions(true);
				}}
				onMouseLeave={(e) => {
					e.stopPropagation();
					setIsShowOptions(false);
				}}
			>
				<div className="relative w-full flex items-center justify-center">
					{isShowOptions && (
						<div className={clsx("absolute bottom-[-10px]  w-full flex justify-center gap-4 animate-slide-top")}>
							{current?.wishList?.some((el) => el?.product === productData?._id.toString()) ? (
								<span title="Đã thêm vào danh sách yêu thích">
									<SelectOption icon={<AiFillHeart color="red" />} />
								</span>
							) : (
								<span
									title="Thêm vào danh sách yêu thích"
									onClick={(e) => {
										handleClickOptions(e, "WISHLIST");
									}}
								>
									<SelectOption icon={<AiFillHeart />} />
								</span>
							)}

							{current?.cart?.some((el) => el?.product._id === productData?._id.toString()) ? (
								<span title="Đã được thêm vào giỏ hàng">
									<SelectOption icon={<BsFillCartCheckFill color="green" />} />
								</span>
							) : (
								<span
									title="Thêm vào giỏ hàng"
									onClick={(e) => {
										handleClickOptions(e, "CART");
									}}
								>
									<SelectOption icon={<BsCartPlusFill />} />
								</span>
							)}
							<span
								title="Xem nhanh"
								onClick={(e) => {
									handleClickOptions(e, "QUICK_VIEW");
								}}
							>
								<SelectOption icon={<AiFillEye />} />
							</span>
						</div>
					)}
					<img
						src={
							productData?.thumb ||
							productData?.thumbnail ||
							"https://stores.blackberrys.com/VendorpageTheme/Enterprise/EThemeForBlackberrys/images/product-not-found.jpg"
						}
						alt={productData?.title}
						className="w-[274px] h-[274px] object-contain"
					></img>
					{!normal && (
						<img
							src={isNew ? newLabel : trendingLabel}
							alt="label"
							className="absolute right-[-16px] top-[-4px] w-[70px] object-cover"
						></img>
					)}
				</div>
				<div className="flex flex-col gap-1 mt-[15px] items-start w-full relative">
					<div className="flex items-center justify-between w-full">
						<span className="flex h-4">
							{renderStarFromNumber(productData?.totalRatings)?.map((el, index) => (
								<span key={index}>{el}</span>
							))}
						</span>
						<span className="text-gray-500">{`Đã bán: ${productData?.sold}`}</span>
					</div>
					<span className="line-clamp-1 capitalize font-medium">{productData?.title?.toLowerCase()}</span>
					<span>{`${formatMoney(
						isProductInCategories
							? productData?.price - (productData?.price * Number(sales?.discount)) / 100
							: productData?.price
					)} VND`}</span>
					{isProductInCategories && (
						<span className="absolute bottom-0 right-0 font-semibold text-red-500">{`GIẢM ${sales?.discount}%`}</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(Product));
