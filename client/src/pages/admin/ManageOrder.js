import moment from "moment";
import React, { memo, useCallback, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { apiDeleteOrder, apiGetOrders } from "apis";
import { Pagination } from "components";
import { formatMoney, formatPrice } from "utils/helpers";
// import { statusOrder } from "utils/contants";

const ManagerOrder = () => {
	const [orders, setOrders] = useState([]);
	const [editOrder, setEditOrder] = useState(null);
	const [params] = useSearchParams();
	const [update, setUpdate] = useState(false);
	const [counts, setCounts] = useState(0);
	const fetchOrders = async (params) => {
		const response = await apiGetOrders({ ...params, limit: +process.env.REACT_APP_LIMIT });
		if (response.success) {
			setOrders(response.orders);
			setCounts(response.counts);
		}
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteOrder = async (oid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa đơn hàng này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await apiDeleteOrder(oid);
				console.log(response);
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
		const searchParams = Object.fromEntries([...params]);
		fetchOrders(searchParams);
	}, [update, params]);
	return (
		<div className="w-full relative px-4 ">
			<header className="text-3xl font-semibold py-4 border-b border-main">Quản lý đơn hàng</header>
			<table className="table-auto mb-6 text-center text-sm mx-4 my-8">
				<thead className="font-bold bg-gray-600 text-white">
					<tr className="border border-gray-800">
						<th className="py-3 px-1 border border-gray-800">STT</th>
						<th className="py-3 px-1 border border-gray-800">Mã đơn</th>
						<th className="py-3 px-1 border border-gray-800">Người đặt</th>
						<th className="py-3 px-1 border border-gray-800">Sản phẩm</th>
						<th className="py-3 px-1 border border-gray-800">Trạng thái</th>
						<th className="py-3 px-1 border border-gray-800">Tổng cộng</th>
						<th className="py-3 px-1 border border-gray-800">Thời gian</th>
						<th className="py-3 px-1 border border-gray-800">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{orders?.map((el, index) => (
						<tr key={index}>
							<td className="py-2 px-1 border border-gray-800">{index + 1}</td>
							<td className="py-2 px-1 border border-gray-800">{el._id}</td>
							<td className="py-2 px-1 border border-gray-800">{el.orderBy?.firstName || el.orderBy}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">
								{el.products.map((item) => (
									<div className="flex items-center gap-4 justify-center p-2 border-b">
										<div className="flex flex-col gap-1 items-center flex-1">
											<span className="text-sm truncate max-w-[150px]">{item.title}</span>
											<span>{`Màu sắc: ${item.color}`}</span>
											<img src={item.thumbnail} alt="thumb" className="w-12 h-12 object-cover" />
										</div>
										<div className="flex flex-col gap-1 items-end flex-1">
											<span>{`Số lượng: ${item.quantity}`}</span>
											<span>{`${formatMoney(formatPrice(item?.price))} VND`}</span>
										</div>
									</div>
								))}
							</td>
							{editOrder ? (
								<td className="py-2 px-1 border-b border-r border-gray-800 truncate max-w-[150px]"></td>
							) : (
								<td className="py-2 px-1 border-b border-r border-gray-800 truncate max-w-[150px]">{el.status}</td>
							)}

							<td className="py-2 px-1 border-b border-r border-gray-800">{`${formatMoney(
								formatPrice(el?.total)
							)} VND`}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditOrder(el);
										}}
									>
										<AiFillEdit size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-red-500"
										onClick={() => {
											handleDeleteOrder(el._id);
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
			<div className="flex justify-end my-6 px-4">
				<Pagination totalCount={counts} />
			</div>
		</div>
	);
};

export default memo(ManagerOrder);
