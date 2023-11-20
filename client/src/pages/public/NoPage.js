import React, { memo } from "react";

const NoPage = () => {
	return (
		<div className="flex items-center justify-center h-screen gap-4">
			<img
				src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x1462-azn7c8sp.png"
				alt="not found"
				className="w-[30%] h-full object-contain"
			/>
			<h2 className="font-medium text-2xl">Không tìm thấy trang</h2>
		</div>
	);
};

export default memo(NoPage);
