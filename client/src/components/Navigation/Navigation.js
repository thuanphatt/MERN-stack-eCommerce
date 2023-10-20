import React, { memo, useEffect, useState } from "react";
import { navigation } from "utils/contants";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import InputField from "components/Inputs/InputField";

import { apiGetProducts } from "apis";
import useDebounce from "hooks/useDebounce";
import clsx from "clsx";
import { formatMoney, formatPrice } from "utils/helpers";

const Navigation = () => {
	const [products, setProducts] = useState(null);
	const navigate = useNavigate();
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
		<div className="border-y w-main h-[48px] py-4 flex items-center text-sm">
			{navigation.map((el) => (
				<NavLink
					to={el.path}
					key={el.id}
					className={({ isActive }) => (isActive ? "pr-[30px] hover:text-main text-main" : "pr-[30px] hover:text-main")}
				>
					{el.value}
				</NavLink>
			))}
			<div className="relative ml-auto">
				<InputField
					isHideLabel
					nameKey={"q"}
					value={queries.q}
					setValue={setQueries}
					style={clsx("min-w-[300px] py-[12px] mt-[16px] border-none")}
					placeholder="Tìm kiếm sản phẩm ..."
				/>
				{queriesDebounce && (
					<div className="absolute right-0 w-[350px] mt-4 shadow-lg bg-white border border-gray-300 z-100 overflow-y-auto max-h-[500px]">
						{products?.map((el) => (
							<div
								key={el._id}
								className="flex p-4 border-b cursor-pointer"
								onClick={(e) => {
									e.stopPropagation();
									navigate(`/${el?.category[0]}/${el?._id}/${el?.title}`);
									queries.q = "";
								}}
							>
								<img src={el.thumb} alt="Ảnh sản phẩm" className="w-16 h-16 object-cover" key={el._id} />
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
		</div>
	);
};

export default memo(Navigation);
