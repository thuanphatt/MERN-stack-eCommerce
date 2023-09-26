import React, { useState, useEffect, memo } from "react";
import moment from "moment";

import { Countdown } from "./";
import { apiGetProducts } from "../apis/product";
import {
  formatMoney,
  renderStarFromNumber,
  secondsToHms,
} from "../utils/helpers";

import icons from "../utils/icons";
const { AiFillStar, IoMenu } = icons;
let idInterval;
const DailyDeal = () => {
  const [productRandom, setProductRandom] = useState(null);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });
    if (response.success) {
      setProductRandom(response.products[0]);
      const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000; // miliseconds = 5h (today) - now time + ms of 1 day

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
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime]);
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
        <span className="">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="font-semibold text-[20px] uppercase text-gray-700">
          Daily Deals
        </span>
        <span></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 gap-2">
        <img
          src={
            productRandom?.thumb ||
            "https://stores.blackberrys.com/VendorpageTheme/Enterprise/EThemeForBlackberrys/images/product-not-found.jpg"
          }
          alt={productRandom?.title}
          className="w-full object-contain"
        ></img>
        <span className="line-clamp-1 text-center capitalize">
          {productRandom?.title.toLowerCase()}
        </span>
        <span className="flex h-4">
          {renderStarFromNumber(productRandom?.totalRatings)?.map(
            (el, index) => (
              <span key={index}>{el}</span>
            )
          )}
        </span>
        <span>{`${formatMoney(productRandom?.price)} VND`}</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-center gap-2 items-center mt-8 mb-3">
          <Countdown unit={"Hours"} number={hour} />
          <Countdown unit={"Minutes"} number={minute} />
          <Countdown unit={"Seconds"} number={second} />
        </div>
        <button
          type="button"
          className="w-full font-medium text-white bg-main hover:bg-black flex items-center justify-center gap-3 px-[4px] py-[6px]"
        >
          <IoMenu />
          <span className="uppercase">Options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DailyDeal);
