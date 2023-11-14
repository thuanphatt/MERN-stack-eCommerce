import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";

import { apiGetShipments, apiDeleteShipment } from "apis";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { formatMoney, formatPrice } from "utils/helpers";
import UpdateShipment from "./UpdateShipment";
import { showModal } from "store/app/appSlice";
import { Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";

const ManageShipment = ({ dispatch }) => {
	const [shipments, setShipments] = useState(null);
	const [editShipment, setEditShipment] = useState(null);
	const [update, setUpdate] = useState(false);
	const fetchShipment = async () => {
		const response = await apiGetShipments();
		if (response.success) setShipments(response.shipment);
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteShipment = (sid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa phí vận chuyển này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
				const response = await apiDeleteShipment(sid);
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
		fetchShipment();
	}, [update]);
	return (
		<div className="w-full flex flex-col gap-4 relative">
			{editShipment && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateShipment editShipment={editShipment} render={render} setEditShipment={setEditShipment} />
				</div>
			)}
			<div className="w-full h-[69px]"></div>
			<div className="flex items-center justify-betweend p-4 border-b w-full fixed top-0 bg-gray-100">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Quản lý phí vận chuyển</span>
				</h1>
			</div>
			<table className="table-auto mb-6 text-center text-sm mx-auto my-8 w-main">
				<thead className="font-bold bg-main text-white">
					<tr className="">
						<th className="py-4 px-2 ">STT</th>
						<th className="py-4 px-2 ">Tên</th>
						<th className="py-4 px-2 ">Phí vận chuyển</th>
						<th className="py-4 px-2 ">Mức miễn phí</th>
						<th className="py-4 px-2 ">Thời gian</th>
						<th className="py-4 px-2 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{shipments?.map((el, index) => (
						<tr key={index} className="border border-t-0 border-[#ccc]">
							<td className="py-4 px-2 ">{index + 1}</td>
							<td className="py-4 px-2 ">{el.name}</td>
							<td className="py-4 px-2 ">{`${formatMoney(formatPrice(el.cost))} VND`}</td>
							<td className="py-4 px-2 ">{`${formatMoney(formatPrice(el.freeship))} VND`}</td>
							<td className="py-4 px-2">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2">
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

export default withBaseComponent(memo(ManageShipment));
