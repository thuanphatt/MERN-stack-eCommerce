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
		<div className="w-full flex flex-col gap-4 relative">
			{editCategory && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateCate editCategory={editCategory} render={render} setEditCategory={setEditCategory} />
				</div>
			)}
			<div className="w-full h-[69px]"></div>
			<div className="flex items-center justify-betweend p-4 border-b w-full fixed top-0 bg-gray-100">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Quản lý danh mục</span>
				</h1>
			</div>
			<table className="table-auto mb-6 text-center text-sm w-main mx-auto my-6">
				<thead className="font-bold bg-main text-white">
					<tr className="text-center">
						<th className="py-3 px-1 ">STT</th>
						<th className="py-3 px-1 ">Danh mục</th>
						<th className="py-3 px-1 ">Thương hiệu</th>
						<th className="py-3 px-1 ">Ảnh</th>
						<th className="py-3 px-1 ">Thời gian</th>
						<th className="py-3 px-1 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{categories?.map((el, index) => (
						<tr key={index} className="border border-t-0 border-[#ccc]">
							<td className="py-2 px-1 ">{index + 1}</td>
							<td className="py-2 px-1 ">{el.title}</td>
							<td className="py-2 px-1 truncate max-w-[150px]">
								{el.brand.map((item) => (
									<div key={item} className="flex flex-col gap-2">
										<span className="text-sm">{item}</span>
									</div>
								))}
							</td>
							<td className="py-2 px-1 flex items-center justify-center">
								<img src={el.image} alt={el.title} className="w-[100px] h-[100px] object-contain" />
							</td>
							<td className="py-2 px-1">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-2 px-1">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditCategory(el);
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
