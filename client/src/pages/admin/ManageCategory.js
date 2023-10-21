import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";

import { apiGetCategories, apiRemoveCategory } from "apis";
import UpdateCate from "./UpdateCate";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageCategory = () => {
	const [categories, setCategories] = useState(null);
	const [editCategory, setEditCategory] = useState(null);
	const [update, setUpdate] = useState(false);
	const fetchCategories = async () => {
		const response = await apiGetCategories();
		if (response.success) setCategories(response.prodCategories);
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteCate = (pcid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa danh mục này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await apiRemoveCategory(pcid);
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
		fetchCategories();
	}, [update]);
	return (
		<div className="w-full relative px-4 mx-auto h-full">
			{editCategory && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateCate editCategory={editCategory} render={render} setEditCategory={setEditCategory} />
				</div>
			)}
			<header className="text-3xl font-semibold py-4 border-b border-main">Quản lý danh mục</header>
			<table className="table-auto mb-6 text-center text-sm mx-4 my-8">
				<thead className="font-bold bg-gray-600 text-white">
					<tr className="border border-gray-800">
						<th className="py-3 px-1 border border-gray-800">STT</th>
						<th className="py-3 px-1 border border-gray-800">Danh mục</th>
						<th className="py-3 px-1 border border-gray-800">Thương hiệu</th>
						<th className="py-3 px-1 border border-gray-800">Ảnh</th>
						<th className="py-3 px-1 border border-gray-800">Thời gian</th>
						<th className="py-3 px-1 border border-gray-800">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{categories?.map((el, index) => (
						<tr key={index}>
							<td className="py-2 px-1 border border-gray-800">{index + 1}</td>
							<td className="py-2 px-1 border border-gray-800">{el.title}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800 truncate max-w-[150px]">
								{el.brand.map((item) => (
									<div key={item} className="flex flex-col gap-2">
										<span className="text-sm">{item}</span>
									</div>
								))}
							</td>
							<td className="py-2 px-1 border-b border-r border-gray-800 truncate max-w-[150px]">
								<img src={el.image} alt={el.title} />
							</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditCategory(el);
										}}
									>
										<AiFillEdit size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-red-500"
										onClick={() => {
											handleDeleteCate(el._id);
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

export default memo(ManageCategory);
