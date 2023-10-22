import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";

import { apiGetShipments, apiDeleteShipment } from "apis";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { formatMoney, formatPrice } from "utils/helpers";

const ManageShipment = () => {
	const [shipments, setShipments] = useState(null);
	const [editShipment, setEditShipment] = useState(null);
	const [update, setUpdate] = useState(false);
	const fetchShipment = async () => {
		const response = await apiGetShipments();
		console.log(response);
		if (response.success) setShipments(response.shipment);
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteShipment = (sid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa danh mục này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await apiDeleteShipment(sid);
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
		fetchShipment();
	}, [update]);
	return (
		<div className="w-full relative px-4 mx-auto h-full">
			{editShipment && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					{/* <UpdateCate editCategory={editCategory} render={render} setEditCategory={setEditCategory} /> */}
					editShipment
				</div>
			)}
			<header className="text-3xl font-bold py-4 border-b border-main">Quản lý phí vận chuyển</header>
			<table className="table-auto mb-6 text-center text-sm mx-4 my-8">
				<thead className="font-bold bg-gray-600 text-white">
					<tr className="border border-gray-800">
						<th className="py-3 px-1 border border-gray-800">STT</th>
						<th className="py-3 px-1 border border-gray-800">Tên</th>
						<th className="py-3 px-1 border border-gray-800">Phí vận chuyển</th>
						<th className="py-3 px-1 border border-gray-800">Mức miễn phí vận chuyển</th>
						<th className="py-3 px-1 border border-gray-800">Thời gian</th>
						<th className="py-3 px-1 border border-gray-800">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{shipments?.map((el, index) => (
						<tr key={index}>
							<td className="py-2 px-1 border border-gray-800">{index + 1}</td>
							<td className="py-2 px-1 border border-gray-800">{el.name}</td>
							<td className="py-2 px-1 border border-gray-800">{`${formatMoney(formatPrice(el.cost))} VND`}</td>
							<td className="py-2 px-1 border border-gray-800">{`${formatMoney(formatPrice(el.freeship))} VND`}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditShipment(el);
										}}
									>
										<AiFillEdit size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-red-500"
										onClick={() => {
											handleDeleteShipment(el._id);
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

export default memo(ManageShipment);
