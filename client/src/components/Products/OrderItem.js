import React, { memo, useEffect, useState } from "react";

import SelectQuantity from "components/Common/SelectQuantity";

import { formatMoney, formatPrice } from "utils/helpers";
import { updateCart } from "store/user/userSlice";
import { useDispatch } from "react-redux";

const OrderItem = ({ color, _quantity = 1, price, thumb, title, pid }) => {
	const [quantity, setQuantity] = useState(_quantity);
	const handleQuantity = (number) => {
		if (number > 1) setQuantity(number);
	};
	const dispatch = useDispatch();
	const handleChangeQuantity = (flag) => {
		if (flag === "minus" && quantity === 1) return;
		if (flag === "minus") {
			setQuantity((prev) => +prev - 1);
		}
		if (flag === "plus") {
			setQuantity((prev) => +prev + 1);
		}
	};
	useEffect(() => {
		dispatch(updateCart({ pid, quantity: quantity, color }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quantity]);
	// set quantity
	return (
		<div className="grid md:grid-cols-10 grid-cols-4 md:w-main w-full mx-auto border-b md:pl-10 py-4" key={pid}>
			<span className="w-full text-center md:col-span-6 col-span-2 flex items-center md:flex-row flex-col">
				<img src={thumb} alt="Ảnh sản phẩm" className="md:w-[150px] md:h-[150px] w-[50px] h-[50px] object-contain" />
				<div className="flex flex-col gap-2 px-4 py-2">
					<span className="font-medium text-sm">{title}</span>
					<span className="text-sm">{color}</span>
				</div>
			</span>
			<span className="w-full text-center col-span-1">
				<div className="flex items-center h-full">
					<SelectQuantity
						quantity={quantity}
						handleQuantity={handleQuantity}
						handleChangeQuantity={handleChangeQuantity}
					/>
				</div>
			</span>
			<span className="w-full md:text-center md:col-span-3 col-span-1">
				<div className="flex items-center h-full">
					<h2 className="text-center md:w-main w-full font-bold">{`${formatMoney(
						formatPrice(price * quantity)
					)} VND`}</h2>
				</div>
			</span>
		</div>
	);
};

export default memo(OrderItem);
