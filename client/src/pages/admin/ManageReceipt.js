/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { apiDeleteReceipt, apiGetReceipts } from "apis";
import Swal from "sweetalert2";
import { showModal } from "store/app/appSlice";
import { Loading, Pagination } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import UpdateReceipt from "./UpdateReceipt";
import { useSearchParams } from "react-router-dom";
import { formatMoney, formatPrice } from "utils/helpers";

const ManageReceipt = ({ dispatch }) => {
	const [receipts, setReceipts] = useState(null);
	const [update, setUpdate] = useState(false);
	const [params] = useSearchParams();
	const [editReceipt, setEditReceipt] = useState(null);
	const [counts, setCounts] = useState(0);
	const fetchReceipts = async (params) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiGetReceipts({ ...params });
		dispatch(showModal({ isShowModal: false, modalChildren: null }));

		if (response.success) {
			setReceipts(response.receipts);
			setCounts(response.counts);
		}
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteReceipt = (rid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn xóa phiếu nhập này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
				const response = await apiDeleteReceipt(rid);
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
		fetchReceipts();
	}, [update]);

	useEffect(() => {
		const searchParams = Object.fromEntries([...params]);
		fetchReceipts(searchParams);
	}, [params, update]);
	return (
		<div className="w-full relative px-4 mx-auto h-full">
			{editReceipt && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateReceipt editReceipt={editReceipt} render={render} setEditReceipt={setEditReceipt} />
				</div>
			)}
			<header className="text-3xl font-bold py-4 border-b border-main">Quản lý phiếu nhập</header>
			<table className="table-auto mb-6 text-center text-sm my-8 w-main mx-auto">
				<thead className="font-bold bg-main text-white">
					<tr className="">
						<th className="py-4 px-2 ">STT</th>
						<th className="py-4 px-2 ">Tên</th>
						<th className="py-4 px-2 ">Ảnh sản phẩm</th>
						<th className="py-4 px-2 ">Giá nhập</th>
						<th className="py-4 px-2 ">Số lượng nhập</th>
						<th className="py-4 px-2 ">Người nhập</th>
						<th className="py-4 px-2 ">Thời gian</th>
						<th className="py-4 px-2 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{receipts?.map((el, index) => (
						<tr key={index} className="border border-t-0 border-[#ccc]">
							<td className="py-4 px-2 ">
								{(+params.get("page") > 1 ? +params.get("page") - 1 : 0) * process.env.REACT_APP_LIMIT + index + 1}
							</td>
							<td className="py-4 px-2">{el.products.title}</td>
							<td className="py-4 px-2 flex items-center justify-center gap-2">
								<img src={el.products.thumb} alt={el.products.title} className="w-[120px] h-[120px] object-contain" />
							</td>
							<td className="py-4 px-2 ">{`${formatMoney(formatPrice(el.inputPrice))} VND`}</td>
							<td className="py-4 px-2 ">{el.inputQuantity}</td>
							<td className="py-4 px-2 ">{`${el.inputName.firstName} ${el.inputName.lastName}`}</td>

							<td className="py-4 px-2">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditReceipt(el);
										}}
									>
										<AiFillEdit size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-red-500"
										onClick={() => {
											handleDeleteReceipt(el._id);
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
			<div className="flex justify-end mb-6 px-4 mx-6">
				<Pagination totalCount={counts} />
			</div>
		</div>
	);
};

export default withBaseComponent(memo(ManageReceipt));
