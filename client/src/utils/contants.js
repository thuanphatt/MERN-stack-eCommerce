import path from "./path";
import icons from "./icons";
import banner1 from "assets/banner1.png";
import banner2 from "assets/banner2.png";
import banner3 from "assets/banner3.png";
const {
	FaShieldAlt,
	AiFillHome,
	AiFillGift,
	BsFillReplyFill,
	FaTty,
	BiSolidDashboard,
	MdGroups2,
	MdManageSearch,
	RiBillFill,
	IoIosCreate,
	BsBagCheckFill,
	AiFillInfoCircle,
	BiSolidCategoryAlt,
	AiOutlineHistory,
	AiFillHeart,
	SiSimpleanalytics,
	MdLocalShipping,
} = icons;
export const navigation = [
	{
		id: 0,
		value: "TRANG CHỦ",
		path: path.HOME,
	},
	{
		id: 1,
		value: "SẢN PHẨM",
		path: path.PRODUCTS,
	},
	{
		id: 2,
		value: "BLOG",
		path: path.BLOGS,
	},
	{
		id: 3,
		value: "FAQs",
		path: path.FAQs,
	},
	{
		id: 4,
		value: "DỊCH VỤ",
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
		icon: <BsBagCheckFill size={20} />,
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
		content: `
		Hạn chế Bảo hành không được chuyển nhượng. Các Bảo hành có giới hạn sau đây được cung cấp cho người mua lẻ ban đầu của Ashley Furniture Industries, Inc. Các sản phẩm sau: Khung được sử dụng trong các sản phẩm bọc và da Bảo hành trọn đời có giới hạn Bảo hành có giới hạn trọn đời áp dụng cho tất cả các khung được sử dụng trong ghế sofa, ghế dài, ghế tình yêu, bọc nệm ghế, ghế dài có đệm, mặt cắt và giường ngủ. Ashley Furniture Industries, Inc. đảm bảo các thành phần này cho bạn, người mua lẻ ban đầu, không có lỗi sản xuất vật liệu
		`,
	},
	{
		id: 3,
		name: "Vận chuyển",
		content: `Trước khi mua hàng, bạn nên biết số đo của khu vực bạn dự định đặt đồ nội thất. Bạn cũng nên đo bất kỳ ô cửa và hành lang nào mà đồ đạc sẽ đi qua để đến đích cuối cùng. Việc nhận hàng tại cửa hàng Shopify Shop yêu cầu tất cả các sản phẩm đều phải được kiểm tra kỹ lưỡng TRƯỚC KHI bạn mang về nhà để đảm bảo không có bất ngờ nào xảy ra. Nhóm của chúng tôi sẵn lòng mở tất cả các gói hàng và sẽ hỗ trợ trong quá trình kiểm tra. Sau đó chúng tôi sẽ niêm phong lại các gói hàng để vận chuyển an toàn. Chúng tôi khuyến khích tất cả khách hàng mang theo đệm hoặc chăn để bảo vệ đồ đạc trong quá trình vận chuyển cũng như dây thừng hoặc dây buộc. Shopify Shop sẽ không chịu trách nhiệm về những hư hỏng xảy ra sau khi rời khỏi cửa hàng hoặc trong quá trình vận chuyển. Trách nhiệm của người mua là đảm bảo rằng các mặt hàng được nhận đúng và ở trong tình trạng tốt
		`,
	},
	{
		id: 4,
		name: "Thanh toán",
		content: `Sau đó chúng tôi sẽ niêm phong lại các gói hàng để vận chuyển an toàn. Chúng tôi khuyến khích tất cả khách hàng mang theo đệm hoặc chăn để bảo vệ đồ đạc trong quá trình vận chuyển cũng như dây thừng hoặc dây buộc. Shopify Shop sẽ không chịu trách nhiệm về những hư hỏng xảy ra sau khi rời khỏi cửa hàng hoặc trong quá trình vận chuyển. Trách nhiệm của người mua là đảm bảo rằng các mặt hàng được nhận đúng và ở trong tình trạng tốt
		`,
	},
];
export const colors = ["đen", "xanh", "trắng", "cam", "xám", "đỏ"];
export const brands = ["g", "GY", "RG", "XAG", "NX", "30S", "GC", "IFC"];
export const sorts = [
	{
		id: 1,
		value: "-sold",
		text: "Bán chạy nhất",
	},
	{
		id: 2,
		value: "-title",
		text: "Theo chữ cái A-Z",
	},
	{
		id: 3,
		value: "title",
		text: "Theo chữ cái Z-A",
	},
	{
		id: 4,
		value: "price",
		text: "Giá, từ thấp đến cao",
	},
	{
		id: 5,
		value: "-price",
		text: "Giá, từ cao đến thấp",
	},
	{
		id: 6,
		value: "-createdAt",
		text: "Ngày, từ mới đến cũ",
	},
	{
		id: 7,
		value: "createdAt",
		text: "Ngày, từ cũ đến mới",
	},
];
export const voteOptions = [
	{
		id: 1,
		text: "Rất tệ",
	},
	{
		id: 2,
		text: "Tệ",
	},
	{
		id: 3,
		text: "Thường",
	},
	{
		id: 4,
		text: "Tốt",
	},
	{
		id: 5,
		text: "Rất tốt",
	},
];
export const adminSidebar = [
	{
		id: 1,
		type: "SINGLE",
		text: "Dashboard",
		path: `/${path.ADMIN}/${path.DASHBOARD}`,
		icon: <BiSolidDashboard size={20} />,
	},
	{
		id: 2,
		type: "SINGLE",
		text: "Quản lý người dùng",
		path: `/${path.ADMIN}/${path.MANAGE_USER}`,
		icon: <MdGroups2 size={20} />,
	},
	{
		id: 3,
		type: "PARENT",
		text: "Quản lý sản phẩm",
		icon: <MdManageSearch size={20} />,
		submenu: [
			{ text: "Tạo sản phẩm", path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`, icon: <IoIosCreate size={20} /> },
			{
				text: "Quản lý sản phẩm",
				path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
				icon: <MdManageSearch size={20} />,
			},
		],
	},
	{
		id: 4,
		type: "SINGLE",
		text: "Quản lý đơn hàng",
		path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
		icon: <RiBillFill size={20} />,
	},
	{
		id: 5,
		type: "PARENT",
		text: "Quản lý danh mục",

		icon: <BiSolidCategoryAlt size={20} />,
		submenu: [
			{ text: "Tạo danh mục", path: `/${path.ADMIN}/${path.CREATE_CATEGORY}`, icon: <IoIosCreate size={20} /> },
			{
				text: "Quản lý danh mục",
				path: `/${path.ADMIN}/${path.MANAGE_CATEGORY}`,
				icon: <BiSolidCategoryAlt size={20} />,
			},
		],
	},

	{
		id: 6,
		type: "PARENT",
		text: "Quản lý phí vận chuyển",

		icon: <MdLocalShipping size={20} />,
		submenu: [
			{ text: "Tạo phí vận chuyển", path: `/${path.ADMIN}/${path.CREATE_SHIP}`, icon: <IoIosCreate size={20} /> },
			{
				text: "Quản lý phí vận chuyển",
				path: `/${path.ADMIN}/${path.MANAGE_SHIP}`,
				icon: <MdLocalShipping size={20} />,
			},
		],
	},
	{
		id: 7,
		type: "SINGLE",
		text: "Thống kê doanh thu",
		path: `/${path.ADMIN}/${path.REVENUE_STATISTICS}`,
		icon: <SiSimpleanalytics size={20} />,
	},
];
export const memberSidebar = [
	{
		id: 1,
		type: "SINGLE",
		text: "Trang chủ",
		path: `/${path.HOME}`,
		icon: <AiFillHome size={20} />,
	},
	{
		id: 2,
		type: "SINGLE",
		text: "Thông tin cá nhân",
		path: `/${path.MEMBER}/${path.PERSONAL}`,
		icon: <AiFillInfoCircle size={20} />,
	},
	{
		id: 3,
		type: "SINGLE",
		text: "Giỏ hàng của tôi",
		path: `/${path.MEMBER}/${path.MYCART}`,
		icon: <BsBagCheckFill size={20} />,
	},
	{
		id: 4,
		type: "SINGLE",
		text: "Lịch sử mua hàng",
		path: `/${path.MEMBER}/${path.BUY_HISTORY}`,
		icon: <AiOutlineHistory size={20} />,
	},
	{
		id: 5,
		type: "SINGLE",
		text: "Danh sách yêu thích",
		path: `/${path.MEMBER}/${path.WISHLIST}`,
		icon: <AiFillHeart size={20} />,
	},
];

export const roles = [
	{
		code: 2001,
		value: "Admin",
	},
	{
		code: 2000,
		value: "Người dùng",
	},
];

export const blockStatus = [
	{
		code: true,
		value: "Bị khóa",
	},
	{
		code: false,
		value: "Hoạt động",
	},
];
export const statusOrder = [
	{
		code: 0,
		value: "Đã hủy",
	},
	{
		code: 1,
		value: "Đang xử lý",
	},
	{
		code: 2,
		value: "Đang giao",
	},
	{
		code: 3,
		value: "Thành công",
	},
];
export const typePayment = [
	{
		code: 1,
		value: "Thanh toán khi nhận hàng",
	},
	{
		code: 2,
		value: "Thanh toán qua Paypal",
	},
];
export const srcImg = [
	{
		id: 2,
		src: banner2,
	},
	{
		id: 1,
		src: banner1,
	},
	{
		id: 3,
		src: banner3,
	},
];
export const feedbackUser = [
	{
		id: 1,
		src: "https://globalcheck.com.vn/apt-upload/image/data/web/review-khach-hang-02-(1).png",
	},
	{
		id: 2,
		src: "https://globalcheck.com.vn/apt-upload/image/data/baner-(2).png",
	},
	{
		id: 3,
		src: "https://globalcheck.com.vn/apt-upload/image/data/baner.png",
	},
];
