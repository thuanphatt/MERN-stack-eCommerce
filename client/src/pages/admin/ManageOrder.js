/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import React, { memo, useCallback, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillFilter } from "react-icons/ai";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { apiDeleteOrder, apiDetailOrder, apiGetOrders, apiUpdateStatus } from "apis";
import { CustomSelect, InputForm, Pagination } from "components";
import { formatMoney, formatPrice } from "utils/helpers";
import { useForm } from "react-hook-form";
// import { useDebounce } from "react-use";
import withBaseComponent from "hocs/withBaseComponent";
import DetailOrder from "./DetailOrder";
import useDebounce from "hooks/useDebounce";

import { RiArrowGoBackFill } from "react-icons/ri";
import path from "utils/path";
import { statusOrdersLabel } from "utils/contants";

const ManagerOrder = ({ location, navigate }) => {
	const [orders, setOrders] = useState([]);
	const {
		register,
		formState: { errors },
		watch,
	} = useForm();
	const status = watch("status");
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
			limit: +process.env.REACT_APP_LIMIT,
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

	const handleSearchStatus = ({ value }) => {
		navigate({
			pathname: location.pathname,
			search: createSearchParams({ status: value }).toString(),
		});
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
			<div className="flex justify-end items-center pr-5">
				<form className="w-[45%] grid grid-cols-2 gap-2">
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
							onChange={(val) => {
								if (!val) {
									navigate(`/${path.ADMIN}/${path.MANAGE_ORDER}`);
								}
								val && handleSearchStatus(val);
							}}
							wrapClassName="w-full"
						/>
					</div>
				</form>
			</div>
			<table className="table-auto mb-6 text-center text-sm mx-auto w-main">
				<thead className="font-bold bg-main text-white">
					<tr className="text-center">
						<th className="py-4 px-2">#</th>

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
										<span className="text-sm ">{item.title}</span>
									</div>
								))}
							</td>
							<td className="py-4 px-2 ">{el.paymentMethod}</td>
							{editOrder?._id === el._id ? (
								<td className="py-4 px-2 ">
									<select
										className="text-[12px] text-gray-500 p-2 outline"
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
								<td className="py-4 px-2 truncate max-w-[150px]">{el.status}</td>
							)}

							<td className="py-4 px-2">{`${formatMoney(formatPrice(el?.total))} VND`}</td>
							<td className="py-4 px-2">{moment(el.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2">
								<div className="flex items-center gap-3 justify-center">
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
										<>
											<span
												className="cursor-pointer hover:text-gray-800 text-blue-500"
												onClick={() => {
													setEditOrder(el);
												}}
											>
												<AiFillEdit size={18} />
											</span>
										</>
									)}
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
