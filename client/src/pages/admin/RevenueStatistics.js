import { apiGetOrders } from "apis";
import { AreaChart } from "components";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";

const RevenueStatistics = () => {
	const [orders, setOrders] = useState(null);
	const fetchOrders = async () => {
		const response = await apiGetOrders();
		if (response.success) setOrders(response.orders);
	};
	useEffect(() => {
		fetchOrders();
	}, []);
	// Hàm tính tổng doanh thu cho một danh sách giao dịch
	function calculateTotalRevenue(transactions) {
		return transactions?.reduce((total, transaction) => total + transaction.total, 0);
	}

	// Lấy ngày hiện tại
	const today = new Date();

	// Lấy ngày đầu của tuần (Chủ Nhật là ngày đầu tuần)
	const startOfWeek = new Date(today);
	startOfWeek.setDate(today.getDate() - today.getDay());

	// Tạo mảng để lưu trữ tổng doanh thu cho từng ngày trong tuần
	const weeklyRevenueByDay = [];
	for (let i = 0; i < 7; i++) {
		const currentDate = new Date(startOfWeek);
		currentDate.setDate(startOfWeek.getDate() + i);

		const dailyRevenue = orders?.filter((transaction) => {
			const transactionDate = new Date(transaction.createdAt);
			return (
				transaction.status === "Thành công" &&
				transactionDate.getDate() === currentDate.getDate() &&
				transactionDate.getMonth() === currentDate.getMonth() &&
				transactionDate.getFullYear() === currentDate.getFullYear()
			);
		});

		const totalDailyRevenue = calculateTotalRevenue(dailyRevenue);

		weeklyRevenueByDay.push({
			date: currentDate,
			revenue: totalDailyRevenue,
		});
	}

	const revenueWeek = [];
	const dayOfRevenueWeek = [];
	weeklyRevenueByDay.forEach((item) => {
		revenueWeek.push(item.revenue);
		dayOfRevenueWeek.push(moment(item.date).format("DD/MM"));
	});

	return (
		<div className="w-full relative px-4 mx-auto">
			<header className="text-3xl font-bold py-4 border-b border-main">Thống kê doanh thu</header>
			<div className="flex items-center w-full mt-4 justify-center">
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="h-[400px] w-full flex justify-center items-center">
						<AreaChart dataRevenue={revenueWeek} labels={dayOfRevenueWeek} label="Doanh thu" />
					</div>
				</div>
				{/* thong ke doanh thu theo thang */}
				{/* <div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="h-[450px] w-full flex justify-center items-center">
						<AreaChart />
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default memo(RevenueStatistics);
