/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { memo, useCallback, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillFilter } from "react-icons/ai";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { apiDeleteOrder, apiDetailOrder, apiGetOrders, apiGetOrdersNolimit, apiUpdateStatus } from "apis";
import { CustomSelect, InputForm, Loading, Pagination } from "components";
import { formatExportData, formatMoney, formatPrice } from "utils/helpers";
import { useForm } from "react-hook-form";
import withBaseComponent from "hocs/withBaseComponent";
import DetailOrder from "./DetailOrder";
import useDebounce from "hooks/useDebounce";

import { RiArrowGoBackFill } from "react-icons/ri";
import path from "utils/path";
import { paymentMethodOrdersLabel, statusOrdersLabel } from "utils/contants";
import { showModal } from "store/app/appSlice";
import { CSVLink } from "react-csv";
import { CiCircleCheck, CiExport } from "react-icons/ci";
import { IoReceiptOutline } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";
import { LiaTimesCircle, LiaTruckLoadingSolid } from "react-icons/lia";
import clsx from "clsx";
const ManagerOrder = ({ location, navigate, dispatch }) => {
	const [orders, setOrders] = useState([]);
	const {
		register,
		formState: { errors },
		watch,
	} = useForm();
	const status = watch("status");
	const paymentMethod = watch("paymentMethod");
	const [editOrder, setEditOrder] = useState(null);
	const [detailOrder, setDetailOrder] = useState(null);
	const [orderNoLimit, setOrderNoLimit] = useState(null);
	const [params] = useSearchParams();
	const [update, setUpdate] = useState(false);
	const [isFilterDate, setIsFilterDate] = useState(false);
	const [counts, setCounts] = useState(0);
	const [editedStatus, setEditedStatus] = useState("Đang xử lý");
	const fetchOrders = async (params) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiGetOrders({
			...params,
			limit: +process.env.REACT_APP_LIMIT,
			sort: isFilterDate ? "-createdAt" : "createdAt",
		});
		dispatch(showModal({ isShowModal: false, modalChildren: null }));

		if (response.success) {
			setOrders(response.orders);
			setCounts(response.counts);
		}
	};
	const fetchOrdersNoLimit = async () => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiGetOrdersNolimit();
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			setOrderNoLimit(response.orders);
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
				dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
				const response = await apiDeleteOrder(oid);
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
	const handleDetailOrder = async (oid) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiDetailOrder(oid);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));

		if (response.success) {
			setDetailOrder(response.mes);
		}
	};

	const handleUpdateStatus = async (oid, newStatus) => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiUpdateStatus(oid, { status: newStatus });
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.flag) {
			return toast.warning(response.mes);
		}
		if (response.success) {
			setEditOrder(null);
			render();
			toast.success(response.mes);
		} else toast.error(response.mes);
	};
	const data = formatExportData(orderNoLimit, "order");
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
	const handleSearchStatus = ({ value }) => {
		const currentParams = Object.fromEntries([...params]);

		if (typeof paymentMethod !== "undefined") {
			navigate({
				pathname: location.pathname,
				search: createSearchParams({ ...currentParams, status: value, paymentMethod }).toString(),
			});
		} else {
			navigate({
				pathname: location.pathname,
				search: createSearchParams({ ...currentParams, status: value }).toString(),
			});
		}
	};

	const handleSearchPaymentMethod = ({ value }) => {
		const currentParams = Object.fromEntries([...params]);

		if (typeof status !== "undefined") {
			navigate({
				pathname: location.pathname,
				search: createSearchParams({ ...currentParams, paymentMethod: value, status }).toString(),
			});
		} else {
			navigate({
				pathname: location.pathname,
				search: createSearchParams({ ...currentParams, paymentMethod: value }).toString(),
			});
		}
		delete currentParams.paymentMethod;
	};

	useEffect(() => {
		if (params.get("status") && params.get("paymentMethod")) {
			fetchOrders({
				...Object.fromEntries([...params]),
				status: params.get("status"),
				paymentMethod: params.get("paymentMethod"),
			});
		} else {
			fetchOrders(Object.fromEntries([...params]));
		}
		fetchOrdersNoLimit();
	}, [params, update, isFilterDate, editedStatus]);

	return (
		<div className="w-full flex flex-col gap-4 relative">
			{detailOrder && <DetailOrder detailOrder={detailOrder} setDetailOrder={setDetailOrder} />}
			<div className="w-full h-[69px]"></div>
			<div className="flex items-center justify-betweend p-4 border-b w-full fixed top-0 bg-gray-100">
				<h1 className="text-3xl font-bold tracking-tight ">
					<span>Quản lý đơn hàng</span>
				</h1>
			</div>
			<div className="flex md:items-center gap-2 mt-4 md:flex-row flex-col px-5">
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-gray-100">
					<span className="font-bold text-lg">{orderNoLimit?.map((el) => el).length}</span>
					<div className="flex items-center gap-2 justify-center">
						<IoReceiptOutline size={18} />
						<h2 className="text-lg font-medium">Đơn hàng</h2>
					</div>
				</div>
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-red-400 text-white">
					<span className="font-bold text-lg">{orderNoLimit?.filter((el) => el.status === "Đã hủy").length}</span>
					<div className="flex items-center gap-2 justify-center">
						<LiaTimesCircle size={18} />
						<h2 className="text-lg font-medium">Đã hủy</h2>
					</div>
				</div>
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-yellow-500 text-white">
					<span className="font-bold text-lg">{orderNoLimit?.filter((el) => el.status === "Đang xử lý").length}</span>
					<div className="flex items-center gap-2 justify-center">
						<LiaTruckLoadingSolid size={18} />
						<h2 className="text-lg font-medium">Đang xử lý</h2>
					</div>
				</div>
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-blue-400 text-white">
					<span className="font-bold text-lg">{orderNoLimit?.filter((el) => el.status === "Đang giao").length}</span>
					<div className="flex items-center gap-2 justify-center">
						<MdOutlineLocalShipping size={18} />
						<h2 className="text-lg font-medium">Đang giao</h2>
					</div>
				</div>

				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-green-500 text-white">
					<span className="font-bold text-lg">{orderNoLimit?.filter((el) => el.status === "Thành công").length}</span>
					<div className="flex items-center gap-2 justify-center">
						<CiCircleCheck size={18} />
						<h2 className="text-lg font-medium">Thành công</h2>
					</div>
				</div>
			</div>
			<div className="flex justify-between items-center px-5">
				<CSVLink
					filename="allOrder.csv"
					className="border-[2px] flex justify-center rounded-md items-center px-2 py-1 bg-main  text-white"
					data={data}
				>
					<CiExport className="md:text-[20px] text-[18px] " />
					<h2 className="font-[600] px-1">Xuất</h2>
				</CSVLink>
				<form className="w-[50%] grid grid-cols-3 gap-2">
					<div className="col-span-1">
						<InputForm
							id="q"
							register={register}
							errors={errors}
							fullWidth
							placeholder="Tìm kiếm tên người đặt hàng ..."
						/>
					</div>
					<div className="col-span-1 flex items-center">
						<CustomSelect
							options={statusOrdersLabel}
							value={status}
							placeholder="Trạng thái"
							onChange={(value) => {
								const paramsObject = Object.fromEntries([...params]);
								if (!value && paramsObject.status !== undefined) {
									delete paramsObject.status;
									const newSearchParams = new URLSearchParams(paramsObject);
									navigate(`/${path.ADMIN}/${path.MANAGE_ORDER}?${newSearchParams}`);
								}
								value && handleSearchStatus(value);
							}}
							wrapClassName="w-full"
						/>
					</div>
					<div className="col-span-1 flex items-center">
						<CustomSelect
							options={paymentMethodOrdersLabel}
							value={paymentMethod}
							placeholder="PTTT"
							onChange={(value) => {
								const paramsObject = Object.fromEntries([...params]);
								if (!value && paramsObject.paymentMethod !== undefined) {
									delete paramsObject.paymentMethod;
									const newSearchParams = new URLSearchParams(paramsObject);
									navigate(`/${path.ADMIN}/${path.MANAGE_ORDER}?${newSearchParams}`);
								}
								value && handleSearchPaymentMethod(value);
							}}
							wrapClassName="w-full"
						/>
					</div>
				</form>
			</div>
			<table className="table-auto mb-6 text-center text-sm mx-auto w-main">
				<thead className="font-bold bg-main text-white">
					<tr className="text-center">
						<th className="py-4 px-2">STT</th>
						<th className="py-4 px-2">Người đặt</th>
						<th className="py-4 px-2">Sản phẩm</th>
						<th className="py-4 px-2">Phương thức TT</th>
						<th className="py-4 px-2">Trạng thái</th>
						<th className="py-4 px-2">Tổng cộng</th>
						<th className="py-4 px-2 flex items-center gap-2 justify-center">
							<span>Thời gian</span>
							<span
								className="cursor-pointer"
								onClick={() => {
									setIsFilterDate(!isFilterDate);
								}}
							>
								<AiFillFilter size={16} />
							</span>
						</th>
						<th className="py-4 px-2">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{orders?.map((el, index) => (
						<tr key={index} className="border-b border-r border-l border-[#ccc]">
							<td className="py-4 px-2">
								{(+params.get("page") > 1 ? +params.get("page") - 1 : 0) * process.env.REACT_APP_LIMIT + index + 1}
							</td>

							<td className="py-4 px-2">
								<span className="text-sm">{`${el.orderBy?.firstName} ${el.orderBy?.lastName}`}</span>
							</td>
							<td className="py-4 px-2">
								{el.products.map((item) => (
									<div className="flex flex-col gap-1" key={item._id}>
										<span className="text-sm max-w-[350px] truncate">{item.title}</span>
									</div>
								))}
							</td>
							<td className="py-4 px-2 ">{el.paymentMethod}</td>
							{editOrder?._id === el._id ? (
								<td className="py-4 px-2 ">
									<select
										className="text-[12px] text-gray-500 p-2"
										value={el.status || editedStatus}
										onChange={(e) => {
											const newStatus = e.target.value;
											setEditedStatus(newStatus);
											handleUpdateStatus(el._id, newStatus);
										}}
									>
										{el.status === "Đang giao" ? (
											<>
												<>
													<option value="Đang giao" className="text-sm w-full">
														Đang giao
													</option>
													<option value="Thành công" className="text-sm w-full">
														Thành công
													</option>
												</>
											</>
										) : (
											<>
												<option value="Đang xử lý" className="text-sm w-full">
													Đang xử lý
												</option>
												<option value="Đang giao" className="text-sm w-full">
													Đang giao
												</option>
											</>
										)}
									</select>
								</td>
							) : (
								<td
									className={clsx(
										"py-4 px-2 truncate max-w-[150px]",
										el.status === "Thành công" && "text-green-600",
										el.status === "Đã hủy" && "text-red-600"
									)}
								>
									{el.status}
								</td>
							)}

							<td className="py-4 px-2">{`${formatMoney(formatPrice(el?.total))} VND`}</td>
							<td className="py-4 px-2">{moment(el.createdAt)?.format("DD/MM/YYYY h:mm:ss")}</td>
							<td className="py-4 px-2">
								<div className="flex items-center gap-3 justify-center">
									{el?.status !== "Thành công" && el?.status !== "Đã hủy" ? (
										<div>
											{editOrder?._id === el._id ? (
												<span
													className="hover:underline cursor-pointer"
													onClick={() => {
														setEditOrder(null);
													}}
												>
													<RiArrowGoBackFill color="black" />
												</span>
											) : (
												<span
													className="cursor-pointer hover:text-gray-800 text-blue-500"
													onClick={() => {
														setEditOrder(el);
													}}
												>
													<AiFillEdit size={18} />
												</span>
											)}
										</div>
									) : (
										<span className="cursor-pointer hover:text-gray-800 text-gray-500">
											<AiFillEdit size={18} />
										</span>
									)}
									<span
										className="cursor-pointer hover:text-gray-800 text-gray-600"
										onClick={() => {
											handleDetailOrder(el._id);
										}}
									>
										<AiFillEye size={18} />
									</span>
									{el.status === "Thành công" ||
									el?.status === "Đã hủy" ||
									(el?.status === "Đang xử lý" && el?.paymentMethod === "COD") ? (
										<span
											className="cursor-pointer hover:text-gray-800 text-red-500"
											onClick={() => {
												handleDeleteOrder(el._id);
											}}
										>
											<AiFillDelete size={18} />
										</span>
									) : (
										""
									)}
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
