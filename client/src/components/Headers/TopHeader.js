import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import avatarDefault from "assets/avatarDefault.jpg";
import path from "utils/path";
import { getCurrent } from "store/user/asyncActions";
import { clearMessage, logout } from "store/user/userSlice";
import Swal from "sweetalert2";
import { AiOutlineMenu } from "react-icons/ai";
import NavigationRepo from "components/Navigation/NavigationRepo";
import withBaseComponent from "hocs/withBaseComponent";
import { showMenuRepo } from "store/app/appSlice";
import logo from "assets/logo.png";
const TopHeader = ({ dispatch }) => {
	const navigate = useNavigate();
	const [isShowOptions, setIsShowOptions] = useState(false);
	const { isLoggedIn, current, mes } = useSelector((state) => state.user);
	const { isShowMenuRepo } = useSelector((state) => state.app);
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
			{isShowMenuRepo && (
				<div
					className="bg-overlay z-50 absolute inset-0 flex justify-start h-full w-full md:hidden"
					onClick={() => {
						dispatch(showMenuRepo());
					}}
				>
					<NavigationRepo />
				</div>
			)}
			<span
				className="px-4 py-2 md:hidden block"
				onClick={() => {
					dispatch(showMenuRepo());
				}}
			>
				<AiOutlineMenu size={22} />
			</span>

			<div className="w-main flex items-center md:justify-between justify-end text-xs text-white px-4 md:px-0">
				<span className="hidden md:block">ĐẶT HÀNG TRỰC TUYẾN HOẶC LIÊN HỆ (+84) 9009 9999</span>
				<Link to={`/${path.HOME}`} className="flex items-center justify-center mr-[16%]">
					<img src={logo} alt="logo" className="w-[80px] h-[60px] object-contain block md:hidden"></img>
				</Link>
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
								className="absolute md:top-full top-[35px] md:left-4 left[-50px] bg-gray-100 w-full min-w-[150px] flex flex-col text-black z-100"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								<Link to={`/${path.MEMBER}/${path.PERSONAL}`} className="p-2 hover:bg-gray-200 border border-b-0">
									Thông tin cá nhân
								</Link>
								<Link to={`/${path.MEMBER}/${path.ORDERS}`} className="p-2 hover:bg-gray-200 border border-b-0">
									Đơn hàng
								</Link>
								<Link
									to={`/${path.MEMBER}/${path.VIEWED_PRODUCTS}`}
									className="p-2 hover:bg-gray-200 border border-b-0"
								>
									Sản phẩm đã xem
								</Link>
								{+current?.role === 2001 && (
									<Link to={`/${path.ADMIN}/${path.DASHBOARD}`} className="p-2 hover:bg-gray-200 border border-b-0">
										Quản trị viên
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

export default withBaseComponent(memo(TopHeader));
