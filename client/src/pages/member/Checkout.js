/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from "react";
import paymentImg from "assets/woman-shopping-online.gif";
import { useSelector } from "react-redux";
import { formatMoney, formatPrice } from "utils/helpers";
import { InputForm, Paypal } from "components";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Congratulation from "components/Common/Congratulation";
import withBaseComponent from "hocs/withBaseComponent";
import { getCurrent } from "store/user/asyncActions";
import { apiGetBuyHistory, apiGetCoupons, apiGetShipments } from "apis";
import { toast } from "react-toastify";
const Checkout = ({ dispatch }) => {
	const { currentCart, current } = useSelector((state) => state.user);
	const {
		register,
		formState: { errors },
		watch,
	} = useForm();
	const [isSuccess, setIsSuccess] = useState(false);
	const [shipment, setShipment] = useState(null);
	const [coupons, setCoupons] = useState(null);
	const [orders, setOrders] = useState(null);
	const fetchCoupons = async () => {
		const response = await apiGetCoupons();
		if (response.success) setCoupons(response.coupons);
	};
	const fetchOrders = async () => {
		const response = await apiGetBuyHistory();
		if (response.success) setOrders(response.order);
	};
	const fetchShipment = async () => {
		const response = await apiGetShipments();
		if (response.success) setShipment(response.shipment);
	};
	const discountCode = watch("discountCode");
	const couponOrderArr = orders?.map((el) => el?.coupon);
	const isUsed = couponOrderArr?.includes(discountCode);
	const conpouArr = coupons?.map((el) => el);
	const discountPrice = conpouArr?.find((el) => el._id === discountCode)?.discount;
	const isDiscount = conpouArr?.some((el) => el._id === discountCode);
	const cost = Number(shipment?.map((el) => el.cost));
	const freeship = Number(shipment?.map((el) => el.freeship));
	const sumProductPrice = currentCart?.reduce((sum, el) => +el.price * el.quantity + sum, 0);
	const total = isDiscount && !isUsed ? sumProductPrice - discountPrice : sumProductPrice;
	const finalPrice = total > freeship ? total : total + cost;

	useEffect(() => {
		if (isSuccess) {
			dispatch(getCurrent());
		}
	}, [isSuccess]);
	useEffect(() => {
		fetchShipment();
		fetchCoupons();
		fetchOrders();
	}, []);
	useEffect(() => {
		if (isUsed && discountCode) {
			toast.warning("Mã giảm giá đã được sử dụng!");
		}
		if (!isUsed && isDiscount) {
			toast.success("Áp dụng mã giảm giá thành công");
		}
	}, [isUsed, isDiscount]);
	return (
		<div className="grid grid-cols-10 gap-6 p-8 h-full max-h-screen overflow-y-auto">
			<div className="col-span-4 w-full flex items-center justify-center">
				<img src={paymentImg} alt="paymentImg" className="h-[70%] object-cover" />
			</div>
			{isSuccess && <Congratulation />}
			<div className="col-span-6 w-full flex flex-col gap-6 justify-center">
				<h2 className="font-bold text-2xl mb-6">Thanh toán</h2>
				<div className="flex w-full gap-6">
					<div className="flex-1">
						<table className="table-auto w-full mb-4">
							<thead>
								<tr className="border bg-gray-300 ">
									<th className="text-left p-2">Sản phẩm</th>
									<th className="text-center p-2">Số lượng</th>
									<th className="text-right p-2">Giá</th>
								</tr>
							</thead>
							<tbody>
								{currentCart?.map((el) => (
									<tr key={el._id} className="border">
										<td className="text-left p-2 truncate max-w-[200px]">{el.title}</td>
										<td className="text-center p-2">{el.quantity}</td>
										<td className="text-right p-2">{`${formatMoney(formatPrice(el.price))} VND`}</td>
									</tr>
								))}
							</tbody>
						</table>

						<InputForm
							label="Mã giảm giá của bạn"
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
							<div className="flex items-center justify-between gap-4 my-4">
								<strong>Mã giảm giá:</strong>
								<h2>{`${formatMoney(formatPrice(!isUsed ? discountPrice : 0))} VND`}</h2>
							</div>
						)}
						<div className="flex items-center justify-between gap-4 my-4">
							<strong>Phí vận chuyển:</strong>
							<h2>{`${formatMoney(formatPrice(total > freeship ? 0 : cost))} VND`}</h2>
						</div>
						<div className="flex items-center justify-between gap-4">
							<strong>Tổng cộng:</strong>
							<h2>{`${formatMoney(formatPrice(finalPrice < 0 ? 0 : finalPrice))} VND`}</h2>
						</div>
					</div>
					<div className="flex-1 flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<strong>Địa chỉ nhận hàng:</strong>
							<h2>{current?.address}</h2>
						</div>
						<div>
							<Paypal
								setIsSuccess={setIsSuccess}
								payload={{
									products: currentCart,
									total: Math.round(finalPrice / 24475),
									address: current?.address,
									orderBy: current,
									coupon: discountCode,
								}}
								amount={Math.round(finalPrice / 24475)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(Checkout));
