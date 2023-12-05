import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { memo, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { apiDeleteService, apiGetServices } from "apis";
import Swal from "sweetalert2";
import { formatMoney, formatPrice } from "utils/helpers";
import { Loading, Pagination } from "components";
import UpdateService from "./UpdateService";
import { showModal } from "store/app/appSlice";
import withBaseComponent from "hocs/withBaseComponent";

const ManageSerice = ({ dispatch }) => {
	const [services, setServices] = useState(null);
	const [update, setUpdate] = useState(false);
	const [editService, setEditService] = useState(null);
	const [counts, setCounts] = useState(0);
	const fetchServices = async () => {
		const response = await apiGetServices();
		if (response.success) {
			setServices(response.services);
			setCounts(response.counts);
		}
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleDeleteService = (sid) => {
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
				const response = await apiDeleteService(sid);
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
		fetchServices();
	}, [update]);
	return (
		<div className="w-full relative px-4 mx-auto h-full">
			{editService && (
				<div className="absolute bg-gray-100 inset-0 min-h-screen z-50">
					<UpdateService
						editService={editService}
						render={render}
						setEditService={setEditService}
						services={services}
					/>
				</div>
			)}
			<header className="text-3xl font-bold py-4 border-b border-main">Quản lý dịch vụ</header>
			<table className="table-auto mb-6 text-center text-sm my-8 w-main mx-auto">
				<thead className="font-bold bg-main text-white">
					<tr className="">
						<th className="py-4 px-2 ">STT</th>
						<th className="py-4 px-2 ">Tên</th>

						<th className="py-4 px-2 ">Loại dịch vụ</th>
						<th className="py-4 px-2 ">Các sản phẩm</th>
						<th className="py-4 px-2 min-w-[120px]">Giá tham khảo</th>
						<th className="py-4 px-2 ">Thời gian</th>
						<th className="py-4 px-2 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{services?.map((el, index) => (
						<tr key={index} className="border border-t-0 border-[#ccc]">
							<td className="py-4 px-2">{index + 1}</td>
							<td className="py-4 px-2 ">{el.name}</td>
							<td className="py-4 px-2">{el.type}</td>
							<td className="py-4 px-2 ">
								{el.products?.map((product) => (
									<ul key={product}>
										<li className="truncate max-w-[250px]">{product.title}</li>
									</ul>
								))}
							</td>
							<td className="py-4 px-2 ">
								{`${formatMoney(formatPrice(el.products?.reduce((sum, product) => sum + product.price, 0)))} VND`}
							</td>
							<td className="py-4 px-2">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2">
								<div className="flex items-center gap-4 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditService(el);
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

export default withBaseComponent(memo(ManageSerice));
