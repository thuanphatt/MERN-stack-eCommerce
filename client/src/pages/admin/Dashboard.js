import { apiGetOrders, apiGetProducts } from "apis";
import { DoughnutChart, RadarChart, VerticalBarChart } from "components";
import React, { memo, useEffect, useState } from "react";

const Dashboard = () => {
	const [orders, setOrders] = useState(null);
	const [nameProduct, setNameProduct] = useState(null);
	const [soldProductData, setSoldProductData] = useState(null);
	const fetchOrders = async () => {
		const response = await apiGetOrders();
		if (response.success) setOrders(response.orders);
	};
	const fetchTopProductSold = async () => {
		const response = await apiGetProducts({ sort: "-sold", limit: 5 });
		if (response.success) {
			setSoldProductData(response.products?.map((el) => el.sold));
			setNameProduct(response.products?.map((el) => el.title));
		}
	};
	useEffect(() => {
		fetchOrders();
		fetchTopProductSold();
	}, []);

	const statusArr = orders?.map((el) => {
		return { status: el.status };
	});
	const statusCount = {};
	// eslint-disable-next-line no-unused-vars
	const dataConvert = statusArr?.forEach((item) => {
		const status = item.status;
		if (statusCount[status]) {
			statusCount[status] += 1;
		} else {
			statusCount[status] = 1;
		}
	});
	const resultArray = Object.keys(statusCount).map((status) => ({
		status: status,
		count: statusCount[status],
	}));
	const countArray = resultArray.map((item) => item.count);
	return (
		<div className="w-full relative px-4 mx-auto">
			<header className="text-3xl font-bold py-4 border-b border-main">Dashboard</header>
			<div className="flex items-center w-full mt-4 justify-center">
				<div className="flex-1 h-[600px] w-full flex flex-col items-center gap-4">
					<div className="h-[450px] w-full flex justify-center items-center">
						<DoughnutChart dataOrders={countArray} />
					</div>
				</div>
				<div className="flex-1 h-[600px] w-full flex flex-col items-center gap-4">
					<div className="h-[595px] w-full flex justify-center items-center">
						<VerticalBarChart nameProduct={nameProduct} soldProduct={soldProductData} />
					</div>
				</div>
			</div>
			<div className="flex items-center w-full mt-[100px] justify-center">
				<div className="flex-1 h-[600px] w-full flex flex-col items-center gap-4">
					<div className="h-[450px] w-full flex justify-center items-center">
						<RadarChart nameProduct={nameProduct} soldProduct={soldProductData} />
					</div>
					<p className="font-semibold text-lg">Biểu đồ thống kê trạng thái đơn hàng</p>
				</div>
				<div className="flex-1 h-[600px] w-full flex flex-col items-center gap-4">
					<div className="h-[450px] w-full flex justify-center items-center">
						<DoughnutChart dataOrders={countArray} />
					</div>
					<p className="font-semibold text-lg">Biểu đồ thống kê trạng thái đơn hàng</p>
				</div>
			</div>
		</div>
	);
};

export default memo(Dashboard);
