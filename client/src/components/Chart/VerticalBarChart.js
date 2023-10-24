import React, { memo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VerticalBarChart = ({ nameProduct, soldProduct }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Biểu đồ thống kế Top 5 sản phẩm bán chạy nhất",
				position: "bottom",
				font: {
					size: 18,
					weight: "bold",
					lineHeight: 1.2,
				},
			},
		},
	};
	const labels = nameProduct;
	const data = {
		labels,
		datasets: [
			{
				label: "Số lượng đã bán",
				data: soldProduct,
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	};

	return <Bar options={options} data={data} />;
};

export default memo(VerticalBarChart);
