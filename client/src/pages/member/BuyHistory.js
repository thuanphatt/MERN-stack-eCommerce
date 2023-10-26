import { apiGetBuyHistory, apiUpdateStatus } from "apis";
import clsx from "clsx";
import { Button, Pagination } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import moment from "moment";
import React, { memo, useCallback, useEffect, useState } from "react";
import { AiFillFilter } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { formatMoney, formatPrice } from "utils/helpers";

const BuyHistory = () => {
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
	useEffect(() => {
		const searchParams = Object.fromEntries([...params]);
		fetchOrder(searchParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [update, params, isFilterDate]);
	return (
		<div className="w-full relative px-4 ">
			<header className="text-3xl font-semibold py-4 border-b border-main">Lịch sử mua hàng</header>
			<table className="table-auto mb-6 text-center text-sm mx-4 my-8">
				<thead className="font-bold bg-gray-600 text-white">
					<tr className="border border-gray-800">
						<th className="py-3 px-1 border border-gray-800">STT</th>
						<th className="py-3 px-1 border border-gray-800">Mã đơn</th>
						<th className="py-3 px-1 border border-gray-800">Sản phẩm</th>
						<th className="py-3 px-1 border border-gray-800">Trạng thái</th>
						<th className="py-3 px-1 border border-gray-800">Tổng cộng</th>
						<th className="py-3 px-1 border-gray-800 flex items-center gap-1">
							<span>Thời gian</span>
							<span
								className="cursor-pointer hover:text-main p-1"
								onClick={() => {
									setIsFilterDate(!isFilterDate);
								}}
							>
								<AiFillFilter size={16} />
							</span>
						</th>
						<th className="py-3 px-1 border border-gray-800">Hành động</th>
					</tr>
				</thead>
				<tbody>
					{order?.map((el, index) => (
						<tr key={index}>
							<td className="py-4 px-2 border border-gray-800">
								{(+params.get("page") > 1 ? +params.get("page") - 1 : 0) * process.env.REACT_APP_LIMIT + index + 1}
							</td>

							<td className="py-4 px-2 border border-gray-800">{el.orderBy?._id}</td>
							<td className="py-4 px-2 border-b border-r border-gray-800 max-h-[50px] overflow-y-auto">
								{el.products.map((item) => (
									<div className="flex items-center gap-4 justify-center p-2 h-full" key={item._id}>
										<div className="flex flex-col gap-1 flex-1 items-start">
											<span className="text-sm truncate max-w-[150px]">{item.title}</span>
											<span>{`Màu sắc: ${item.color}`}</span>
											<img src={item.thumbnail} alt="thumb" className="w-12 h-12 object-cover" />
										</div>
									</div>
								))}
							</td>
							<td className="py-4 px-2 border-b border-r border-gray-800 truncate max-w-[150px]">{el?.status}</td>
							<td className="py-4 px-2 border-b border-r border-gray-800">{`${formatMoney(
								formatPrice(el?.total)
							)} VND`}</td>
							<td className="py-4 px-2 border-b border-r border-gray-800">{moment(el?.createdAt)?.fromNow()}</td>
							<td className="py-4 px-2 border-b border-r border-gray-800">
								{el.status === "Đang xử lý" && (
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
