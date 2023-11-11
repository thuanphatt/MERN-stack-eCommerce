import React, { memo } from "react";
import Slider from "react-slick";
import { feedbackUser } from "utils/contants";
const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	arrows: false,
};
const Feedback = () => {
	return (
		<div className="md:w-main w-full">
			<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main mb-4">
				Phản hồi của khách hàng
			</h2>
			<Slider {...settings}>
				{feedbackUser.map((el) => (
					<div key={el.id} className="w-[70%] rounded-md">
						<div className="flex items-center justify-center">
							<img src={el.src} alt="img" className="object-cover md:h-[450px] h-full shadow-sm rounded-3xl border" />
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default memo(Feedback);
