import React, { memo } from "react";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
const RadarChart = ({ dataRevenue, labels, label, title, backgroundColor, borderColor = "rgb(255, 99, 132)" }) => {
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

	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label,
				data: dataRevenue,
				borderColor,
				backgroundColor,
			},
		],
	};
	return <Radar options={options} data={data} />;
};

export default memo(RadarChart);
