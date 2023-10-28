import { apiGetOrders } from "apis";
import { AreaChart } from "components";
import React, { memo, useEffect, useState } from "react";
import { calculateRevunue, calculateTotalRevenue } from "utils/helpers";

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
			<div className="mt-4 flex flex-col gap-2">
				<span className="text-lg font-medium">{`Tổng doanh thu: ${calculateTotalRevenue(orders)} VND`}</span>
				<span className="text-lg font-medium">{`Tổng doanh thu hôm nay: ${calculateRevunue(
					orders,
					"today"
				)} VND`}</span>
			</div>
			<div className="flex items-center w-full mt-4 justify-center">
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="max-h-[400px] w-full flex justify-center items-center">
						<AreaChart
							dataRevenue={calculateRevunue(orders, "week").revenueWeek}
							labels={calculateRevunue(orders, "week").dayOfRevenueWeek}
							label="Doanh thu (VND)"
							title="Biểu đồ thống kế doanh thu theo tuần"
							backgroundColor="rgba(255, 99, 132, 0.5)"
						/>
					</div>
				</div>
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="max-h-[400px] w-full flex justify-center items-center">
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

export default memo(RevenueStatistics);
