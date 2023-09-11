import React, { memo } from "react";

const Countdown = ({ unit, number }) => {
  return (
    <div className="w-[30%] h-[60px] flex justify-center items-center bg-[#f4f4f4] rounded-sm flex-col">
      <span className="text-[18px] text-gray-800 font-semibold">{number}</span>
      <span className="text-xs text-gray-500">{unit}</span>
    </div>
  );
};

export default memo(Countdown);
