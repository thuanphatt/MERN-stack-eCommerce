import withBaseComponent from "hocs/withBaseComponent";

import React, { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { navigation } from "utils/contants";
import path from "utils/path";
import logo from "assets/logo.png";
import { showMenuRepo } from "store/app/appSlice";

const NavigationRepo = ({ dispatch }) => {
	return (
		<div className="w-[350px] h-screen bg-black text-white animate-slide-right" onClick={(e) => e.stopPropagation()}>
			<div className="w-[350px] h-screen bg-black text-white p-8" onClick={(e) => e.stopPropagation()}>
				<Link to={`/${path.HOME}`} className="flex items-center justify-center">
					<img src={logo} alt="logo" className="w-[80px] h-[80px] object-cover block md:hidden"></img>
				</Link>
				<div className="flex flex-col gap-4	items-start w-full h-full absolute top-[20%] p-4">
					{navigation.map((el) => (
						<NavLink
							to={el.path}
							key={el.id}
							className={({ isActive }) =>
								isActive
									? "pr-[30px] hover:text-main text-main text-xl font-semibold"
									: "pr-[30px] hover:text-main text-xl font-semibold"
							}
							onClick={() => {
								dispatch(showMenuRepo());
							}}
						>
							{el.value}
						</NavLink>
					))}
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(NavigationRepo));
