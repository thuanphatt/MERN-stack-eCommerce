import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "utils/path";
const NoPage = () => {
	return (
		<div className="flex items-center justify-center h-screen gap-4">
			<img
				src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x1462-azn7c8sp.png"
				alt="not found"
				className="w-[30%] h-full object-contain"
			/>
			<div className="flex flex-col gap-2 items-center">
				<h2 className="font-medium text-2xl">Không tìm thấy trang</h2>
				<Link to={`/${path.HOME}`} className="flex items-center justify-center font-semibold text-main text-xl">
					Trở lại trang chủ
				</Link>
			</div>
		</div>
	);
};

export default memo(NoPage);
