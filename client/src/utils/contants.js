import path from "./path";
import icons from "./icons";
const { FaShieldAlt, MdLocalShipping, AiFillGift, BsFillReplyFill, FaTty } =
	icons;
export const navigation = [
	{
		id: 0,
		value: "HOME",
		path: path.HOME,
	},
	{
		id: 1,
		value: "PRODUCTS",
		path: path.PRODUCTS,
	},
	{
		id: 2,
		value: "BLOGS",
		path: path.BLOGS,
	},
	{
		id: 3,
		value: "FAQs",
		path: path.FAQs,
	},
	{
		id: 4,
		value: "OUR SERVICES",
		path: path.OUR_SERVICES,
	},
];
export const productExtraInfo = [
	{
		id: 1,
		title: "Bảo đảm",
		sub: "Đã kiểm tra chất lượng",
		icon: <FaShieldAlt size={20} />,
	},
	{
		id: 2,
		title: "Free Shipping",
		sub: "Miễn phí trên tất cả các sản phẩm",
		icon: <MdLocalShipping size={20} />,
	},
	{
		id: 3,
		title: "Thẻ quà tặng đặc biệt",
		sub: "Thẻ quà tặng đặc biệt",
		icon: <AiFillGift size={20} />,
	},
	{
		id: 4,
		title: "Hoàn trả miễn phí",
		sub: "Trong vòng 7 ngày",
		icon: <BsFillReplyFill size={20} />,
	},
	{
		id: 5,
		title: "Tư vấn",
		sub: "Sẵn sàng 24/24",
		icon: <FaTty size={20} />,
	},
];
