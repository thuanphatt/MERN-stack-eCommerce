import { apiGetBuyHistory } from "apis";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { formatMoney, formatPrice } from "utils/helpers";

const BuyHistory = () => {
	const [orders, setOrders] = useState(null);
	const fetchOrder = async () => {
		const response = await apiGetBuyHistory();
		console.log(response);
		if (response.success) {
			setOrders(response.result);
		}
	};
	useEffect(() => {
		fetchOrder();
	}, []);
	return (
		<div className="w-full relative px-4 ">
			<header className="text-3xl font-semibold py-4 border-b border-main">Lịch sử mua hàng</header>
			<table className="table-auto mb-6 text-center text-sm mx-4 my-8">
				<thead className="font-bold bg-gray-600 text-white">
					<tr className="border border-gray-800">
						<th className="py-3 px-1 border border-gray-800">STT</th>
						<th className="py-3 px-1 border border-gray-800">Sản phẩm</th>
						<th className="py-3 px-1 border border-gray-800">Trạng thái</th>
						<th className="py-3 px-1 border border-gray-800">Tổng cộng</th>
						<th className="py-3 px-1 border border-gray-800">Thời gian</th>
					</tr>
				</thead>
				<tbody>
					{orders?.map((el, index) => (
						<tr key={index}>
							<td className="py-2 px-1 border border-gray-800">{index + 1}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">
								{el?.products?.map((item) => (
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
							<td className="py-2 px-1 border-b border-r border-gray-800 truncate max-w-[150px]">{el.status}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{`${formatMoney(
								formatPrice(el?.total)
							)} VND`}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{moment(el.createdAt)?.fromNow()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default memo(BuyHistory);
