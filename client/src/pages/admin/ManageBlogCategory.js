import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { apiGetBlogCategories, apiDeleteBlogCategory } from "apis";
import Swal from "sweetalert2";
import UpdateBlog from "./UpdateBlog";
import { showModal } from "store/app/appSlice";
import { Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";

const ManageBlogCategory = ({ dispatch }) => {
	const [blogCategories, setBlogCategories] = useState(null);
	const [editBlog, setEditBlog] = useState(null);
	const [update, setUpdate] = useState(false);
	const fetchBlogCategories = async () => {
		const response = await apiGetBlogCategories();
		if (response.success) setBlogCategories(response.blogCategories);
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
				dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
				const response = await apiDeleteBlogCategory(bid);

				dispatch(showModal({ isShowModal: false, modalChildren: null }));

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
		fetchBlogCategories();
	}, [update]);
	console.log(blogCategories);
	return (
		<div className="w-full relative px-4 mx-auto h-full">
			{editBlog && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateBlog editBlog={editBlog} render={render} setEditBlog={setEditBlog} />
				</div>
			)}
			<header className="text-3xl font-bold py-4 border-b border-main">Quản lý danh mục tin tức</header>
			<table className="table-auto mb-6 text-center text-sm my-8 w-main mx-auto">
				<thead className="font-bold bg-main text-white">
					<tr className="">
						<th className="py-4 px-2 ">STT</th>
						<th className="py-4 px-2 ">Tựa đề</th>

						<th className="py-4 px-2 ">Thời gian</th>
						<th className="py-4 px-2 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{blogCategories?.map((el, index) => (
						<tr key={index} className="border border-t-0 border-[#ccc]">
							<td className="py-4 px-2 ">{index + 1}</td>
							<td className="py-4 px-2  truncate max-w-[200px]">{el.title}</td>

							<td className="py-4 px-2">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditBlog(el);
											window.scrollTo({
												top: 0,
												behavior: "smooth",
											});
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

export default withBaseComponent(memo(ManageBlogCategory));
