import React, { memo } from "react";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
	return (
		<div className="flex items-center">
			<h3 className="text-[16px] font-semibold cursor-pointer pr-3">
				Số lượng
			</h3>
			<div>
				<span
					className="p-2 border-r border-black cursor-pointer"
					onClick={() => {
						handleChangeQuantity("minus");
					}}
				>
					-
				</span>
				<input
					type="text"
					className="py-2 outline-none w-[50px] text-center"
					value={quantity}
					onChange={(e) => handleQuantity(e.target.value)}
				/>
				<span
					className="p-2 border-l border-black cursor-pointer"
					onClick={() => {
						handleChangeQuantity("plus");
					}}
				>
					+
				</span>
			</div>
		</div>
	);
};

export default memo(SelectQuantity);
