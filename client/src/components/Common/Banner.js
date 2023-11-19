/* eslint-disable react-hooks/exhaustive-deps */
import { apiGetContents } from "apis";
import React, { memo, useEffect, useState } from "react";
import Slider from "react-slick";
import { showModal } from "store/app/appSlice";
import Loading from "./Loading";
import { useDispatch } from "react-redux";

const Banner = () => {
	const [contents, setContents] = useState(null);
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		arrows: false,
	};
	const dispatch = useDispatch();
	const fetchBanners = async () => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiGetContents();
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) setContents(response.contents[0]);
	};
	useEffect(() => {
		fetchBanners();
	}, []);
	return (
		<div className="w-full">
			<Slider {...settings}>
				{contents?.banners?.map((el, index) => (
					<div key={index}>
						<img src={el} alt="img" className="object-cover md:min-h-[415px] w-full min-h-[200px] px-4 md:px-0" />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default memo(Banner);
