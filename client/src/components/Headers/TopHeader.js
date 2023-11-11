import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import avatarDefault from "assets/avatarDefault.jpg";
import path from "utils/path";
import { getCurrent } from "store/user/asyncActions";
import { clearMessage, logout } from "store/user/userSlice";
import Swal from "sweetalert2";
import { AiOutlineMenu } from "react-icons/ai";
import NavigationRepo from "components/Navigation/NavigationRepo";
const TopHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isShowOptions, setIsShowOptions] = useState(false);
	const [isShowMenu, setIsShowMenu] = useState(false);
	const { isLoggedIn, current, mes } = useSelector((state) => state.user);
	const handleClickMenu = () => {
		console.log("click menu");
		setIsShowMenu(!isShowMenu);
	};
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
				navigate(`/${path.LOGIN}`);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mes]);
	useEffect(() => {
		const handleClickoutOptions = (e) => {
			const profile = document.getElementById("profile");
			if (!profile?.contains(e.target)) setIsShowOptions(false);
		};
		document.addEventListener("click", handleClickoutOptions);
		return () => {
			document.removeEventListener("click", handleClickoutOptions);
		};
	}, []);
	return (
		<div className="md:h-[38px] h-full w-full bg-main items-center justify-center flex py-2">
			{isShowMenu && <NavigationRepo />}
			{!isShowMenu && (
				<span
					className="block md:hidden p-2"
					onClick={() => {
						handleClickMenu();
					}}
				>
					<AiOutlineMenu size={20} color="white" />
				</span>
			)}

			<div className="w-main flex items-center md:justify-between justify-end text-xs text-white px-4 md:px-0">
				<span className="hidden md:block">ĐẶT HÀNG TRỰC TUYẾN HOẶC LIÊN HỆ (+84) 9009 9999</span>

				{isLoggedIn && current ? (
					<div className="flex items-center justify-center gap-2 relative" id="profile">
						<span
							className="flex items-center gap-2 cursor-pointer"
							onClick={() => {
								setIsShowOptions(!isShowOptions);
							}}
						>
							<img src={current?.avatar || avatarDefault} alt="avatar" className="w-6 h-6 object-cover rounded-full" />
							<span>{`${current?.firstName} ${current?.lastName}`}</span>
						</span>

						{isShowOptions && (
							<div
								className="absolute top-full left-4 bg-gray-100 w-full min-w-[150px] flex flex-col text-black z-100"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								<Link to={`/${path.MEMBER}/${path.PERSONAL}`} className="p-2 hover:bg-gray-200 border border-b-0">
									Thông tin cá nhân
								</Link>
								<Link to={`/${path.MEMBER}/${path.MYCART}`} className="p-2 hover:bg-gray-200 border border-b-0">
									Giỏ hàng của tôi
								</Link>
								<Link to={`/${path.MEMBER}/${path.BUY_HISTORY}`} className="p-2 hover:bg-gray-200 border border-b-0">
									Đơn hàng
								</Link>
								{+current?.role === 2001 && (
									<Link to={`/${path.ADMIN}/${path.DASHBOARD}`} className="p-2 hover:bg-gray-200 border border-b-0">
										Admin
									</Link>
								)}

								<span
									onClick={() => {
										dispatch(logout());
									}}
									className="p-2 hover:bg-gray-200 border cursor-pointer"
								>
									Đăng xuất
								</span>
							</div>
						)}
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
