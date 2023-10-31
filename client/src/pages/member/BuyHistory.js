/* eslint-disable react-hooks/exhaustive-deps */
import { apiGetBuyHistory, apiUpdateStatus } from "apis";
import clsx from "clsx";
import { Button, CustomSelect, InputForm, Pagination } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillFilter } from "react-icons/ai";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { statusOrdersLabel } from "utils/contants";
import { formatMoney, formatPrice } from "utils/helpers";
import path from "utils/path";

const BuyHistory = ({ navigate, location }) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useForm();
	const q = watch("q");
	const status = watch("status");
	const [order, setOrder] = useState(null);
	const [counts, setCounts] = useState(0);
	const [params] = useSearchParams();
	const [update, setUpdate] = useState(false);
	const [isFilterDate, setIsFilterDate] = useState(false);
	const fetchOrder = async (params) => {
		const response = await apiGetBuyHistory({
			...params,
			limit: +process.env.REACT_APP_LIMIT,
			sort: isFilterDate ? "-createdAt" : "createdAt",
		});
		if (response.success) {
			setOrder(response.order);
			setCounts(response.counts);
		}
	};
	const render = useCallback(() => {
		setUpdate(!update);
	}, [update]);
	const handleSearchStatus = ({ value }) => {
		navigate({
			pathname: location.pathname,
			search: createSearchParams({ status: value }).toString(),
		});
	};
	const handleCancelOrder = async (oid) => {
		Swal.fire({
			title: "Bạn có chắc chắn không ?",
			text: "Sau khi bạn hủy đơn hàng này sẽ không thể khôi phục lại",
			cancelButtonText: "Không",
			confirmButtonText: "Có",
			showCancelButton: true,
			icon: "warning",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await apiUpdateStatus(oid, { status: "Đã hủy" });
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
	const queryDebounce = useDebounce(q, 800);
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
	}, [queryDebounce]);
	useEffect(() => {
		const searchParams = Object.fromEntries([...params]);
		fetchOrder(searchParams);
	}, [params, isFilterDate, update]);
	return (
		<div className="w-full relative px-4 ">
			<header className="text-3xl font-semibold py-4 border-b border-main">Lịch sử mua hàng</header>
			<div className="flex justify-end items-center pt-6 pr-3">
				<form className="w-[45%] grid grid-cols-2 gap-2">
					<div className="col-span-1">
						<InputForm id="q" register={register} errors={errors} fullWidth placeholder="Tìm kiếm đơn hàng ..." />
					</div>
					<div className="col-span-1 flex items-center">
						<CustomSelect
							options={statusOrdersLabel}
							value={status}
							onChange={(val) => {
								if (!val) {
									navigate(`/${path.MEMBER}/${path.BUY_HISTORY}`);
								}
								val && handleSearchStatus(val);
							}}
							wrapClassName="w-full"
						/>
					</div>
				</form>
			</div>
			<table className="table-auto mb-6 text-center text-sm my-8 w-main mx-auto">
				<thead className="font-bold bg-main text-white">
					<tr className="">
						<th className="py-4 px-2">#</th>
						<th className="py-4 px-2">Sản phẩm</th>
						<th className="py-4 px-2">Trạng thái</th>
						<th className="py-4 px-2">Tổng cộng</th>
						<th className="py-4 px-2 border-gray-800 flex items-center gap-1 justify-center">
							<span>Thời gian</span>
							<span
								className="cursor-pointer hover:text-gray-800 p-1"
								onClick={() => {
									setIsFilterDate(!isFilterDate);
								}}
							>
								<AiFillFilter size={16} />
							</span>
						</th>
						<th className="py-4 px-2 ">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{order?.map((el, index) => (
						<tr key={index} className="border border-t-0 border-[#ccc]">
							<td className="py-4 px-2 ">
								{(+params.get("page") > 1 ? +params.get("page") - 1 : 0) * process.env.REACT_APP_LIMIT + index + 1}
							</td>
							<td className="py-4 px-2 max-h-[50px] overflow-y-auto">
								<ul className="flex items-center gap-2 justify-center p-2 h-full flex-col">
									{el.products.map((item) => (
										<li className="text-sm" key={item._id}>{`${item.title} - ${item.color}`}</li>
									))}
								</ul>
							</td>
							<td className="py-4 px-2 truncate max-w-[150px]">{el?.status}</td>
							<td className="py-4 px-2">{`${formatMoney(formatPrice(el?.total))} VND`}</td>
							<td className="py-4 px-2">{moment(el?.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2">
								{el.status === "Đang xử lý" && el.paymentMethod === "COD" && (
									<Button
										handleOnClick={() => {
											handleCancelOrder(el._id);
										}}
										style={clsx("px-4 py-2 rounded-md text-white font-semibold my-2 bg-red-500")}
									>
										Hủy đơn
									</Button>
								)}
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

export default withBaseComponent(memo(BuyHistory));
