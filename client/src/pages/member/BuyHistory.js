import { apiGetBuyHistory } from "apis";
import withBaseComponent from "hocs/withBaseComponent";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { formatMoney, formatPrice } from "utils/helpers";

const BuyHistory = () => {
	const [order, setOrder] = useState(null);
	const [detailOrder, setDetailOrder] = useState(null);

	const fetchOrder = async () => {
		const response = await apiGetBuyHistory();
		if (response.success) {
			setOrder(response.result.products);
			setDetailOrder(response.result);
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
						<th className="py-3 px-1 border border-gray-800">Mã đơn</th>
						<th className="py-3 px-1 border border-gray-800">Sản phẩm</th>
						<th className="py-3 px-1 border border-gray-800">Trạng thái</th>
						<th className="py-3 px-1 border border-gray-800">Tổng cộng</th>
						<th className="py-3 px-1 border border-gray-800">Thời gian</th>
					</tr>
				</thead>
				<tbody>
					{order?.map((el, index) => (
						<tr key={index}>
							<td className="py-2 px-1 border border-gray-800">{index + 1}</td>
							<td className="py-2 px-1 border border-gray-800">{detailOrder?._id}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">
								<div className="flex items-center gap-4 justify-center p-2 border-b">
									<div className="flex flex-col gap-1 items-center flex-1">
										<span className="text-sm truncate max-w-[150px]">{el.title}</span>
										<span>{`Màu sắc: ${el.color}`}</span>
										<img src={el.thumbnail} alt="thumb" className="w-12 h-12 object-cover" />
									</div>
									<div className="flex flex-col gap-1 els-end flex-1">
										<span>{`Số lượng: ${el.quantity}`}</span>
										<span>{`${formatMoney(formatPrice(el?.price))} VND`}</span>
									</div>
								</div>
							</td>
							<td className="py-2 px-1 border-b border-r border-gray-800 truncate max-w-[150px]">
								{detailOrder?.status}
							</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">{`${formatMoney(
								formatPrice(detailOrder?.total)
							)} VND`}</td>
							<td className="py-2 px-1 border-b border-r border-gray-800">
								{moment(detailOrder.createdAt)?.fromNow()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default withBaseComponent(memo(BuyHistory));
