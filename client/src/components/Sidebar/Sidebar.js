import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "utils/helpers";
import { useSelector } from "react-redux";
const Sidebar = () => {
	const { categories } = useSelector((state) => state.app);
	return (
		<div className="md:flex flex-col border mb-3 font-medium hidden">
			{categories?.map((el) => (
				<NavLink
					to={el.title}
					key={createSlug(el.title)}
					className={({ isActive }) =>
						isActive
							? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
							: "px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
					}
				>
					{el.title}
				</NavLink>
			))}
		</div>
	);
};

export default memo(Sidebar);
