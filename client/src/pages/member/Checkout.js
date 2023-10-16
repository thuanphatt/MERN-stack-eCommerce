import React, { memo } from "react";
import paymentImg from "assets/woman-shopping-online.gif";
import { useSelector } from "react-redux";
import { formatMoney, formatPrice } from "utils/helpers";
import { InputForm, Paypal } from "components";
import { useForm } from "react-hook-form";
import clsx from "clsx";
const Checkout = () => {
	const { currentCart } = useSelector((state) => state.user);
	const {
		register,
		formState: { errors },
		// handleSubmit,
		// watch,
		// reset,
	} = useForm();
	return (
		<div className="grid grid-cols-10 gap-6 p-8 h-full max-h-screen overflow-y-auto">
			<div className="col-span-4 w-full flex items-center justify-center">
				<img src={paymentImg} alt="paymentImg" className="h-[70%] object-cover" />
			</div>
			<div className="col-span-6 w-full flex flex-col gap-6 justify-center">
				<h2 className="font-bold text-2xl mb-6">Thanh toán</h2>
				<div className="flex w-full gap-6">
					<div className="flex-1">
						<table className="table-auto w-full">
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
						<div className="flex items-center justify-between gap-4 mt-4">
							<span className="font-medium">Tổng cộng:</span>
							<h2 className="font-bold">{`${formatMoney(
								formatPrice(currentCart?.reduce((sum, el) => +el.price * el.quantity + sum, 0))
							)} VND`}</h2>
						</div>
					</div>
					<div className="flex-1 flex flex-col gap-4">
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

						<div>
							<Paypal amount={Math.round(currentCart?.reduce((sum, el) => +el.price * el.quantity + sum, 0) / 24475)} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Checkout);
