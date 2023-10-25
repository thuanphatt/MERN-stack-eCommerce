import { apiGetOrders, apiGetProducts } from "apis";
import { AreaChart, DoughnutChart, VerticalBarChart } from "components";
import React, { memo, useEffect, useState } from "react";

const Dashboard = () => {
	const [orders, setOrders] = useState(null);
	const [nameProduct, setNameProduct] = useState(null);
	const [soldProductData, setSoldProductData] = useState(null);
	const [nameProductRating, setNameProductRating] = useState(null);
	const [productRatingData, setProductRatingData] = useState(null);
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
	const fetchTopProductRating = async () => {
		const response = await apiGetProducts({ sort: "-totalRatings", limit: 5 });
		if (response.success) {
			setNameProductRating(response.products?.map((el) => el.title));
			setProductRatingData(response.products?.map((el) => el.totalRatings));
		}
	};
	useEffect(() => {
		fetchOrders();
		fetchTopProductSold();
		fetchTopProductRating();
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
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="h-[400px] w-full flex justify-center items-center">
						<DoughnutChart dataOrders={countArray} />
					</div>
				</div>
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="h-[450px] w-full flex justify-center items-center">
						<VerticalBarChart
							nameProduct={nameProduct}
							soldProduct={soldProductData}
							label="Số lượng đã bán"
							color="rgba(53, 162, 235, 0.5)"
							title="Biểu đồ thống kê Top 5 sản phẩm bán chạy nhất"
						/>
					</div>
				</div>
			</div>
			<div className="flex items-center w-full mt-[100px] justify-center">
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="h-[450px] w-full flex justify-center items-center">
						<AreaChart />
					</div>
				</div>
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="h-[450px] w-full flex justify-center items-center">
						<VerticalBarChart
							nameProduct={nameProductRating}
							soldProduct={productRatingData}
							label="Đánh giá"
							color="rgba(255, 99, 132, 0.5)"
							title="Biểu đồ thống kê Top 5 sản phẩm được giá cao nhất"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Dashboard);
