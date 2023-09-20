import React, { memo } from "react";

const Button = ({
  name,
  handleOnClick,
  style,
  iconsBefore,
  iconsAfter,
  fullwidth,
}) => {
  return (
    <button
      type="button"
      className={
        style
          ? style
          : `px-4 py-2 rounded-md text-white bg-main font-semibold my-2 ${
              fullwidth ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {iconsBefore}
      <span>{name}</span>
      {iconsAfter}
    </button>
  );
};

export default memo(Button);
