import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import path from "../utils/path";
import { getCurrent } from "../store/user/asyncActions";
const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrent());
  }, [dispatch, isLoggedIn]);
  return (
    <div className="h-[38px] w-full bg-main items-center justify-center flex">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {isLoggedIn ? (
          <span>{`Xinh chào, ${current.firstName} ${current.lastName}`}</span>
        ) : (
          <Link to={path.LOGIN} className="hover:text-gray-700">
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
