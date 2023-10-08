import React from "react";
import logo from "../../assets/logo.png";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import path from "../../utils/path";

const Header = () => {
	const { BsFillTelephoneFill, IoMdMail, FaUserAlt, BsBagCheckFill } = icons;
	return (
		<div className="w-main h-[110px] py-[35px] flex justify-between">
			<Link to={`/${path.HOME}`}>
				<img src={logo} alt="logo" className="w-[80px] h-[80px] object-contain"></img>
			</Link>
			<div className="flex text-[13px]">
				<div className="flex flex-col px-6 border-r">
					<span className="font-semibold flex gap-3  items-center">
						<BsFillTelephoneFill color="#79AC78" />
						(+1800) 000 8808
					</span>
					<span>Mon-Sat 9:00AM - 8:00PM</span>
				</div>
				<div className="flex flex-col px-6 border-r">
					<span className="font-semibold flex gap-3 items-center">
						<IoMdMail color="#79AC78" />
						SUPPORT@TADATHEMES.COM
					</span>
					<span className="text-center">Online Support 24/7</span>
				</div>
				<div className="flex items-center justify-center gap-3 px-6 border-r cursor-pointer">
					<BsBagCheckFill color="#79AC78" size={20} />
					<span className="hover:text-[#79AC78]">0 item</span>
				</div>
				<div className="flex items-center justify-center px-6 gap-3 cursor-pointer">
					<FaUserAlt size={18} color="#79AC78" />
					<span className="hover:text-[#79AC78]">Profile</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
