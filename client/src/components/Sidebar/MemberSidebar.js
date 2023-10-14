import React, { memo, Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import { useSelector } from "react-redux";

import { memberSidebar } from "utils/contants";
import avatar from "assets/avatarDefault.jpg";
const activedStyle = "px-4 py-2 flex items-center gap-2 bg-[#B0D9B1] font-medium w-full";
const notActivedStyle = "px-4 py-2 flex items-center gap-2 font-medium w-full hover:bg-gray-200";
const MemberSidebar = () => {
	const [actived, setActived] = useState([]);
	const { current } = useSelector((state) => state.user);

	const handleShowTab = (tabId) => {
		if (actived.some((el) => el === tabId)) setActived((prev) => prev.filter((el) => el !== tabId));
		else setActived((prev) => [...prev, tabId]);
	};

	return (
		<div className="bg-white h-full py-4 w-[250px] flex-none">
			<div className="flex items-center flex-col justify-center gap-2 py-4">
				<img src={current?.avatar || avatar} alt="logo" className="w-16 h-16 object-cover rounded-full" />
				<small className="text-sm font-medium">{`${current?.firstName} ${current?.lastName}`}</small>
			</div>
			<div>
				{memberSidebar.map((el) => (
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

export default memo(MemberSidebar);
