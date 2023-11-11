import React, { memo } from "react";

const NavigationRepo = () => {
	return (
		<div className="w-[400px] h-screen bg-black text-white animate-slide-right" onClick={(e) => e.stopPropagation()}>
			<div
				className="w-[400px] h-screen bg-black text-white p-8 animate-slide-left"
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="font-bold border-b uppercase border-gray-500 text-xl flex justify-between h-full">
					<span>Giỏ hàng của tôi</span>
				</h2>
			</div>
		</div>
	);
};

export default memo(NavigationRepo);
