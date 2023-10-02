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
		title: "Bảo hành",
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
export const productInfoTabs = [
	{
		id: 1,
		name: "Mô tả",
		content: `Công nghệ: GSM/HSPA/LTE 
		Kích thước: 144,6 x 69,2 x 7,3 mm 
		Trọng lượng: 129 g 
		Màn hình: IPS LCD 5,15 inch 
		Độ phân giải: 1080 x 1920 OS: Android OS, v6.0 (Marshmallow) 
		Chipset: Snapdragon 820 CPU: Quad-core Bên trong: 32GB/64GB/128GB Camera: 16 MP, f/2.0 - 4 MP, f/2.0`,
	},
	{
		id: 2,
		name: "Bảo hành",
		content: `WARRANTY INFORMATION
		LIMITED WARRANTIES
		Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
		
		Frames Used In Upholstered and Leather Products
		Limited Lifetime Warranty
		A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
	},
	{
		id: 3,
		name: "Vận chuyển",
		content: `DELIVERY
		Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
		Picking up at the store
		Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.`,
	},
	{
		id: 4,
		name: "Thanh toán",
		content: `PURCHASING
		Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
		Picking up at the store
		Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.`,
	},
	{
		id: 5,
		name: "Phản hồi khách hàng",
		content: `hehe`,
	},
];
export const colors = [
	"black",
	"brown",
	"grey",
	"white",
	"pink",
	"yellow",
	"orange",
	"purple",
	"green",
	"blue",
];
