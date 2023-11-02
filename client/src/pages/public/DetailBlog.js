import moment from "moment";
import React, { memo, useCallback, useEffect, useState } from "react";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { apiDisLikeBlog, apiGetBlog, apiLikeBlog } from "apis";
import { Breakcrumb } from "components";
const DetailBlog = () => {
	const { current } = useSelector((state) => state.user);
	const [detailBlog, setDetailBlog] = useState(null);
	const [update, setUpdate] = useState(false);
	const location = useLocation();
	const urlParts = location.pathname.split("/");
	const idBlog = urlParts[urlParts.length - 2];
	const fetchBlog = async (bid) => {
		const response = await apiGetBlog(bid);
		if (response.success) setDetailBlog(response.blog);
	};
	useEffect(() => {
		fetchBlog(idBlog);
	}, [idBlog, update]);
	const rerender = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleClickLike = async (bid) => {
		const response = await apiLikeBlog(bid);
		if (response.success) {
			rerender();
		}
	};
	const handleClickDisLike = async (bid) => {
		const response = await apiDisLikeBlog(bid);
		if (response.success) {
			rerender();
		}
	};
	return (
		<div className="w-full">
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3 className="uppercase font-semibold mb-1"> {detailBlog?.title}</h3>
					<Breakcrumb title={detailBlog?.title} category="Tin tức" />
				</div>
			</div>
			<div className="w-main mx-auto bg-white shadow-lg rounded-xl overflow-hidden md:flex flex flex-col my-8">
				<div className="w-main">
					<img className="w-main object-contain h-[400px]" src={detailBlog?.image} alt={detailBlog?.title} />
				</div>
				<div className="p-8">
					<div className="uppercase text-indigo-500 text-xs font-semibold mb-2">{detailBlog?.numberViews} lượt xem</div>
					<h2 className="text-3xl font-bold leading-tight text-gray-800">{detailBlog?.title}</h2>
					<p className="mt-4 text-gray-600 text-lg">{detailBlog?.description}</p>
					<div className="mt-6 flex space-x-4 text-gray-600">
						<span className="flex items-center gap-2">
							<span className="ml-1">{detailBlog?.likes.length} </span>
							{detailBlog?.likes.some((el) => el._id === current?._id.toString()) ? (
								<span title="Đã thích bài viết" className="p-2 cursor-pointer">
									<AiFillLike color="green" />
								</span>
							) : (
								<span
									className="p-2 cursor-pointer"
									onClick={() => {
										handleClickLike(detailBlog?._id);
									}}
								>
									<AiOutlineLike />
								</span>
							)}
						</span>
						<span className="flex items-center gap-2">
							<span className="ml-1">{detailBlog?.dislikes.length}</span>
							{detailBlog?.dislikes.some((el) => el._id === current?._id.toString()) ? (
								<span title="Đã thích bài viết" className="p-2 cursor-pointer">
									<AiFillDislike color="green" />
								</span>
							) : (
								<span
									className="p-2 cursor-pointer"
									onClick={() => {
										handleClickDisLike(detailBlog?._id);
									}}
								>
									<AiOutlineDislike />
								</span>
							)}
						</span>
					</div>
					<div className="mt-6 text-gray-600 text-lg">{moment(detailBlog?.createdAt).format("DD/MM/YYYY")}</div>
				</div>
			</div>
		</div>
	);
};

export default memo(DetailBlog);
