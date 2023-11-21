import React, { memo, useEffect, useState } from "react";
import logo from "assets/logo.png";
import icons from "utils/icons";
import { Link, useSearchParams } from "react-router-dom";
import { apiGetProducts } from "apis";
import clsx from "clsx";
import InputField from "components/Inputs/InputField";
import useDebounce from "hooks/useDebounce";
import path from "utils/path";
import { useSelector } from "react-redux";
import withBaseComponent from "hocs/withBaseComponent";
import { showCart, showWishList } from "store/app/appSlice";

import { formatMoney, formatPrice } from "utils/helpers";

const Header = ({ dispatch, navigate }) => {
	const { current } = useSelector((state) => state.user);
	const { BsFillTelephoneFill, IoMdMail, IoBagCheckOutline, AiOutlineHeart, AiFillHeart, IoBagCheck } = icons;
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
		<div className="md:w-main md:h-[110px] md:py-[35px] md:flex md:justify-between justify-center w-full">
			<div className="w-full md:hidden block">
				<h2 className="font-bold md:border-b uppercase border-gray-500 text-xl flex justify-between h-full ">
					<div className="mx-auto font-medium">
						<InputField
							isHideLabel
							nameKey={"q"}
							value={queries.q}
							setValue={setQueries}
							style={clsx("md:py-[12px] mt-[16px] border-none text-black")}
							placeholder="Tìm kiếm sản phẩm ..."
						/>
						{queriesDebounce && (
							<div className="absolute left-0 top-[16%] w-full mt-4 shadow-lg bg-white border border-gray-300 z-100 overflow-y-auto max-h-[500px]">
								{products?.map((el) => (
									<div
										key={el._id}
										className="flex p-4 border-b cursor-pointer hover:bg-gray-200"
										onClick={(e) => {
											e.stopPropagation();
											navigate(`/products/${el?.category[0]}/${el?._id}/${el?.title}`);
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
			</div>
			<Link to={`/${path.HOME}`}>
				<img src={logo} alt="logo" className="w-[80px] h-[80px] object-contain hidden md:block"></img>
			</Link>
			<div className="flex text-[13px] md:pt-0 pt-2">
				<div className="md:flex flex-col px-6  border-r hidden">
					<span className="font-semibold flex gap-3  items-center">
						<BsFillTelephoneFill color="#79AC78" />
						(+84) 9009 9999
					</span>
					<span>T2-T7 9:00AM - 8:00PM</span>
				</div>
				<div className="flex flex-col px-6 border-r">
					<span className="font-semibold flex gap-3 items-center">
						<IoMdMail color="#79AC78" />
						SUPPORT@THPHAT.COM
					</span>
					<span className="text-center">Dịch vụ hỗ trợ 24/7</span>
				</div>
				{current && (
					<>
						{current.wishList.length > 0 ? (
							<div
								className="flex items-center justify-center gap-3 px-6 border-r cursor-pointer"
								onClick={() => {
									dispatch(showWishList());
								}}
							>
								<AiFillHeart color="#79AC78" size={20} />
							</div>
						) : (
							<div
								className="flex items-center justify-center gap-3 px-6 border-r cursor-pointer"
								onClick={() => {
									dispatch(showWishList());
								}}
							>
								<AiOutlineHeart color="#79AC78" size={20} />
							</div>
						)}
						<div
							className="flex items-center justify-center gap-3 px-6 border-r cursor-pointer"
							onClick={() => {
								dispatch(showCart());
							}}
						>
							{current?.cart.length === 0 ? (
								<IoBagCheckOutline color="#79AC78" size={20} />
							) : (
								<IoBagCheck color="#79AC78" size={20} />
							)}

							<span className="hover:text-[#79AC78] pt-1 hidden md:block">{`${
								current?.cart?.length || 0
							} sản phẩm`}</span>

							<span className="hover:text-[#79AC78] pt-1 block md:hidden">{`${current?.cart?.length || 0}`}</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default withBaseComponent(memo(Header));
