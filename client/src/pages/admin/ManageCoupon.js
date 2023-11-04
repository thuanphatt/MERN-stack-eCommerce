import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { apiDeleteCoupon, apiGetCoupons } from "apis";
import Swal from "sweetalert2";
import { Pagination } from "components";
import UpdateService from "./UpdateService";

const ManageCoupon = () => {
	const [coupons, setCoupons] = useState(null);
	const [update, setUpdate] = useState(false);
	const [editCoupon, setEditCoupon] = useState(null);
	const [counts, setCounts] = useState(0);
	const fetchCoupons = async () => {
		const response = await apiGetCoupons();
		if (response.success) {
			setCoupons(response.coupons);
			setCounts(response.counts);
		}
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteService = (cid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa mã giảm giá này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await apiDeleteCoupon(cid);
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
		fetchCoupons();
	}, [update]);
	return (
		<div className="w-full relative px-4 mx-auto h-full">
			{editCoupon && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateService editCoupon={editCoupon} render={render} setEditCoupon={setEditCoupon} />
				</div>
			)}
			<header className="text-3xl font-bold py-4 border-b border-main">Quản lý tin tức</header>
			<table className="table-auto mb-6 text-center text-sm my-8 w-main mx-auto">
				<thead className="font-bold bg-main text-white">
					<tr className="">
						<th className="py-4 px-2 ">STT</th>
						<th className="py-4 px-2 ">Tên</th>
						<th className="py-4 px-2 ">Mức giảm</th>
						<th className="py-4 px-2 ">Thời hạn</th>
						<th className="py-4 px-2 ">Thời gian</th>
						<th className="py-4 px-2 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{coupons?.map((el, index) => (
						<tr key={index} className="border border-t-0 border-[#ccc]">
							<td className="py-4 px-2">{index + 1}</td>
							<td className="py-4 px-2 ">{el.name}</td>
							<td className="py-4 px-2">{el.discount}</td>
							<td className="py-4 px-2 ">{moment(el.expiry)?.format("DD/MM/YYYY")}</td>
							<td className="py-4 px-2">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditCoupon(el);
										}}
									>
										<AiFillEdit size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-red-500"
										onClick={() => {
											handleDeleteService(el._id);
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
			<div className="flex justify-end my-6 px-4 mx-6">
				<Pagination totalCount={counts} />
			</div>
		</div>
	);
};

export default memo(ManageCoupon);
