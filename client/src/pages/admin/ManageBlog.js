import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { apiDeleteBlog, apiGetBlogs } from "apis";
import Swal from "sweetalert2";
import UpdateBlog from "./UpdateBlog";

const ManageBlog = () => {
	const [blogs, setBlogs] = useState(null);
	const [editBlog, setEditBlog] = useState(null);
	const [update, setUpdate] = useState(false);
	const fetchBlogs = async () => {
		const response = await apiGetBlogs();
		if (response.success) setBlogs(response.blogs);
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteBlog = (bid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa tin tức này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await apiDeleteBlog(bid);
				if (response.success) {
					render();
					toast.success(response.mes);
				} else {
					toast.error(response.mes);
				}
			} else {
			}
		});
	};
	useEffect(() => {
		fetchBlogs();
	}, [update]);
	return (
		<div className="w-full relative px-4 mx-auto h-full">
			{editBlog && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateBlog editBlog={editBlog} render={render} setEditBlog={setEditBlog} />
				</div>
			)}
			<header className="text-3xl font-bold py-4 border-b border-main">Quản lý tin tức</header>
			<table className="table-auto mb-6 text-center text-sm my-8 w-main mx-auto">
				<thead className="font-bold bg-main text-white">
					<tr className="">
						<th className="py-4 px-2 ">STT</th>
						<th className="py-4 px-2 ">Tựa đề</th>
						<th className="py-4 px-2 ">Ảnh</th>
						<th className="py-4 px-2 ">Danh mục</th>
						<th className="py-4 px-2 ">Mô tả</th>
						<th className="py-4 px-2 ">Lượt xem</th>
						<th className="py-4 px-2 ">Người đăng</th>
						<th className="py-4 px-2 ">Thời gian</th>
						<th className="py-4 px-2 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{blogs?.map((el, index) => (
						<tr key={index} className="border border-t-0 border-[#ccc]">
							<td className="py-4 px-2 ">{index + 1}</td>
							<td className="py-4 px-2  truncate max-w-[200px]">{el.title}</td>
							<td className="py-4 px-2">
								<img src={el.image} alt={el.title} className="w-16 h-16 object-contain" />
							</td>
							<td className="py-4 px-2">{el.category}</td>
							<td className="py-4 px-2 truncate max-w-[200px]">{el.description}</td>
							<td className="py-4 px-2">{el.numberViews}</td>
							<td className="py-4 px-2">{el.author}</td>
							<td className="py-4 px-2">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditBlog(el);
										}}
									>
										<AiFillEdit size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-red-500"
										onClick={() => {
											handleDeleteBlog(el._id);
										}}
									>
										<AiFillDelete size={18} />
									</span>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default memo(ManageBlog);
