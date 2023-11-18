import clsx from "clsx";
import React, { Fragment, memo, useState } from "react";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import logo from "assets/logo.png";
import { adminSidebar } from "utils/contants";
import path from "utils/path";
import { showAdminSidebarRepo } from "store/app/appSlice";
import withBaseComponent from "hocs/withBaseComponent";
const activedStyle = "px-4 py-2 flex items-center gap-2 bg-[#B0D9B1] font-medium w-full text-black";
const notActivedStyle = "px-4 py-2 flex items-center gap-2 font-medium w-full hover:bg-gray-200";
const AdminSidebarRepo = ({ dispatch }) => {
	const [actived, setActived] = useState([]);
	const handleShowTab = (tabId) => {
		if (actived.some((el) => el === tabId)) {
			setActived((prev) => prev.filter((el) => el !== tabId));
		} else {
			setActived((prev) => [...prev, tabId]);
		}
	};
	return (
		<div className="w-[350px] h-screen bg-white text-black animate-slide-right" onClick={(e) => e.stopPropagation()}>
			<div>
				<Link className="flex flex-col justify-center gap-2 items-center p-4 " to={`/${path.HOME}`}>
					<img src={logo} alt="logo" className="w-[100px] object-contain " />
					<small className="font-semibold">Quản trị viên</small>
				</Link>
				{adminSidebar.map((el) => (
					<Fragment key={el.id}>
						{el.type === "SINGLE" && (
							<NavLink
								to={el.path}
								className={({ isActive }) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
								onClick={() => {
									dispatch(showAdminSidebarRepo());
								}}
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
								<div className="flex items-center px-4 py-2 md:hover:bg-gray-300 w-full justify-between cursor-pointer">
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
												className={({ isActive }) =>
													clsx(isActive && activedStyle, !isActive && notActivedStyle, "pl-10")
												}
												onClick={() => {
													dispatch(showAdminSidebarRepo());
												}}
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

export default withBaseComponent(memo(AdminSidebarRepo));
