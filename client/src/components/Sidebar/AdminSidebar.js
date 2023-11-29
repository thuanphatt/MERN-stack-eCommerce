import React, { memo, Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";

import logo from "assets/logo.png";
import { adminSidebar } from "utils/contants";
import path from "utils/path";
import { AiOutlineMenu } from "react-icons/ai";
import { showAdminSidebarRepo } from "store/app/appSlice";
import { useSelector } from "react-redux";
import AdminSidebarRepo from "./AdminSidebarRepo";
import withBaseComponent from "hocs/withBaseComponent";
const activedStyle = "px-4 py-2 flex items-center gap-2 bg-[#B0D9B1] font-medium w-full";
const notActivedStyle = "px-4 py-2 flex items-center gap-2 font-medium w-full hover:bg-gray-200";
const AdminSidebar = ({ dispatch, navigate }) => {
	const [actived, setActived] = useState([]);
	const { current } = useSelector((state) => state.user);
	const { isShowAdminSidebarRepo } = useSelector((state) => state.app);
	const handleShowTab = (tabId) => {
		if (actived.some((el) => el === tabId)) setActived((prev) => prev.filter((el) => el !== tabId));
		else setActived((prev) => [...prev, tabId]);
	};
	return (
		<div className="bg-white h-full py-4 overflow-y-auto">
			<Link className="md:flex flex-col justify-center gap-2 items-center p-4 hidden" to={`/${path.HOME}`}>
				<img src={logo} alt="logo" className="w-[100px] object-contain " />
			</Link>
			<div
				className="flex items-center gap-2 justify-center pb-2 cursor-pointer hover:opacity-70"
				onClick={() => {
					navigate(`/${path.MEMBER}/${path.PERSONAL}`);
				}}
			>
				<img src={current?.avatar} alt={current?.firstName} className="w-8 h-8 object-contain rounded-full" />
				<small className="font-semibold text-main">{`${current?.firstName} ${current?.lastName}`}</small>
			</div>
			{isShowAdminSidebarRepo && (
				<div
					className="bg-overlay z-50 absolute inset-0 flex justify-start h-full w-full md:hidden"
					onClick={() => {
						dispatch(showAdminSidebarRepo());
					}}
				>
					<AdminSidebarRepo />
				</div>
			)}
			<span
				className="md:hidden block pl-2"
				onClick={() => {
					dispatch(showAdminSidebarRepo());
				}}
			>
				<AiOutlineMenu size={22} />
			</span>

			<div className="md:block hidden">
				{adminSidebar.map((el) => (
					<Fragment key={el.id}>
						{el.type === "SINGLE" && (
							<NavLink
								to={el.path}
								className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
							>
								<span> {el.icon}</span>
								<span> {el.text}</span>
							</NavLink>
						)}
						{el.type === "PARENT" && (
							<div
								className="flex flex-col items-start text-grey-200 font-medium"
								onClick={() => {
									handleShowTab(+el.id);
								}}
							>
								<div className="flex items-center px-4 py-2 hover:bg-gray-300 w-full justify-between cursor-pointer">
									<div className="flex items-center gap-2">
										<span> {el.icon}</span>
										<span> {el.text}</span>
									</div>
									{actived.some((id) => id === el.id) ? (
										<BiSolidRightArrow size={14} />
									) : (
										<BiSolidDownArrow size={14} />
									)}
								</div>
								{actived.some((id) => +id === +el.id) && (
									<div className="flex flex-col w-full">
										{el.submenu.map((item) => (
											<NavLink
												key={item.text}
												to={item.path}
												onClick={(e) => e.stopPropagation()}
												className={({ isActive }) =>
													clsx(isActive && activedStyle, !isActive && notActivedStyle, "pl-10")
												}
											>
												<span> {item.icon}</span>
												<span> {item.text}</span>
											</NavLink>
										))}
									</div>
								)}
							</div>
						)}
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default withBaseComponent(memo(AdminSidebar));
