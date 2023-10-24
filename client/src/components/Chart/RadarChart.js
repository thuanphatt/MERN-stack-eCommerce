import React, { memo } from "react";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { Radar } from "react-chartjs-2";
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ nameProduct, soldProduct }) => {
	const data = {
		labels: nameProduct,
		datasets: [
			{
				label: "# Số lượng",
				data: soldProduct,
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	};
	return <Radar data={data} />;
};

export default memo(RadarChart);
