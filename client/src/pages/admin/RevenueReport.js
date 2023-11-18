import React, { memo, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { IoPrintOutline } from "react-icons/io5";
import path from "utils/path";
import {
	calculateRevunue,
	calculateTotalRevenue,
	calculateTotalRevenueNumber,
	formatMoney,
	formatPrice,
	getRevenuePredict,
} from "utils/helpers";
import { apiGetOrders, apiGetRevenuePredict } from "apis";
import { Button } from "components";
import moment from "moment";
import withBaseComponent from "hocs/withBaseComponent";
const RevenueReport = ({ navigate }) => {
	const [revenuePredict, setRevenuePredict] = useState(null);
	const [orders, setOrders] = useState(null);

	const fetchOrders = async () => {
		const response = await apiGetOrders();
		if (response.success) setOrders(response.orders);
	};
	const resultArray = getRevenuePredict(revenuePredict?.map((el) => el.revenues)[0][0]);
	const compare = resultArray?.reduce((sum, el) => sum + +el, 0) - calculateTotalRevenueNumber(orders);
	const percentRevenue = (100 * calculateTotalRevenueNumber(orders)) / resultArray?.reduce((sum, el) => sum + +el, 0);
	const fetchRevenuePredicts = async () => {
		const response = await apiGetRevenuePredict();
		if (response.success) setRevenuePredict(response.revenues);
	};
	let reportRevenue = [];
	const data = calculateRevunue(orders, "month").monthOfRevenueMonth.map((el, index) => {
		return {
			STT: index + 1,
			Tháng: el,
			Dự_kiến: `${resultArray && formatMoney(formatPrice(resultArray[index]))} VND`,
			Thực_tế: `${formatMoney(formatPrice(calculateRevunue(orders, "month").revenueMonth[index]))} VND`,

			Ngày_Tạo: moment(revenuePredict?.createdAt).format("MM/DD/YYYY"),
		};
	});
	useEffect(() => {
		fetchOrders();
		fetchRevenuePredicts();
	}, []);
	reportRevenue = data;
	return (
		<div className="w-full relative px-4 mx-auto">
			<header className="text-3xl font-bold py-4 border-b border-main">Báo cáo doanh thu</header>
			<div className="my-4 w-full">
				<div className="flex items-center justify-between">
					<Button
						handleOnClick={() => {
							navigate(`/${path.ADMIN}/${path.CREATE_REVENUEPREDICT}`);
						}}
					>
						Tạo doanh thu dự kiến
					</Button>
					<div className="flex items-center justify-end">
						<CSVLink
							filename="revenue.csv"
							className="border-[2px] flex justify-center rounded-md items-center px-2 py-1 bg-main  text-white"
							data={reportRevenue}
						>
							<IoPrintOutline className="md:text-[20px] text-[18px] " />
							<h2 className="font-[600] px-1">In báo cáo</h2>
						</CSVLink>
					</div>
				</div>
				<form>
					<table className="table-auto mb-6 text-left w-full">
						<thead className="font-bold bg-main text-sm text-white text-center">
							<tr>
								<th className="px-4 py-2">STT</th>
								<th className="px-4 py-2">Tháng</th>
								<th className="px-4 py-2">Dự kiến</th>
								<th className="px-4 py-2">Thực tế</th>
							</tr>
						</thead>

						<tbody>
							{calculateRevunue(orders, "month").monthOfRevenueMonth.map((el, index) => (
								<tr key={index} className="text-center border border-[#ccc]">
									<td className="px-2 py-4">{index + 1}</td>
									<td className="px-2 py-4">{el}</td>
									<td className="px-2 py-4">{`${resultArray && formatMoney(formatPrice(resultArray[index]))} VND`}</td>
									<td className="px-2 py-4">
										{`${formatMoney(formatPrice(calculateRevunue(orders, "month").revenueMonth[index]))} VND`}
									</td>
								</tr>
							))}
							<tr className="text-center border border-[#ccc]">
								<td className="px-2 py-4">Tổng cộng</td>
								<td className="px-2 py-4"></td>
								<td className="px-2 py-4">
									{`${resultArray && formatMoney(formatPrice(resultArray?.reduce((sum, el) => sum + +el, 0)))} VND`}
								</td>
								<td className="px-2 py-4">
									<span className="flex items-center gap-1 justify-center">
										<span>{`${calculateTotalRevenue(orders)} VND`}</span>
										<span className="font-medium text-red-500"></span>
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				<div className="flex flex-col gap-2 my-4">
					<h3 className="font-medium text-xl">{`Tổng kết đến ngày ${moment(Date.now()).format("DD/MM/YYYY")}: `}</h3>
					<span className="pl-6 font-medium">Sự chênh lệch doanh thu giữa thực tế và dự kiến</span>
					<div className="pl-6">
						<span className="font-medium">Tỷ lệ:</span>
						<span className=" font-medium text-red-500">
							{resultArray && ` ${compare > 0 ? "Giảm" : "Tăng"} ${Math.round(percentRevenue)} %`}
						</span>
					</div>
					<span className="pl-6">
						<span className="font-medium">Số tiền chênh lệch:</span>
						<span className="font-medium text-blue-500">{` ${
							resultArray && formatMoney(formatPrice(compare))
						} VND`}</span>
					</span>
				</div>
				<div className="md:hidden block h-[100px]"></div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(RevenueReport));
