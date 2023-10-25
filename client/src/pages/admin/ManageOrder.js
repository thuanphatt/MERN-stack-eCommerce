import moment from "moment";
import React, { memo, useCallback, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillFilter, AiFillPrinter } from "react-icons/ai";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { apiDeleteOrder, apiDetailOrder, apiGetOrders, apiUpdateStatus } from "apis";
import { InputForm, Pagination } from "components";
import { formatMoney, formatPrice } from "utils/helpers";
import { useForm } from "react-hook-form";
// import { useDebounce } from "react-use";
import withBaseComponent from "hocs/withBaseComponent";
import DetailOrder from "./DetailOrder";
import useDebounce from "hooks/useDebounce";
import jsPDF from "jspdf";
import unidecode from "unidecode-plus";

const ManagerOrder = ({ location, navigate }) => {
	const [orders, setOrders] = useState([]);
	const {
		register,
		formState: { errors },
		watch,
	} = useForm();
	const [editOrder, setEditOrder] = useState(null);
	const [detailOrder, setDetailOrder] = useState(null);
	const [params] = useSearchParams();
	const [update, setUpdate] = useState(false);
	const [isFilterDate, setIsFilterDate] = useState(false);
	const [counts, setCounts] = useState(0);
	const [editedStatus, setEditedStatus] = useState("Đang xử lý");
	const fetchOrders = async (params) => {
		const response = await apiGetOrders({
			...params,
			// limit: +process.env.REACT_APP_LIMIT,
			sort: isFilterDate ? "-createdAt" : "createdAt",
		});

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
	const handleDetailOrder = async (oid) => {
		const response = await apiDetailOrder(oid);
		if (response.success) {
			setDetailOrder(response.mes);
		}
	};

	const handleUpdateStatus = async (oid, newStatus) => {
		const response = await apiUpdateStatus(oid, { status: newStatus });
		if (response.success) {
			setEditOrder(null);
			render();
			toast.success(response.mes);
		} else toast.error(response.mes);
	};
	const handleExportOrder = (data) => {
		const mobile = unidecode(data?.orderBy.mobile);
		const products = unidecode(data.products.map((el) => `${el.title} / ${el.color} SL: ${el.quantity}`).toString());
		const total = data?.total;
		const fullName = unidecode(`${data?.orderBy.firstName} ${data?.orderBy.lastName}`);
		const address = unidecode(data?.orderBy.address[0].toString());
		const paymentMethod = unidecode(data?.paymentMethod);

		const doc = new jsPDF();

		doc.setFont("Helvetica"); // set font
		doc.text("Thông tin don hang", 20, 10);
		doc.text(`Tên: ${fullName}`, 20, 20);
		doc.text(`${unidecode("SĐT")}: ${mobile}`, 20, 30);
		doc.text(`${unidecode("Địa chỉ")}: ${address}`, 20, 40);
		doc.text(`${unidecode("Sản phẩm")}: ${products}`, 20, 70);
		doc.text(`Thanh toán: ${paymentMethod}`, 20, 50);
		doc.text(`${unidecode("Tổng cộng")}: ${formatMoney(formatPrice(total))}`, 20, 60);

		doc.save("order.pdf");
	};

	const queryDebounce = useDebounce(watch("q"), 800);
	useEffect(() => {
		if (queryDebounce) {
			navigate({
				pathname: location.pathname,
				search: createSearchParams({ q: queryDebounce }).toString(),
			});
		} else {
			navigate({
				pathname: location.pathname,
			});
		}
	}, [location.pathname, navigate, queryDebounce]);
	useEffect(() => {
		const searchParams = Object.fromEntries([...params]);
		fetchOrders(searchParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params, update, isFilterDate, editedStatus]);
	return (
		<div className="w-full relative px-4 mx-auto">
			{detailOrder && <DetailOrder detailOrder={detailOrder} setDetailOrder={setDetailOrder} />}
			<header className="text-3xl font-bold py-4 border-b border-main">Quản lý đơn hàng</header>
			<div className="flex justify-end items-center mt-4">
				<form className="w-[25%]">
					<InputForm id="q" register={register} errors={errors} fullWidth placeholder="Tìm kiếm đơn hàng ..." />
				</form>
			</div>
			<table className="table-auto mb-6 text-center text-sm mx-4 my-8">
				<thead className="font-bold bg-gray-600 text-white">
					<tr className="border border-gray-800">
						<th className="py-4 px-2 border border-gray-800">STT</th>
						<th className="py-4 px-2 border border-gray-800">Mã đơn</th>
						<th className="py-4 px-2 border border-gray-800">Người đặt</th>
						<th className="py-4 px-2 border border-gray-800">Sản phẩm</th>
						<th className="py-4 px-2 border border-gray-800">Phương thức TT</th>
						<th className="py-4 px-2 border border-gray-800">Trạng thái</th>
						<th className="py-4 px-2 border border-gray-800">Tổng cộng</th>
						<th className="py-4 px-2 flex items-center gap-2">
							<span>Thời gian</span>
							<span
								className="cursor-pointer "
								onClick={() => {
									setIsFilterDate(!isFilterDate);
								}}
							>
								<AiFillFilter size={16} />
							</span>
						</th>
						<th className="py-4 px-2 border border-gray-800">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{orders?.map((el, index) => (
						<tr key={index}>
							<td className="py-4 px-2 border border-gray-800">
								{(+params.get("page") > 1 ? +params.get("page") - 1 : 0) * process.env.REACT_APP_LIMIT + index + 1}
							</td>
							<td className="py-4 px-2 border border-gray-800">{el._id}</td>
							<td className="py-4 px-2 border border-gray-800">
								<div className="flex flex-col gap-1 items-start">
									<span className="text-sm">{`${el.orderBy?.firstName} ${el.orderBy?.lastName}`}</span>
								</div>
							</td>
							<td className="py-4 px-2 border-b border-r border-gray-800 max-h-[50px] overflow-y-auto">
								{el.products.map((item) => (
									<div className="flex items-center gap-4 justify-center p-2 border-b h-full" key={item._id}>
										<div className="flex flex-col gap-1 flex-1 items-start">
											<span className="text-sm truncate max-w-[150px]">{item.title}</span>
										</div>
									</div>
								))}
							</td>
							<td className="py-4 px-2 border-b border-r border-gray-800 truncate max-w-[150px]">{el.paymentMethod}</td>
							{editOrder?._id === el._id ? (
								<td className="py-4 px-2 border-b border-r border-gray-800 truncate max-w-[150px]">
									<select
										value={el.status || editedStatus}
										onChange={(e) => {
											const newStatus = e.target.value;
											setEditedStatus(newStatus);
											handleUpdateStatus(el._id, newStatus); // Truyền giá trị mới vào handleUpdateStatus
										}}
									>
										<option value="Đã hủy">Đã hủy</option>
										<option value="Đang xử lý">Đang xử lý</option>
										<option value="Đang giao">Đang giao</option>
										<option value="Thành công">Thành công</option>
									</select>
								</td>
							) : (
								<td className="py-4 px-2 border-b border-r border-gray-800 truncate max-w-[150px]">{el.status}</td>
							)}

							<td className="py-4 px-2 border-b border-r border-gray-800">{`${formatMoney(
								formatPrice(el?.total)
							)} VND`}</td>
							<td className="py-4 px-2 border-b border-r border-gray-800">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2 border-b border-r border-gray-800">
								<div className="flex items-center gap-3 justify-center">
									<span
										className="cursor-pointer hover:text-gray-800 text-blue-500"
										onClick={() => {
											setEditOrder(el);
										}}
									>
										<AiFillEdit size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-gray-600"
										onClick={() => {
											handleDetailOrder(el._id);
										}}
									>
										<AiFillEye size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-red-500"
										onClick={() => {
											handleDeleteOrder(el._id);
										}}
									>
										<AiFillDelete size={18} />
									</span>
									<span
										className="cursor-pointer hover:text-gray-800 text-green-700"
										onClick={() => {
											handleExportOrder(el);
										}}
									>
										<AiFillPrinter size={18} />
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

export default withBaseComponent(memo(ManagerOrder));
