import React, { memo } from "react";
import icons from "../../utils/icons";
const { IoMdMail } = icons;
const Footer = () => {
	return (
		<div className="w-full ">
			<div className="flex justify-center items-center h-[103px] bg-main">
				<div className="w-main flex justify-between items-center">
					<div className="flex flex-col flex-1">
						<span className="text-[20px] text-gray-200">SIGN UP TO NEWSLETTER</span>
						<small className="text-[13px] text-gray-900">Subscribe now and receive weekly newsletter</small>
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
						<h2 className="mb-[20px] text-[15px] font-medium border-main border-l-4 pl-4">ABOUT US</h2>

						<span>
							<span>Address: </span>
							<span className="opacity-50">474 Ontario St Toronto, ON M4X 1M7 Canada</span>
						</span>
						<span>
							<span>Phone: </span>
							<span className="opacity-50">(+1234)56789xxx</span>
						</span>
						<span>
							<span>Mail: </span>
							<span className="opacity-50">tadathemes@gmail.com</span>
						</span>
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<h2 className="mb-[20px] text-[15px] font-medium border-main border-l-4 pl-4">INFORMATION</h2>
						<span className="opacity-50">Typography</span>
						<span className="opacity-50">Gallery</span>
						<span className="opacity-50">Store Location</span>
						<span className="opacity-50">Today's Deals</span>
						<span className="opacity-50">Contact</span>
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<h2 className="mb-[20px] text-[15px] font-medium border-main border-l-4 pl-4">WHO WE ARE</h2>
						<span className="opacity-50">Help</span>
						<span className="opacity-50">Free Shipping</span>
						<span className="opacity-50">FAQs</span>
						<span className="opacity-50">Return & Exchange</span>
						<span className="opacity-50">Testimonials</span>
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<h2 className="mb-[20px] text-[15px] font-medium border-main border-l-4 pl-4">#DIGITALWORLDSTORE</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Footer);
