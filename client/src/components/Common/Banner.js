import { apiGetBanners } from "apis";
import React, { memo, useEffect, useState } from "react";
import Slider from "react-slick";

const Banner = () => {
	const [banners, setBanners] = useState(null);
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		arrows: false,
	};
	const fetchBanners = async () => {
		const response = await apiGetBanners();
		if (response.success) setBanners(response.banners);
	};
	useEffect(() => {
		fetchBanners();
	}, []);
	return (
		<div className="w-full">
			<Slider {...settings}>
				{banners?.map((el, index) => (
					<div key={index}>
						<img src={el.image} alt="img" className="object-cover md:min-h-[390px] w-full min-h-[200px] px-4 md:px-0" />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default memo(Banner);
