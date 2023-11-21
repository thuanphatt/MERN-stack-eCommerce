import { apiGetOrders, apiGetProducts, apiGetUsers } from "apis";
import { DoughnutChart, VerticalBarChart, HorizontalChart } from "components";
import React, { memo, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { LiaUserSlashSolid } from "react-icons/lia";
import { FiUserCheck } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { getTopOrderUser } from "utils/helpers";

const Dashboard = () => {
	const [orders, setOrders] = useState(null);
	const [nameProduct, setNameProduct] = useState(null);
	const [nameNoSoldProduct, setNameNoSoldProduct] = useState(null);
	const [soldProductData, setSoldProductData] = useState(null);
	const [noSoldProductData, setNoSoldProductData] = useState(null);
	const [nameProductRating, setNameProductRating] = useState(null);
	const [nameProductLessRating, setNameProductLessRating] = useState(null);
	const [productRatingData, setProductRatingData] = useState(null);
	const [productLessRatingData, setProductLessRatingData] = useState(null);
	const [users, setUsers] = useState(null);
	const fetchOrders = async () => {
		const response = await apiGetOrders();
		if (response.success) {
			setOrders(response.orders);
		}
	};
	const fetchUsers = async () => {
		const response = await apiGetUsers();
		if (response.success) setUsers(response.users);
	};
	const fetchTopProductSold = async () => {
		const response = await apiGetProducts({ sort: "-sold", limit: 5 });
		if (response.success) {
			setSoldProductData(response.products?.map((el) => el.sold));
			setNameProduct(response.products?.map((el) => el.title));
		}
	};
	const fetchTopProductNoSold = async () => {
		const response = await apiGetProducts({ sort: "sold" });
		if (response.success) {
			setNoSoldProductData(response.products?.filter((product) => product.sold >= 0)?.map((el) => el.sold));
			setNameNoSoldProduct(response.products?.filter((product) => product.sold >= 0)?.map((el) => el.title));
		}
	};
	const fetchTopProductRating = async () => {
		const response = await apiGetProducts({ sort: "-totalRatings", limit: 5 });
		if (response.success) {
			setNameProductRating(response.products?.map((el) => el.title));
			setProductRatingData(response.products?.map((el) => el.totalRatings));
		}
	};
	const fetchTopProductLessRating = async () => {
		const response = await apiGetProducts({ sort: "totalRatings" });
		if (response.success) {
			setNameProductLessRating(
				response.products?.filter((product) => product.totalRatings >= 0)?.map((el) => el.title)
			);
			setProductLessRatingData(
				response.products?.filter((product) => product.totalRatings >= 0)?.map((el) => el.totalRatings)
			);
		}
	};

	useEffect(() => {
		fetchOrders();
		fetchTopProductSold();
		fetchTopProductRating();
		fetchUsers();
		fetchTopProductNoSold();
		fetchTopProductLessRating();
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
	const labelsArray = resultArray.map((item) => item.status);
	console.log(nameProductLessRating);
	return (
		<div className="w-full relative px-4 mx-auto">
			<header className="text-3xl font-bold py-4 border-b border-main">Dashboard</header>
			<div className="flex md:items-center gap-2 mt-4 md:flex-row flex-col">
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-gray-100">
					<span className="font-bold text-lg">{users?.length}</span>
					<div className="flex items-center gap-2 justify-center">
						<FaRegUser size={16} />
						<h2 className="text-lg font-medium">Người dùng</h2>
					</div>
				</div>
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-blue-400 text-white">
					<span className="font-bold text-lg">{users?.filter((el) => el.role === "2001").length}</span>
					<div className="flex items-center gap-2 justify-center">
						<RiAdminLine size={18} />
						<h2 className="text-lg font-medium">Admin</h2>
					</div>
				</div>
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-green-400 text-white">
					<span className="font-bold text-lg">{users?.filter((el) => el.isBlocked === false).length}</span>
					<div className="flex items-center gap-2 justify-center">
						<FiUserCheck size={18} />
						<h2 className="text-lg font-medium">Hoạt động</h2>
					</div>
				</div>
				<div className="flex-1 stat-box border rounded-md shadow-md p-4 text-center bg-red-400 text-white">
					<span className="font-bold text-lg">{users?.filter((el) => el.isBlocked === true).length}</span>
					<div className="flex items-center gap-2 justify-center">
						<LiaUserSlashSolid size={18} />
						<h2 className="text-lg font-medium">Bị khóa</h2>
					</div>
				</div>
			</div>

			<div className="flex items-end w-full mt-4 justify-center md:flex-row flex-col">
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="md:h-[400px] w-full flex justify-center items-center md:mt-0 mt-6">
						<DoughnutChart dataOrders={countArray} dataLabels={labelsArray} />
					</div>
				</div>
				<div className="flex-1 w-full flex flex-col items-end gap-4">
					<div className="md:h-[450px] w-full flex justify-center items-end md:mt-0 mt-6">
						<HorizontalChart
							nameProduct={nameProduct}
							soldProduct={soldProductData}
							label="Số lượng đã bán"
							color="rgba(148,187,233,1)"
							title="Biểu đồ thống kê Top 5 sản phẩm bán chạy nhất"
						/>
					</div>
				</div>
			</div>
			<div className="flex items-center w-full md:mt-[100px] mt-6 justify-center md:flex-row flex-col">
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="md:h-[450px] w-full flex justify-center items-center">
						<VerticalBarChart
							nameProduct={getTopOrderUser(orders, "name")}
							soldProduct={getTopOrderUser(orders, "total")}
							label="VND"
							color="rgba(148,187,150,1)"
							title="Biểu đồ thống kê Top 5 người dùng mua hàng nhiều nhất"
						/>
					</div>
				</div>
				<div className="flex-1 w-full flex flex-col items-center gap-4 md:mt-0 mt-6">
					<div className="md:h-[450px] w-full flex justify-center items-center">
						<HorizontalChart
							nameProduct={nameProductRating}
							soldProduct={productRatingData}
							label="Đánh giá"
							color="rgba(238,174,202,1)"
							title="Biểu đồ thống kê Top 5 sản phẩm được giá cao nhất"
						/>
					</div>
				</div>
			</div>
			<div className="flex items-center w-full md:mt-[100px] mt-6 justify-center md:flex-row flex-col">
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="md:h-[450px] w-full flex justify-center items-center">
						<HorizontalChart
							nameProduct={nameProductLessRating}
							soldProduct={productLessRatingData}
							label="Đánh giá"
							color="rgba(255, 206, 86, 0.2)"
							title="Biểu đồ thống kê các sản phẩm bị đánh giá thấp"
						/>
					</div>
				</div>
				<div className="flex-1 w-full flex flex-col items-center gap-4">
					<div className="md:h-[450px] w-full flex justify-center items-center md:mt-0 mt-6">
						<HorizontalChart
							nameProduct={nameNoSoldProduct}
							soldProduct={noSoldProductData}
							label="Số lượng đã bán"
							color="rgba(255, 99, 132, 0.2)"
							title="Biểu đồ thống kê các sản phẩm ít được mua nhất"
						/>
					</div>
				</div>
			</div>
			<div className="md:hidden block h-[100px]"></div>
		</div>
	);
};

export default memo(Dashboard);
