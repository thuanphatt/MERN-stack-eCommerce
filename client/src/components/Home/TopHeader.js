import React, { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import path from "utils/path";
import { getCurrent } from "store/user/asyncActions";
import icons from "utils/icons";
import { clearMessage, logout } from "store/user/userSlice";
import Swal from "sweetalert2";
const TopHeader = () => {
	const { BiSolidLogOut } = icons;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoggedIn, current, mes } = useSelector((state) => state.user);
	console.log(mes);
	useEffect(() => {
		const setTimeOutId = setTimeout(() => {
			if (isLoggedIn) dispatch(getCurrent());
		}, 300);
		return () => {
			clearTimeout(setTimeOutId);
		};
	}, [dispatch, isLoggedIn]);
	useEffect(() => {
		if (mes)
			Swal.fire("Opps!", mes, "info").then(() => {
				dispatch(clearMessage());
				navigate(`${path.LOGIN}`);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mes]);
	return (
		<div className="h-[38px] w-full bg-main items-center justify-center flex">
			<div className="w-main flex items-center justify-between text-xs text-white">
				<span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
				{isLoggedIn && current ? (
					<div className="flex items-center justify-center gap-2">
						<span>{`Xin chào, ${current?.firstName} ${current?.lastName}`}</span>
						<span
							className="hover:rounded-full hover:bg-gray-200 p-2 hover:text-main cursor-pointer"
							onClick={() => {
								dispatch(logout());
							}}
						>
							<BiSolidLogOut size={18} />
						</span>
					</div>
				) : (
					!isLoggedIn && (
						<Link to={path.LOGIN} className="hover:text-gray-700">
							Đăng nhập hoặc tạo tài khoản
						</Link>
					)
				)}
			</div>
		</div>
	);
};

export default memo(TopHeader);
