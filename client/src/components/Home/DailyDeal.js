/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from "react";
import moment from "moment";

import { Countdown } from "components";
import { formatMoney, renderStarFromNumber, secondsToHms } from "utils/helpers";

import icons from "utils/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import withBaseComponent from "hocs/withBaseComponent";
import { getDealDaily } from "store/products/productSlice";
import { apiDeleteSale, apiGetSales } from "apis";
import { toast } from "react-toastify";
const { AiFillStar, IoMenu } = icons;
let idInterval;
const DailyDeal = ({ dispatch }) => {
	const { dealDaily } = useSelector((state) => state.products);
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);
	const [sales, setSales] = useState(null);
	const [expireTime, setExpireTime] = useState(false);
	const navigate = useNavigate();
	const fetchSales = async () => {
		const response = await apiGetSales();
		setSales(response.sales[0]);
	};
	const deleteSale = async (saleId) => {
		try {
			const response = await apiDeleteSale(saleId);
			if (response.success) {
				dispatch(getDealDaily({ data: null, time: 0 }));
			} else {
				console.error("Error deleting sale");
			}
		} catch (error) {
			console.error("Error deleting sale:", error);
		}
	};
	const fetchDealDaily = async () => {
		const response = await apiGetSales();
		if (response.success) {
			const products = response.sales[0];
			dispatch(getDealDaily({ data: products.products[0], time: Date.now() + 24 * 60 * 60 * 1000 }));
			const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
			const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000; // miliseconds = 5h (today) - now time + ms of 1 day
			const number = secondsToHms(seconds);
			setHour(number.h);
			setMinute(number.m);
			setSecond(number.s);
		} else {
			toast.warning("Sự kiện tạm thời đã kết thúc");
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
	}, [expireTime]);

	useEffect(() => {
		fetchSales();
	}, []);
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

		if (second === 0 && minute === 0 && hour === 0 && expireTime) {
			deleteSale(dealDaily?.data?._id);
			fetchDealDaily();
		}

		return () => {
			clearInterval(idInterval);
		};
	}, [second, minute, hour, expireTime]);
	return (
		<div className="w-full border flex-auto p-5 mt-[5px] hidden md:block">
			{dealDaily?.data ? (
				<>
					<div className="flex items-center justify-between">
						<span>
							<AiFillStar size={20} color="#DD1111" />
						</span>
						<span className="font-semibold text-[20px] uppercase text-gray-700">{sales?.name}</span>
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
							{dealDaily?.data?.title?.toLowerCase()}
						</span>
						<span className="flex h-4 items-center gap-2">
							{renderStarFromNumber(dealDaily?.data?.totalRatings)?.map((el, index) => (
								<span key={index}>{el}</span>
							))}
						</span>
						<span className="flex items-center gap-2 justify-center">
							<span className="font-medium text-lg">{`${formatMoney(
								dealDaily?.data?.price - (dealDaily?.data?.price * Number(sales?.discount)) / 100
							)} VND`}</span>
							<span className="text-red-500 font-semibold text-lg">{`GIẢM ${Number(sales?.discount)}%`}</span>
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
				</>
			) : (
				<span>SỰ KIỆN TẠM THỜI KẾT THÚC</span>
			)}
		</div>
	);
};

export default withBaseComponent(memo(DailyDeal));
