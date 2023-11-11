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
		arrows: false,
	};
	return (
		<div className="w-full">
			<Slider {...settings}>
				{srcImg.map((el) => (
					<div key={el.id}>
						<img src={el.src} alt="img" className="object-cover md:min-h-[390px] w-full min-h-[200px]" />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default memo(Banner);
