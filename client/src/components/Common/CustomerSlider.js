import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "components";

var settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
};
const CustomerSlider = ({ products, activedTab, normal }) => {
	return (
		<>
			{products && (
				<Slider {...settings} className="custom-slider">
					{products?.map((el) => (
						<Product key={el._id} productData={el} isNew={activedTab === 1 ? false : true} normal={normal} />
					))}
				</Slider>
			)}
		</>
	);
};

export default memo(CustomerSlider);
