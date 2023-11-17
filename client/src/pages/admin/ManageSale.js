import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { apiDeleteSale, apiGetSales } from "apis";
import Swal from "sweetalert2";
import { showModal } from "store/app/appSlice";
import { Loading } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import UpdateSale from "./UpdateSale";

const ManageSales = ({ dispatch }) => {
	const [sales, setSales] = useState(null);
	const [editSale, setEditSale] = useState(null);
	const [update, setUpdate] = useState(false);
	const fetchSales = async () => {
		const response = await apiGetSales();
		if (response.success) setSales(response.sales);
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteSale = (sid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa sự kiện này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
				const response = await apiDeleteSale(sid);
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
		fetchSales();
	}, [update]);
	return (
		<div className="w-full relative px-4 mx-auto h-full">
			{editSale && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateSale editSale={editSale} render={render} setEditSale={setEditSale} />
				</div>
			)}
			<header className="text-3xl font-bold py-4 border-b border-main">Quản lý sự kiện</header>
			<table className="table-auto mb-6 text-center text-sm my-8 w-main mx-auto">
				<thead className="font-bold bg-main text-white">
					<tr className="">
						<th className="py-4 px-2 ">STT</th>
						<th className="py-4 px-2 ">Tên</th>
						<th className="py-4 px-2 ">Sản phẩm</th>
						<th className="py-4 px-2 ">Mức giảm</th>

						<th className="py-4 px-2 ">Thời gian</th>
						<th className="py-4 px-2 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{sales?.map((el, index) => (
						<tr key={index} className="border border-t-0 border-[#ccc]">
							<td className="py-4 px-2 ">{index + 1}</td>
							<td className="py-4 px-2 ">{el.name}</td>
							<td className="py-4 px-2 flex items-center justify-center gap-2">
								<img src={el.products[0].thumb} alt={el.name} className="w-[120px] h-[120px] object-contain" />
								<div className="flex flex-col gap-1 items-start">
									<span>{el.products[0].title}</span>
									<span>{el.products[0].color}</span>
								</div>
							</td>
							<td className="py-4 px-2 ">{`${el.discount} %`}</td>
							<td className="py-4 px-2">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditSale(el);
										}}
									>
										<AiFillEdit size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-red-500"
										onClick={() => {
											handleDeleteSale(el._id);
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

export default withBaseComponent(memo(ManageSales));
