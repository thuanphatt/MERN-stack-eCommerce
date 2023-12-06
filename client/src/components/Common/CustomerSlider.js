import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "components";
var settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 3,
	initialSlide: 0,
	responsive: [
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};
const CustomerSlider = ({ products, activedTab, normal, relatedProducts }) => {
	return (
		<>
			{products && (
				<Slider {...settings} className="custom-slider">
					{products
						?.filter((product) => product.inputPrice)
						?.map((el) => (
							<Product key={el._id} productData={el} isNew={activedTab === 1 ? false : true} normal={normal} />
						))}
				</Slider>
			)}
			{relatedProducts && (
				<Slider {...settings} className="custom-slider">
					{relatedProducts?.map((el) => (
						<Product key={el._id} productData={el} isNew={activedTab === 1 ? false : true} normal={normal} />
					))}
				</Slider>
			)}
		</>
	);
};

export default memo(CustomerSlider);
