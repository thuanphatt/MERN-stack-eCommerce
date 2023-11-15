import moment from "moment";
import React from "react";

const BlogItem = ({ title, description, image, views, time, handleOnClick }) => {
	return (
		<div
			className="bg-white rounded-lg shadow-lg cursor-pointer col-span-1 w-full border row-span-1 h-full"
			onClick={() => {
				handleOnClick && handleOnClick();
			}}
		>
			<div className="mt-1 p-2">
				<img src={image} alt={title} className="object-contain w-full md:h-[150px] rounded-lg" />
				<h2 className="text-sm font-semibold m-0 p-0">{title}</h2>
				<p className="text-gray-600 mt-1 max-h-[100px] truncate whitespace-normal text-sm">{description}</p>
				<div className="flex items-center text-sm text-gray-500 mt-4 w-full justify-between">
					<div className="text-xs text-gray-400 mt-1">Đăng ngày: {moment(time).format("DD/MM/YYYY")}</div>
					<span className="text-sm">{views} lượt xem</span>
				</div>
			</div>
		</div>
	);
};

export default BlogItem;
