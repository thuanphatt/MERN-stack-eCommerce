import React, { memo } from "react";
import logo from "assets/logo.png";
import icons from "utils/icons";
import { Link } from "react-router-dom";
import path from "utils/path";
import { useSelector } from "react-redux";
import withBaseComponent from "hocs/withBaseComponent";
import { showCart, showWishList } from "store/app/appSlice";

const Header = ({ dispatch }) => {
	const { current } = useSelector((state) => state.user);
	const { BsFillTelephoneFill, IoMdMail, IoBagCheckOutline, AiOutlineHeart, AiFillHeart, IoBagCheck } = icons;
	return (
		<div className="md:w-main h-[110px] py-[35px] flex md:justify-between justify-center w-full">
			<Link to={`/${path.HOME}`}>
				<img src={logo} alt="logo" className="w-[80px] h-[80px] object-contain hidden md:block"></img>
			</Link>
			<div className="flex text-[13px]">
				<div className="md:flex flex-col px-6 border-r hidden">
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
