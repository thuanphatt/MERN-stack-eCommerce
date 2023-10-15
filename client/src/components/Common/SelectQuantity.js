import React, { memo } from "react";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
	return (
		<div className="flex items-center">
			<div className="flex items-center">
				<span
					className="p-2 border-r border-black cursor-pointer text-lg"
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
					className="p-2 border-l border-black cursor-pointer text-lg"
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
