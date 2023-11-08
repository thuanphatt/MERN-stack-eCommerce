/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from "react";
import moment from "moment";

import { Countdown } from "components";
import { apiGetProducts } from "apis/product";
import { formatMoney, renderStarFromNumber, secondsToHms } from "utils/helpers";

import icons from "utils/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import withBaseComponent from "hocs/withBaseComponent";
import { getDealDaily } from "store/products/productSlice";
import { apiGetCoupon } from "apis";
const { AiFillStar, IoMenu } = icons;
let idInterval;
const DailyDeal = ({ dispatch }) => {
	const { dealDaily } = useSelector((state) => state.products);
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);
	const [expireTime, setExpireTime] = useState(false);
	const [coupon, setCoupon] = useState(null);
	const navigate = useNavigate();
	const fetchCoupon = async (data) => {
		const response = await apiGetCoupon(data);
		if (response.success) setCoupon(response.coupon);
	};
	useEffect(() => {
		fetchCoupon("65360e932a31a89b30ff2da0");
	}, []);
	const fetchDealDaily = async () => {
		const response = await apiGetProducts({
			"totalRatings[gt]": 4,
		});
		if (response.success) {
			const products = response.products[Math.round(Math.random() * 5)];

			dispatch(getDealDaily({ data: products, time: Date.now() + 24 * 60 * 60 * 1000 }));

			const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
			const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000; // miliseconds = 5h (today) - now time + ms of 1 day

			const number = secondsToHms(seconds);
			setHour(number.h);
			setMinute(number.m);
			setSecond(number.s);
		} else {
			setHour(0);
			setMinute(59);
			setSecond(59);
		}
	};

	useEffect(() => {
		if (dealDaily?.time) {
			const timeRemaining = dealDaily?.time - Date.now();
			const number = secondsToHms(timeRemaining);
			setHour(number.h);
			setMinute(number.m);
			setSecond(number.s);
		}
	}, [dealDaily]);
	useEffect(() => {
		idInterval && clearInterval(idInterval);
		if (dealDaily?.time < Date.now()) fetchDealDaily();
	}, [expireTime, dealDaily]);
	useEffect(() => {
		idInterval = setInterval(() => {
			if (second > 0) setSecond((prev) => prev - 1);
			else {
				if (minute > 0) {
					setMinute((prev) => prev - 1);
					setSecond(60);
				} else {
					if (hour > 0) {
						setHour((prev) => prev - 1);
						setMinute(60);
						setSecond(60);
					} else {
						setExpireTime(!expireTime);
					}
				}
			}
		}, 1000);
		return () => {
			clearInterval(idInterval);
		};
	});
	return (
		<div className="w-full border flex-auto p-5 mt-[5px]">
			<div className="flex items-center justify-between">
				<span>
					<AiFillStar size={20} color="#DD1111" />
				</span>
				<span className="font-semibold text-[20px] uppercase text-gray-700">{coupon?.name}</span>
				<span></span>
			</div>
			<div
				className="w-full flex flex-col items-center pt-3 gap-2 cursor-pointer"
				onClick={() => {
					navigate(`/${dealDaily?.data?.category[0]}/${dealDaily?.data?._id}/${dealDaily?.data?.title}`);
				}}
			>
				<img
					src={
						dealDaily?.data?.thumb ||
						"https://stores.blackberrys.com/VendorpageTheme/Enterprise/EThemeForBlackberrys/images/product-not-found.jpg"
					}
					alt={dealDaily?.data?.title}
					className="w-full object-contain min-h-[350px]"
				></img>
				<span className="line-clamp-1 text-center capitalize font-medium text-lg">
					{dealDaily?.data?.title.toLowerCase()}
				</span>
				<span className="flex h-4 items-center gap-2">
					{renderStarFromNumber(dealDaily?.data?.totalRatings)?.map((el, index) => (
						<span key={index}>{el}</span>
					))}
				</span>
				<span className="flex items-center gap-2 justify-center">
					<span className="font-medium text-lg">{`${formatMoney(
						dealDaily?.data?.price - dealDaily?.data?.price * (coupon?.discount / 100)
					)} VND`}</span>
					<span className="text-red-500 font-semibold text-lg">{`GIẢM ${coupon?.discount} %`}</span>
				</span>
			</div>
			<div className="mt-4">
				<div className="flex justify-center gap-2 items-center mt-8 mb-3">
					<Countdown unit={"Giờ"} number={hour} />
					<Countdown unit={"Phút"} number={minute} />
					<Countdown unit={"Giây"} number={second} />
				</div>
				<button
					type="button"
					className="w-full font-medium text-white bg-main hover:bg-black flex items-center justify-center gap-3 px-[4px] py-[6px]"
				>
					<IoMenu />
					<span className="uppercase">Tùy chọn</span>
				</button>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(DailyDeal));
