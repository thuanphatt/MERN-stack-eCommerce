import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { faker } from "@faker-js/faker";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
const AreaChart = () => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Biểu đồ thống kế Top 5 sản phẩm bán được đánh giá tốt nhất",
				position: "bottom",
				font: {
					size: 18,
					weight: "bold",
					lineHeight: 1.2,
				},
			},
		},
	};

	const labels = ["January", "February", "March", "April", "May", "June", "July"];
	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label: "Dataset 2",
				data: labels?.map(() => faker.number.int({ min: 0, max: 1000 })),
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};
	return <Line options={options} data={data} />;
};

export default memo(AreaChart);
