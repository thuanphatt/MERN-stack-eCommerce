import React, { memo } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createSlug } from "utils/helpers";
import icons from "utils/icons";
const { IoMdMail } = icons;
const Footer = () => {
	const { categories } = useSelector((state) => state.app);
	return (
		<div className="w-full">
			<div className="flex justify-center items-center h-[103px] bg-main md:px-0 px-4">
				<div className="w-main flex justify-between items-center">
					<div className="flex flex-col flex-1">
						<span className="text-[20px] text-gray-200">ĐĂNG KÝ BẢN TIN</span>
						<small className="text-[13px] text-gray-900 md:block hidden">Đăng ký ngay và nhận bản tin hàng tuần</small>
					</div>
					<div className="flex-1 flex items-center">
						<input
							type="email"
							className="rounded-l-full p-4 pr-0 w-full bg-[#D0E7D2] outline-none text-black placeholder:text-sm placeholder:text-gray-800 placeholder:opacity-70"
							placeholder="Địa chỉ email"
						></input>
						<div className="w-[56px] h-[56px] bg-[#D0E7D2] rounded-r-full flex items-center justify-center text-black">
							<IoMdMail size={16} />
						</div>
					</div>
				</div>
			</div>
			<div className="md:h-[407px] bg-gray-900 w-full flex justify-center items-center text-white text-[13px] h-full">
				<div className="w-main md:flex md:mt-0 mt-6 flex items-start flex-col md:flex-row md:gap-0 gap-4 md:px-0 px-4">
					<div className="flex-2 flex-col gap-2 flex ">
						<h2 className="mb-[20px] md:text-[15px] text-[18px] font-medium border-main border-l-4 pl-4 uppercase">
							Về chúng tôi
						</h2>
						<span className="flex items-center gap-1 md:text-[14px] text-[16px] ">
							<FaMapMarkerAlt size={14} />
							<span>Địa chỉ:</span>
							<span className="opacity-50">Vĩnh Long, Việt Nam</span>
						</span>
						<span className="flex items-center gap-1 md:text-[14px] text-[16px]">
							<FaPhoneAlt size={12} />
							<span>Hotline: </span>
							<span className="opacity-50">(+1234)56789xxx</span>
						</span>
						<span className="flex items-center gap-1 md:text-[14px] text-[16px]">
							<IoMdMail size={14} />
							<span>Email: </span>
							<span className="opacity-50">thphatt@gmail.com</span>
						</span>
						<span className="flex items-center gap-2 mt-[20px] md:justify-normal justify-between">
							<a href="https://www.facebook.com/nthuanphatt/" className="p-4 rounded-md shadow-md text-white bg-main">
								<FaFacebook size={16} />
							</a>
							<a href="https://www.facebook.com/nthuanphatt/" className="p-4 rounded-md shadow-md text-white bg-main">
								<FaTwitter size={16} />
							</a>
							<a href="https://www.facebook.com/nthuanphatt/" className="p-4 rounded-md shadow-md text-white bg-main">
								<FaLinkedin size={16} />
							</a>
							<a href="https://www.facebook.com/nthuanphatt/" className="p-4 rounded-md shadow-md text-white bg-main">
								<IoMdMail size={16} />
							</a>
						</span>
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<h2 className="mb-[20px] md:text-[15px] text-[18px] font-medium border-main border-l-4 pl-4 uppercase">
							Sản phẩm
						</h2>
						{categories?.slice(0, 5).map((el) => (
							<NavLink to={el.title} key={createSlug(el.title)}>
								<span className="opacity-50 md:text-[14px] text-[16px]"> {el.title}</span>
							</NavLink>
						))}
					</div>
					<div className="flex-1 flex flex-col gap-2 md:text-[14px] text-[16px]">
						<h2 className="mb-[20px] md:text-[15px] text-[18px] font-medium border-main border-l-4 pl-4">
							CHÍNH SÁCH DỊCH VỤ
						</h2>
						<span className="opacity-50">Chính sách bảo vệ thông tin cá nhân</span>
						<span className="opacity-50">Chính sách đổi trả</span>
						<span className="opacity-50">Điều Khoản Sử Dụng</span>
						<span className="opacity-50">Chính sách thanh toán</span>
						<span className="opacity-50">Chính sách hoàn tiền</span>
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<h2 className="mb-[20px] md:text-[15px] text-[18px] font-medium border-main border-l-4 pl-4">#THPHAT</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Footer);
