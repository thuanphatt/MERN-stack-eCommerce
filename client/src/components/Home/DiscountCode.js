import { apiGetCoupons } from "apis";
import clsx from "clsx";
import Button from "components/Buttons/Button";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Slider from "react-slick";

var settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 4,
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

const DiscountCode = () => {
	const [coupons, setCoupons] = useState(null);
	const [usedItems, setUsedItems] = useState([]);
	const fetchCoupons = async () => {
		const response = await apiGetCoupons();
		if (response.success) setCoupons(response.coupons);
	};
	const handleCopyClick = (id) => {
		const updatedItems = usedItems.includes(id) ? usedItems.filter((item) => item !== id) : [...usedItems, id];
		setUsedItems(updatedItems);
	};
	const copyToClipboard = (text) => {
		if (text) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					toast.success("Đã sao chép mã giảm giá thành công");
				})
				.catch((error) => {
					console.error("Failed to copy to clipboard", error);
				});
		}
	};
	useEffect(() => {
		fetchCoupons();
	}, []);
	return (
		<div className="w-full md:px-0 px-4">
			<h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">Mã giảm giá</h2>

			{coupons ? (
				<Slider {...settings} className="custom-slider-sm">
					{coupons
						?.filter((el) => moment(el?.expiry).isAfter(moment()))
						.map((el, index) => (
							<div className="flex items-center mt-4 gap-2" key={index}>
								<div className="flex items-center flex-1 border shadow-md mx-1">
									<div className="flex-2 flex items-center justify-center px-2">
										<img
											src="https://static.thenounproject.com/png/2513410-200.png"
											alt="discout"
											className="w-12 h-12 object-contain rounded-full bg-red-500 p-2"
										/>
									</div>
									<div className="flex-8 border flex flex-col gap-2 p-4">
										<span className="text-lg font-semibold">{el.name}</span>
										<span className="text-gray-500 text-sm">{`HSD: ${moment(el.expiry).format("DD/MM/YYYY")}`}</span>
										<span className="text-gray-500 text-sm">{`Còn: ${moment(el.expiry).fromNow()}`}</span>
										<div className="flex items-center justify-between">
											<span className="text-blue-500">Chi tiết</span>
											{usedItems.includes(el._id) ? (
												<Button style={clsx("px-2 py-1 text-white bg-gray-400 font-semibold my-2 text-sm")}>
													Đã sao chép
												</Button>
											) : (
												<Button
													style={clsx("px-2 py-1 text-white bg-main font-semibold my-2 text-sm")}
													handleOnClick={() => {
														handleCopyClick(el._id);
														copyToClipboard(el._id);
													}}
												>
													Sao chép
												</Button>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
				</Slider>
			) : (
				<span className="text-xl font-bold text-gray-500">Chương trình khuyển mãi chưa có</span>
			)}
		</div>
	);
};

export default memo(DiscountCode);
