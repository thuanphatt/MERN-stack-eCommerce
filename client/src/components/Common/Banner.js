import React, { memo } from "react";
import Slider from "react-slick";
import { srcImg } from "utils/contants";

const Banner = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
	};
	return (
		<div className="w-full">
			<Slider {...settings}>
				{srcImg.map((el) => (
					<div key={el.id}>
						<img src={el.src} alt="img" className="w-full object-cover h-[442px]" />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default memo(Banner);
