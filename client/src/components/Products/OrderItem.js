import SelectQuantity from "components/Common/SelectQuantity";
import React, { memo, useState } from "react";
import { formatMoney, formatPrice } from "utils/helpers";

const OrderItem = ({ el }) => {
	const [quantity, setQuantity] = useState(1);
	const handleQuantity = (number) => {
		if (number > 1) setQuantity(number);
	};
	const handleChangeQuantity = (flag) => {
		if (flag === "minus" && quantity === 1) return;
		if (flag === "minus") {
			setQuantity((prev) => +prev - 1);
		}
		if (flag === "plus") {
			setQuantity((prev) => +prev + 1);
		}
	};
	// set quantity
	return (
		<div className="grid grid-cols-10 w-main mx-auto border-b pl-10 py-4" key={el._id}>
			<span className="w-full text-center col-span-6 flex items-center">
				<img src={el.thumbnail} alt="Ảnh sản phẩm" className="w-[200px] h-[200px] object-cover" />
				<div className="flex flex-col gap-2">
					<span className="font-medium text-sm">{el.title}</span>
					<span className="text-sm">{el.color}</span>
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
			<span className="w-full text-center col-span-3">
				<div className="flex items-center h-full">
					<h2 className="text-center w-main">{`${formatMoney(formatPrice(el.price))} VND`}</h2>
				</div>
			</span>
		</div>
	);
};

export default memo(OrderItem);
