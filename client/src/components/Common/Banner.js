import React, { memo } from "react";

const Banner = () => {
	return (
		<div className="w-full">
			<img
				src="https://cdn.shopify.com/s/files/1/2040/0289/files/Kay_FarmBot_Forum_2_dc6c9a68-6908-44be-97a2-010e2b836302_1200x.jpg?v=1673741359"
				alt="banner"
				className="h-[393px] w-full object-cover"
			/>
		</div>
	);
};

export default memo(Banner);
