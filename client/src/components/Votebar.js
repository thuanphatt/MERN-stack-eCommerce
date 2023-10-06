import React, { useRef, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";

const Votebar = ({ number, ratingCount, ratingTotal }) => {
	const percentRef = useRef();
	useEffect(() => {
		percentRef.current.style.cssText = `right : ${100 - Math.round((ratingCount * 100) / ratingTotal)}%`;
	}, [ratingCount, ratingTotal]);
	return (
		<div className="flex items-center gap-2 text-sm text-gray-500">
			<div className="flex w-[10%] items-center justify-center gap-1 text-sm">
				<span className="w-2 font-medium">{number}</span>
				<AiFillStar color="orange" />
			</div>
			<div className="w-[75%]">
				<div className="w-full h-[6px] bg-gray-200 rounded-l-full rounded-r-full relative">
					<div ref={percentRef} className="absolute bg-main inset-0 rounded-l-full rounded-r-full"></div>
				</div>
			</div>
			<div className="w-[15%] flex justify-end text-[12px]">{`${ratingCount || 0} đánh giá`}</div>
		</div>
	);
};

export default Votebar;
