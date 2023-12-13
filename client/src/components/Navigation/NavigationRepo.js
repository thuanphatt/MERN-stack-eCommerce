import withBaseComponent from "hocs/withBaseComponent";

import React, { memo, useEffect, useState } from "react";
import { Link, NavLink, createSearchParams, useSearchParams } from "react-router-dom";
import { navigation } from "utils/contants";
import path from "utils/path";
import logo from "assets/logo.png";
import { showMenuRepo } from "store/app/appSlice";
import InputField from "components/Inputs/InputField";
import clsx from "clsx";
import useDebounce from "hooks/useDebounce";
import { FaSearch } from "react-icons/fa";

const NavigationRepo = ({ dispatch, navigate }) => {
	const [queries, setQueries] = useState({
		q: "",
	});
	const [params] = useSearchParams();
	const queriesDebounce = useDebounce(queries.q, 800);
	useEffect(() => {
		const queries = Object.fromEntries([...params]);
		if (queriesDebounce) queries.q = queriesDebounce;
	}, [queriesDebounce, params]);
	return (
		<div className="w-[350px] h-screen bg-gray-100 text-black animate-slide-right" onClick={(e) => e.stopPropagation()}>
			<div className="w-[350px] h-screen bg-gray-100 text-black p-8" onClick={(e) => e.stopPropagation()}>
				<Link to={`/${path.HOME}`} className="flex items-center justify-center">
					<img src={logo} alt="logo" className="w-[80px] h-[80px] object-cover block md:hidden"></img>
				</Link>
				<div className="flex items-center justify-between w-full my-2">
					<InputField
						isHideLabel
						nameKey={"q"}
						value={queries.q}
						setValue={setQueries}
						style={clsx("py-[12px] mt-[16px] border-none text-black min-w-[290px] border-main")}
						placeholder="Tìm kiếm sản phẩm ..."
					/>
					<button
						className="p-3 text-gray-500 cursor-pointer absolute right-[46px]"
						onClick={() => {
							if (queriesDebounce) {
								navigate({
									pathname: `/products/:category/`,
									search: createSearchParams({ q: queriesDebounce }).toString(),
								});
								queries.q = "";
								window.location.reload();
							}
						}}
					>
						<FaSearch />
					</button>
				</div>

				<div className="flex flex-col gap-4	items-start w-full h-full absolute top-[20%] p-4 mt-4">
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
					<Link to={path.LOGIN} className="text-xl font-semibold uppercase">
						Đăng nhập
					</Link>
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(NavigationRepo));
