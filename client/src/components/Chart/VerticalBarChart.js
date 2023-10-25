import React, { memo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VerticalBarChart = ({ nameProduct, soldProduct, label, color, title }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: title,
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
				label: label,
				data: soldProduct,
				backgroundColor: color,
			},
		],
	};

	return <Bar options={options} data={data} />;
};

export default memo(VerticalBarChart);
