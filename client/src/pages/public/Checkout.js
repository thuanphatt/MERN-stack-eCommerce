/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

import { getCurrent } from "store/user/asyncActions";
import { typePayment } from "utils/contants";
import { formatMoney, formatPrice } from "utils/helpers";
import { apiCreateOrder, apiGetBuyHistory, apiGetCoupons, apiGetShipments, apiUpdateCurrent } from "apis";
import { Breakcrumb, Button, InputForm, Loading, OrderItem, Select } from "components";
import Congratulation from "components/Common/Congratulation";
import withBaseComponent from "hocs/withBaseComponent";
import path from "utils/path";
import { apiCreateVnpay, apiReturnVnpay } from "apis/vnpay";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";

const Checkout = ({ dispatch, navigate, location }) => {
	const {
		register,
		formState: { errors, isDirty },
		watch,
		reset,
	} = useForm();
	const { currentCart, current } = useSelector((state) => state.user);
	const [orders, setOrders] = useState(null);
	const [shipment, setShipment] = useState(null);
	const [coupons, setCoupons] = useState(null);
	const address = watch("address");
	const [isSuccess, setIsSuccess] = useState(false);
	const fetchShipment = async () => {
		const response = await apiGetShipments();
		if (response.success) setShipment(response.shipment);
	};
	const fetchCoupons = async () => {
		const response = await apiGetCoupons();
		if (response.success) setCoupons(response.coupons);
	};
	const fetchOrders = async () => {
		const response = await apiGetBuyHistory();
		if (response.success) setOrders(response.order);
	};

	const discountCode = watch("discountCode");
	const couponOrderArr = orders?.filter((order) => order.status === "Thành công").map((el) => el?.coupon);
	const isUsed = couponOrderArr?.includes(discountCode);
	const conpouArr = coupons?.map((el) => el);
	const discountPrice = conpouArr?.find((el) => el._id === discountCode)?.discount;
	const isDiscount = conpouArr?.some((el) => el._id === discountCode);
	const cost = Number(shipment?.map((el) => el.cost));
	const freeship = Number(shipment?.map((el) => el.freeship));
	const sumProductPrice = currentCart?.reduce((sum, el) => +el.price * el.quantity + sum, 0);
	const total = isDiscount && !isUsed ? sumProductPrice - discountPrice : sumProductPrice;
	const finalPrice = total > freeship ? total : total + cost;
	const handleSaveOrder = async () => {
		if (current?.address.length === 0) {
			Swal.fire({
				title: "Opps",
				text: "Hãy cập nhật địa chỉ trước khi thanh toán",
				cancelButtonText: "Hủy",
				confirmButtonText: "Cập nhật",
				showCancelButton: true,
				icon: "info",
			}).then(async (result) => {
				if (result.isConfirmed) {
					navigate({
						pathname: `/${path.MEMBER}/${path.PERSONAL}`,
						search: createSearchParams({ redirect: location.pathname }).toString(),
					});
				}
			});
		} else {
			dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
			const response = await apiCreateOrder({
				products: currentCart,
				total: finalPrice,
				address,
				orderBy: current,
				status: "Đang xử lý",
				paymentMethod: "COD",
				coupon: discountCode,
			});
			dispatch(showModal({ isShowModal: false, modalChildren: null }));
			if (response.success) {
				setIsSuccess(true);
				setTimeout(() => {
					Swal.fire("Chúc mừng", "Đã đặt hàng thành công", "success").then(() => {
						navigate(`/${path.HOME}`);
					});
				}, 500);
			}
		}
	};
	const handleSubmit = () => {
		if (current?.isBlocked) {
			toast.warning("Tài khoản đã bị khóa tính năng thanh toán");
			return;
		}
		if (current?.address.length === 0) {
			Swal.fire({
				title: "Opps",
				text: "Hãy cập nhật địa chỉ trước khi thanh toán",
				cancelButtonText: "Hủy",
				confirmButtonText: "Cập nhật",
				showCancelButton: true,
				icon: "info",
			}).then(async (result) => {
				if (result.isConfirmed) {
					navigate({
						pathname: `/${path.MEMBER}/${path.PERSONAL}`,
						search: createSearchParams({ redirect: location.pathname }).toString(),
					});
				}
			});
		} else {
			navigate(`/${path.CHECKOUT_PAYPAL}`);
		}
	};
	const handleSubmitVNPay = async () => {
		if (current?.isBlocked) {
			toast.warning("Tài khoản đã bị khóa tính năng thanh toán");
			return;
		}
		if (current?.address.length === 0) {
			Swal.fire({
				title: "Opps",
				text: "Hãy cập nhật địa chỉ trước khi thanh toán",
				cancelButtonText: "Hủy",
				confirmButtonText: "Cập nhật",
				showCancelButton: true,
				icon: "info",
			}).then(async (result) => {
				if (result.isConfirmed) {
					navigate({
						pathname: `/${path.MEMBER}/${path.PERSONAL}`,
						search: createSearchParams({ redirect: location.pathname }).toString(),
					});
				}
			});
		} else {
			dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
			const response = await apiCreateVnpay({ amount: finalPrice });
			dispatch(showModal({ isShowModal: false, modalChildren: null }));
			if (response.success) {
				window.location.href = response.paymentUrl;
			}
		}
	};

	const updateAddress = async () => {
		const response = await apiUpdateCurrent({ address });
		if (response.success) {
			dispatch(getCurrent());
			toast.success(response.mes);
		} else toast.error(response.mes);
	};
	useEffect(() => {
		if (isSuccess) {
			dispatch(getCurrent());
			document.body.scrollIntoView({
				behavior: "smooth",
				inline: "center",
				block: "center",
			});
		}
	}, [isSuccess]);

	const fetchReturnVNpay = async () => {
		const queryString = window.location.search;
		const queryParams = new URLSearchParams(queryString).toString();
		const response = await apiReturnVnpay(queryParams);
		const data = {
			products: currentCart,
			total: finalPrice,
			address: current?.address,
			orderBy: current,
			status: "Đang xử lý",
			paymentMethod: "VNPay",
			coupon: discountCode,
		};
		if (response.Message === "Success" && typeof data.total === "number") {
			dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
			const response = await apiCreateOrder(data);
			dispatch(showModal({ isShowModal: false, modalChildren: null }));
			if (response.success) {
				setIsSuccess(true);
				setTimeout(() => {
					Swal.fire("Chúc mừng", "Đã đặt hàng thành công", "success").then(() => {
						navigate(`/${path.HOME}`);
					});
				}, 500);
			}
		}
	};
	useEffect(() => {
		fetchShipment();
		fetchCoupons();
		fetchOrders();
	}, []);
	useEffect(() => {
		if (currentCart.length > 0 && finalPrice) {
			fetchReturnVNpay();
		}
	}, [finalPrice]);
	useEffect(() => {
		if (isUsed && discountCode) {
			toast.warning("Mã giảm giá đã được sử dụng!");
		}
		if (!isUsed && isDiscount) {
			toast.success("Áp dụng mã giảm giá thành công");
		}
	}, [isUsed, isDiscount]);
	useEffect(() => {
		reset({
			address: current?.address,
		});
	}, []);
	return (
		<div className="flex flex-col justify-start w-full px-4">
			<div className="h-[81px] bg-gray-100 flex md:justify-center md:items-center md:px-0 px-4 md:flex-row flex-col md:pt-0 pt-4">
				<div className="md:w-main w-full">
					<h3 className="uppercase font-semibold mb-1 truncate md:max-w-full max-w-[400px]">Thanh toán</h3>
					<Breakcrumb category="Thanh toán" />
				</div>
			</div>
			{isSuccess && <Congratulation />}
			{currentCart.length > 0 ? (
				<div className="flex flex-col border my-8 md:w-main w-full mx-auto pb-8">
					<div className="grid md:grid-cols-10 grid-cols-4 md:w-main w-full mx-auto font-bold bg-[#86A789] py-2 text-white">
						<span className="w-full md:col-span-6 col-span-2 pl-4">Sản phẩm</span>
						<span className="w-full text-center col-span-1">Số lượng</span>
						<span className="w-full text-center md:col-span-3 col-span-1">Giá</span>
					</div>
					{currentCart?.map((el) => (
						<OrderItem
							el={el?.product}
							key={el?._id}
							_quantity={el.quantity}
							color={el.color}
							title={el.title}
							thumb={el.thumbnail}
							price={el.price}
							pid={el.product._id}
						/>
					))}
					<div className="md:w-main w-full mx-auto flex flex-col items-end gap-3 my-4 p-4">
						<div className="flex justify-start flex-col w-full">
							<div className="flex gap-2 flex-col justify-end">
								<div className="flex flex-col gap-2 mt-4 md:w-[30%] w-full">
									<span className="text-lg font-medium">Thông tin nhận hàng</span>
									<span className="text-md">{`Họ và tên : ${current.firstName} ${current.lastName}`}</span>
									<span className="text-md">{`Số điện thoại : ${current.mobile}`}</span>
									{current?.address.length > 0 && (
										<InputForm
											label="Địa chỉ nhận hàng của bạn"
											register={register}
											errors={errors}
											id="address"
											validate={{
												required: "Không được bỏ trống trường này",
											}}
											fullWidth
											placeholder="Nhập tên địa chỉ nhận hàng của bạn"
											style={clsx("text-md")}
										/>
									)}
								</div>
								{isDirty ? (
									<Button type="button" handleOnClick={updateAddress}>
										Cập nhật
									</Button>
								) : null}
							</div>
							<Select
								noDefaultValue
								label="Hình thức thanh toán"
								register={register}
								errors={errors}
								id="typePayment"
								style={clsx("md:w-[20%] w-full my-4")}
								validate={{ required: "Không được để trống trường này" }}
								options={typePayment?.map((el) => ({
									code: el.code,
									value: el.value,
								}))}
							/>
						</div>
						<InputForm
							label="Mã giảm giá"
							register={register}
							errors={errors}
							id="discountCode"
							validate={{
								required: "Không được bỏ trống trường này",
							}}
							fullWidth
							placeholder="Nhập mã giảm giá của bạn"
							style={clsx("text-sm")}
						/>
						{isDiscount && !isUsed && (
							<span>{`Mã giảm giá : ${formatMoney(formatPrice(!isUsed ? discountPrice : 0))} VND`}</span>
						)}
						<span>{`Phí vận chuyển : ${formatMoney(formatPrice(total > freeship ? 0 : cost))} VND`}</span>
						<div className="flex items-center justify-between gap-4">
							<span>Tổng cộng:</span>
							<h2 className="font-bold">{`${formatMoney(formatPrice(finalPrice < 0 ? 0 : finalPrice))} VND`}</h2>
						</div>
						{watch("typePayment") === "1" && (
							<span
								onClick={() => {
									handleSaveOrder();
									setIsSuccess(false);
								}}
								className="bg-main px-4 py-2 text-white rounded-md cursor-pointer"
							>
								Thanh toán
							</span>
						)}
						{watch("typePayment") === "2" && <Button handleOnClick={handleSubmit}>Thanh toán</Button>}
						{watch("typePayment") === "3" && <Button handleOnClick={handleSubmitVNPay}>Thanh toán</Button>}
					</div>
				</div>
			) : (
				navigate(`/products/:category/`)
			)}
		</div>
	);
};

export default withBaseComponent(memo(Checkout));
