/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { getCurrent } from "store/user/asyncActions";
import { typePayment } from "utils/contants";
import { formatMoney, formatPrice } from "utils/helpers";
import { apiCreateOrder, apiGetShipments, apiUpdateCurrent } from "apis";
import { InputForm, OrderItem, Select } from "components";
import Congratulation from "components/Common/Congratulation";
import withBaseComponent from "hocs/withBaseComponent";
import path from "utils/path";

const MyCart = () => {
	const {
		register,
		formState: { errors },
		watch,
		reset,
	} = useForm();
	const { currentCart, current } = useSelector((state) => state.user);
	const [activePayment, setActivePayment] = useState(false);
	const [shipment, setShipment] = useState(null);
	const address = watch("address");
	const [isSuccess, setIsSuccess] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		reset({
			address: current?.address,
		});
	}, [current]);
	const fetchShipment = async () => {
		const response = await apiGetShipments();
		if (response.success) setShipment(response.shipment);
	};
	const cost = Number(shipment?.map((el) => el.cost));
	const freeship = Number(shipment?.map((el) => el.freeship));
	const total = currentCart?.reduce((sum, el) => +el.price * el.quantity + sum, 0);
	const finalPrice = total > freeship ? total : total + cost;
	const handleSaveOrder = async () => {
		const response = await apiCreateOrder({
			products: currentCart,
			total: Math.round(finalPrice / 24475),
			address,
			orderBy: current,
			status: "Đang xử lý",
			paymentMethod: "COD",
		});
		if (response.success) {
			setIsSuccess(true);
			setTimeout(() => {
				Swal.fire("Chúc mừng", "Đã đặt hàng thành công", "success").then(() => {
					navigate(`/${path.HOME}`);
				});
			}, 1500);
		}
	};
	useEffect(() => {
		reset({
			address: current?.address,
		});
	}, [current]);
	const dispatch = useDispatch();
	const updateAddress = async () => {
		const response = await apiUpdateCurrent({ address });
		console.log(response);
	};
	useEffect(() => {
		if (isSuccess) {
			updateAddress();
			dispatch(getCurrent());
		}
	}, [isSuccess]);
	useEffect(() => {
		if (watch("typePayment") === "1") {
			setActivePayment(true);
		} else {
			setActivePayment(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch("typePayment")]);
	useEffect(() => {
		fetchShipment();
	}, []);

	return (
		<div className="flex flex-col justify-start w-full">
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<header className="text-3xl font-semibold py-4 border-b border-main">Giỏ hàng của tôi</header>
				</div>
			</div>
			{isSuccess && <Congratulation />}
			{currentCart.length > 0 ? (
				<div className="flex flex-col border mt-8 w-main mx-auto py-8">
					<div className="grid grid-cols-10 w-main mx-auto font-bold bg-gray-200 py-2">
						<span className="w-full col-span-6 pl-4">Sản phẩm</span>
						<span className="w-full text-center col-span-1">Số lượng</span>
						<span className="w-full text-center col-span-3">Giá</span>
					</div>
					{currentCart?.map((el) => (
						<OrderItem
							el={el?.product}
							key={el?._id}
							quantity={el.quantity}
							color={el.color}
							title={el.title}
							thumb={el.thumbnail}
							price={el.price}
							pid={el.product._id}
						/>
					))}
					<div className="w-main mx-auto flex flex-col items-end gap-3 my-4 p-4">
						<div className="flex justify-start flex-col w-full">
							<Select
								label="Hình thức thanh toán"
								register={register}
								errors={errors}
								id="typePayment"
								style={clsx("w-[20%]")}
								validate={{ required: "Không được để trống trường này" }}
								options={typePayment?.map((el) => ({
									code: el.code,
									value: el.value,
								}))}
							/>
							{activePayment && watch("typePayment") === "1" && (
								<div className="flex flex-col gap-1 mt-4 w-[30%]">
									<span className="text-sm font-medium">{`Họ và tên : ${current.firstName} ${current.lastName}`}</span>
									<span className="text-sm font-medium">{`Số điện thoại : ${current.mobile}`}</span>
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
										style={clsx("text-sm")}
									/>
								</div>
							)}
						</div>
						<span>{`Phí vận chuyển : ${formatMoney(formatPrice(total > freeship ? 0 : cost))} VND`}</span>
						<div className="flex items-center justify-between gap-4">
							<span>Tổng cộng:</span>
							<h2 className="font-bold">{`${formatMoney(
								formatPrice(total > freeship ? total : total + cost)
							)} VND`}</h2>
						</div>
						<span className="text-sm italic text-gray-500">
							Vận chuyển, thuế và giảm giá được tính khi thanh toán. Cập nhật giỏ hàng
						</span>
						{watch("typePayment") !== "1" ? (
							<Link to={`/${path.CHECKOUT}`} className="bg-main px-4 py-2 text-white rounded-md">
								Thanh toán
							</Link>
						) : (
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
					</div>
				</div>
			) : (
				<div className="w-main mx-auto text-center h-screen p-4 flex flex-col items-center gap-4 justify-center">
					<h2 className="text-gray-500 font-bold text-2xl">Giỏ hàng đang trống!</h2>
					<img
						src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg"
						alt="Giỏ hàng rỗng"
						className="w-[300px] h-[300px] object-cover"
					/>
				</div>
			)}
		</div>
	);
};

export default withBaseComponent(memo(MyCart));
