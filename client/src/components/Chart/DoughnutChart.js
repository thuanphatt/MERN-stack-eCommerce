import React, { memo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ dataOrders }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Biểu đồ thống kê trạng thái đơn hàng",
				position: "bottom",
				font: {
					size: 18,
					weight: "bold",
					lineHeight: 1.2,
				},
			},
		},
	};
	const data = {
		labels: ["Thành công", "Đã hủy", "Đang giao", "Đang xử lý", "Đã nhận hàng"],
		datasets: [
			{
				label: "# Số lượng",
				data: dataOrders,
				backgroundColor: [
					"rgba(29,253,85,0.3)",
					"rgba(255, 99, 132, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(54, 162, 235, 0.2)",
				],
				borderColor: [
					"rgba(29,253,85,1)",
					"rgba(255, 99, 132, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(54, 162, 235, 1)",
				],
				borderWidth: 1,
			},
		],
	};
	return <Doughnut data={data} options={options} />;
};

export default memo(DoughnutChart);
