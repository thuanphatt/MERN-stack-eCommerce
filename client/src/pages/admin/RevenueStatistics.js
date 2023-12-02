import { apiGetOrders } from "apis";
import { AreaChart } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo, useEffect, useState } from "react";

import { calculateProfit, calculateRevunue, calculateTotalInitialCapital, calculateTotalRevenue } from "utils/helpers";

const RevenueStatistics = () => {
	const [orders, setOrders] = useState(null);

	const fetchOrders = async () => {
		const response = await apiGetOrders();
		if (response.success) setOrders(response.orders);
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<div className="w-full relative px-4 mx-auto">
			<header className="text-3xl font-bold py-4 border-b border-main">Thống kê doanh thu</header>

			<div className="flex md:items-center gap-2 mt-4 md:flex-row flex-col">
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-gray-100">
					<div className="flex items-center gap-2 justify-center">
						<h2 className="text-lg font-medium">Tổng doanh thu:</h2>
					</div>
					<span className="font-bold text-lg">{` ${calculateTotalRevenue(orders)} VND`}</span>
				</div>
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-yellow-400 text-white">
					<div className="flex items-center gap-2 justify-center">
						<h2 className="text-lg font-medium">Vốn ban đầu:</h2>
					</div>
					<span className="font-bold text-lg">{` ${calculateTotalInitialCapital(orders)} VND`}</span>
				</div>
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-green-500 text-white">
					<div className="flex items-center gap-2 justify-center">
						<h2 className="text-lg font-medium">Lợi nhuận:</h2>
					</div>
					<span className="font-bold text-lg">{` ${calculateProfit(orders)} VND`}</span>
				</div>
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-blue-400 text-white">
					<div className="flex items-center gap-2 justify-center">
						<h2 className="text-lg font-medium">Doanh thu hôm nay:</h2>
					</div>
					<span className="font-bold text-lg">{`${calculateRevunue(orders, "today")} VND`}</span>
				</div>
			</div>
			<div className="flex items-center w-full mt-4 justify-center md:flex-row flex-col">
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="md:max-h-[400px] w-full flex justify-center items-center">
						<AreaChart
							dataRevenue={calculateRevunue(orders, "week").revenueWeek}
							labels={calculateRevunue(orders, "week").dayOfRevenueWeek}
							label="Doanh thu (VND)"
							title="Biểu đồ thống kế doanh thu tuần gần đây nhất"
							backgroundColor="rgba(255, 99, 132, 0.5)"
						/>
					</div>
				</div>
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="md:max-h-[400px] w-full flex justify-center items-center">
						<AreaChart
							dataRevenue={calculateRevunue(orders, "month").revenueMonth}
							labels={calculateRevunue(orders, "month").monthOfRevenueMonth}
							label="Doanh thu (VND)"
							title="Biểu đồ thống kế doanh thu theo tháng"
							backgroundColor="rgba(53, 162, 235, 0.5)"
							borderColor="rgb(53, 162, 235)"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(RevenueStatistics));
