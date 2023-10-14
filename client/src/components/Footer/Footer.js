import React, { memo } from "react";
import icons from "utils/icons";
const { IoMdMail } = icons;
const Footer = () => {
	return (
		<div className="w-full ">
			<div className="flex justify-center items-center h-[103px] bg-main">
				<div className="w-main flex justify-between items-center">
					<div className="flex flex-col flex-1">
						<span className="text-[20px] text-gray-200">ĐĂNG KÝ BẢN TIN</span>
						<small className="text-[13px] text-gray-900">Đăng ký ngay và nhận bản tin hàng tuần</small>
					</div>
					<div className="flex-1 flex items-center">
						<input
							type="email"
							className="rounded-l-full p-4 pr-0 w-full bg-[#D0E7D2] outline-none text-black placeholder:text-sm placeholder:text-gray-800 placeholder:opacity-70"
							placeholder="Email address"
						></input>
						<div className="w-[56px] h-[56px] bg-[#D0E7D2] rounded-r-full flex items-center justify-center text-black">
							<IoMdMail size={16} />
						</div>
					</div>
				</div>
			</div>
			<div className="h-[407px] bg-gray-900 w-full flex justify-center items-center text-white text-[13px]">
				<div className="w-main flex">
					<div className="flex-2 flex-col gap-2 flex">
						<h2 className="mb-[20px] text-[15px] font-medium border-main border-l-4 pl-4">Về chúng tôi</h2>
						<span>
							<span>Địa chỉ: </span>
							<span className="opacity-50">Vĩnh Long, Việt Nam</span>
						</span>
						<span>
							<span>Hotline: </span>
							<span className="opacity-50">(+1234)56789xxx</span>
						</span>
						<span>
							<span>Email: </span>
							<span className="opacity-50">thphatt@gmail.com</span>
						</span>
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<h2 className="mb-[20px] text-[15px] font-medium border-main border-l-4 pl-4">THÔNG TIN</h2>
						<span className="opacity-50">...</span>
						<span className="opacity-50">...</span>
						<span className="opacity-50">...</span>
						<span className="opacity-50">...</span>
						<span className="opacity-50">...</span>
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<h2 className="mb-[20px] text-[15px] font-medium border-main border-l-4 pl-4">CHÚNG TA LÀ AI</h2>
						<span className="opacity-50">Hỗ trợ</span>
						<span className="opacity-50">Miễn phí giao hàng</span>
						<span className="opacity-50">FAQs</span>
						<span className="opacity-50">Đổi và trả hàng</span>
						<span className="opacity-50">...</span>
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<h2 className="mb-[20px] text-[15px] font-medium border-main border-l-4 pl-4">#THPHAT</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Footer);
