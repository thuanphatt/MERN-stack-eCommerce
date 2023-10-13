import React, { memo, useEffect, useState } from "react";
import logo from "assets/logo.png";
import icons from "utils/icons";
import { Link } from "react-router-dom";
import path from "utils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";

const Header = () => {
	const { current } = useSelector((state) => state.user);
	const [isShowOptions, setIsShowOptions] = useState(false);
	const dispatch = useDispatch();
	const { BsFillTelephoneFill, IoMdMail, FaUserAlt, BsBagCheckFill } = icons;

	useEffect(() => {
		const handleClickoutOptions = (e) => {
			const profile = document.getElementById("profile");
			if (!profile.contains(e.target)) setIsShowOptions(false);
		};
		document.addEventListener("click", handleClickoutOptions);
		return () => {
			document.removeEventListener("click", handleClickoutOptions);
		};
	}, []);
	return (
		<div className="w-main h-[110px] py-[35px] flex justify-between">
			<Link to={`/${path.HOME}`}>
				<img src={logo} alt="logo" className="w-[80px] h-[80px] object-contain"></img>
			</Link>
			<div className="flex text-[13px]">
				<div className="flex flex-col px-6 border-r">
					<span className="font-semibold flex gap-3  items-center">
						<BsFillTelephoneFill color="#79AC78" />
						(+1800) 000 8808
					</span>
					<span>Mon-Sat 9:00AM - 8:00PM</span>
				</div>
				<div className="flex flex-col px-6 border-r">
					<span className="font-semibold flex gap-3 items-center">
						<IoMdMail color="#79AC78" />
						SUPPORT@TADATHEMES.COM
					</span>
					<span className="text-center">Online Support 24/7</span>
				</div>
				<div className="flex items-center justify-center gap-3 px-6 border-r cursor-pointer">
					<BsBagCheckFill color="#79AC78" size={20} />
					<span className="hover:text-[#79AC78]">0 item</span>
				</div>
				{/* to={+current?.role === 2001 ? `/${path.ADMIN}/${path.DASHBOARD}` : `/${path.MEMBER}/${path.PERSONAL}`} */}

				{current && (
					<div className="flex items-center justify-center px-6 gap-3 cursor-pointer relative" id="profile">
						<span
							onClick={() => {
								setIsShowOptions(!isShowOptions);
							}}
						>
							<FaUserAlt size={18} color="#79AC78" />
						</span>
						{isShowOptions && (
							<div
								className="absolute top-full left-4 bg-gray-100 w-full min-w-[150px] flex flex-col"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								<Link to={`/${path.MEMBER}/${path.PERSONAL}`} className="p-2 hover:bg-gray-200 border border-b-0">
									Thông tin cá nhân
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
									className="p-2 hover:bg-gray-200 border"
								>
									Đăng xuất
								</span>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default memo(Header);
