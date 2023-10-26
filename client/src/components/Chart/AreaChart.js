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
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
const AreaChart = ({ dataRevenue, labels, label }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Biểu đồ thống kế doanh thu trong tuần năm 2023",
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
		labels,
		datasets: [
			{
				fill: true,
				label,
				data: dataRevenue,
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};
	return <Line options={options} data={data} />;
};

export default memo(AreaChart);
