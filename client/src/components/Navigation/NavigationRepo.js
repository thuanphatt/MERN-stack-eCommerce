import { apiGetProducts } from "apis";
import clsx from "clsx";
import InputField from "components/Inputs/InputField";
import withBaseComponent from "hocs/withBaseComponent";
import useDebounce from "hooks/useDebounce";
import React, { memo, useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { formatMoney, formatPrice } from "utils/helpers";
import { navigation } from "utils/contants";
import path from "utils/path";
import logo from "assets/logo.png";
import { showMenuRepo } from "store/app/appSlice";

const NavigationRepo = ({ navigate, dispatch }) => {
	const [products, setProducts] = useState(null);

	const [queries, setQueries] = useState({
		q: "",
	});
	const fetchProducts = async (params) => {
		const response = await apiGetProducts({ ...params, limit: process.env.REACT_APP_LIMIT });
		if (response.success) setProducts(response.products);
	};

	const [params] = useSearchParams();
	const queriesDebounce = useDebounce(queries.q, 800);
	useEffect(() => {
		const queries = Object.fromEntries([...params]);

		if (queriesDebounce) queries.q = queriesDebounce;
		fetchProducts(queries);
	}, [queriesDebounce, params]);
	return (
		<div className="w-[350px] h-screen bg-black text-white animate-slide-right" onClick={(e) => e.stopPropagation()}>
			<div className="w-[350px] h-screen bg-black text-white p-8" onClick={(e) => e.stopPropagation()}>
				<Link to={`/${path.HOME}`} className="flex items-center justify-center">
					<img src={logo} alt="logo" className="w-[80px] h-[80px] object-cover block md:hidden"></img>
				</Link>
				<h2 className="font-bold border-b uppercase border-gray-500 text-xl flex justify-between h-full">
					<div className="relative mx-auto font-medium">
						<InputField
							isHideLabel
							nameKey={"q"}
							value={queries.q}
							setValue={setQueries}
							style={clsx("py-[12px] mt-[16px] border-none text-black")}
							placeholder="Tìm kiếm sản phẩm ..."
						/>
						{queriesDebounce && (
							<div className="absolute w-full  mt-4 shadow-lg bg-white border border-gray-300 z-100 overflow-y-auto max-h-[500px]">
								{products?.map((el) => (
									<div
										key={el._id}
										className="flex p-4 border-b cursor-pointer hover:bg-gray-200"
										onClick={(e) => {
											e.stopPropagation();
											navigate(`/${el?.category[0]}/${el?._id}/${el?.title}`);
											queries.q = "";
										}}
									>
										<img src={el.thumb} alt="Ảnh sản phẩm" className="w-[80px] h-[80px] object-contain" key={el._id} />
										<div className="flex flex-col gap-2 ml-4">
											<span className="font-medium text-sm text-main truncate max-w-[200px]">{el.title}</span>
											<span className="text-sm">{el.color}</span>
											<span className="text-sm">{`${formatMoney(formatPrice(el.price))} VND`}</span>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</h2>
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
