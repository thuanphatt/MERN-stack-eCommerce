import path from "./path";
import icons from "./icons";
const {
	FaShieldAlt,
	BiSolidCoupon,
	IoHomeOutline,
	IoIosInformationCircleOutline,
	AiFillGift,
	BsFillReplyFill,
	FaTty,
	BiSolidDashboard,
	MdGroups2,
	MdManageSearch,
	RiBillFill,
	IoIosCreate,
	BsBagCheckFill,
	BiSolidCategoryAlt,
	AiOutlineHistory,
	IoCartOutline,
	SiSimpleanalytics,
	MdLocalShipping,
	BiLogoBlogger,
	RiCustomerService2Fill,
	MdOutlinePassword,
	AiOutlineEye,
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
		value: "DỊCH VỤ",
		path: path.OUR_SERVICES,
	},
	{
		id: 3,
		value: "TIN TỨC",
		path: path.BLOGS,
	},

	{
		id: 4,
		value: "ĐÀO TẠO",
		path: path.TRAINNING,
	},
	{
		id: 5,
		value: "LIÊN HỆ",
		path: path.CONTACT,
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
		title: "Miễn phí vận chuyển",
		sub: "Miễn phí trên tất cả đơn hàng trên 5,000,000 VND",
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
		content: `Sản phẩm được trang bị camera cảm biến môi trường hai mắt và vòi ly tâm kép cải tiến vượt trội đi đầu thế giới. Sản phẩm có thể tự động tránh chướng ngại vật liên tục và an toàn, đồng thời có thể bay trên địa hình đồi núi dốc lên đến 85 độ và phù hợp với nhiều loại cây trồng như cây vải, nhãn, cam,...`,
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
export const colors = ["đen", "xanh", "trắng", "cam", "xám", "đỏ", "vàng"];
export const brands = [
	"g",
	"GY",
	"RG",
	"XAG",
	"NX",
	"30S",
	"GC",
	"IFC",
	"Azud",
	"ARKA",
	"Greentech",
	"LZ1E",
	"Rainbird",
];
export const sorts = [
	{
		id: 0,
		value: "-sold",
		text: "Bán chạy nhất",
	},
	{
		id: 1,
		value: "-totalRatings",
		text: "Đánh giá cao nhất",
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
		text: "Quản lý danh mục tin tức",

		icon: <BiSolidCategoryAlt size={20} />,
		submenu: [
			{
				text: "Tạo danh mục tin tức",
				path: `/${path.ADMIN}/${path.CREATE_BLOGCATEGORY}`,
				icon: <IoIosCreate size={20} />,
			},
			{
				text: "Quản lý danh mục tin tức",
				path: `/${path.ADMIN}/${path.MANAGE_BLOGCATEGORY}`,
				icon: <BiSolidCategoryAlt size={20} />,
			},
		],
	},

	{
		id: 7,
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
		id: 8,
		type: "SINGLE",
		text: "Thống kê doanh thu",
		path: `/${path.ADMIN}/${path.REVENUE_STATISTICS}`,
		icon: <SiSimpleanalytics size={20} />,
	},
	{
		id: 9,
		type: "PARENT",
		text: "Quản lý tin tức",

		icon: <BiLogoBlogger size={20} />,
		submenu: [
			{ text: "Tạo tin tức", path: `/${path.ADMIN}/${path.CREATE_BLOG}`, icon: <IoIosCreate size={20} /> },
			{
				text: "Quản lý tin tức",
				path: `/${path.ADMIN}/${path.MANAGE_BLOG}`,
				icon: <BiLogoBlogger size={20} />,
			},
		],
	},
	{
		id: 10,
		type: "PARENT",
		text: "Quản lý dịch vụ",

		icon: <RiCustomerService2Fill size={20} />,
		submenu: [
			{ text: "Tạo dịch vụ", path: `/${path.ADMIN}/${path.CREATE_SERVICE}`, icon: <IoIosCreate size={20} /> },
			{
				text: "Quản lý dịch vụ",
				path: `/${path.ADMIN}/${path.MANAGE_SERVICE}`,
				icon: <RiCustomerService2Fill size={20} />,
			},
		],
	},
	{
		id: 11,
		type: "PARENT",
		text: "Quản lý mã giảm giá",

		icon: <BiSolidCoupon size={20} />,
		submenu: [
			{ text: "Tạo mã giảm giá", path: `/${path.ADMIN}/${path.CREATE_COUPON}`, icon: <IoIosCreate size={20} /> },
			{
				text: "Quản lý mã giảm giá",
				path: `/${path.ADMIN}/${path.MANAGE_COUPON}`,
				icon: <BiSolidCoupon size={20} />,
			},
		],
	},
	{
		id: 12,
		type: "PARENT",
		text: "Quản lý banner",

		icon: <BiSolidCategoryAlt size={20} />,
		submenu: [
			{ text: "Tạo banner", path: `/${path.ADMIN}/${path.CREATE_BANNER}`, icon: <IoIosCreate size={20} /> },
			{
				text: "Quản lý banner",
				path: `/${path.ADMIN}/${path.MANAGE_BANNER}`,
				icon: <BiSolidCategoryAlt size={20} />,
			},
		],
	},
];
export const memberSidebar = [
	{
		id: 1,
		type: "SINGLE",
		text: "Trang chủ",
		path: `/${path.HOME}`,
		icon: <IoHomeOutline size={20} />,
	},
	{
		id: 2,
		type: "SINGLE",
		text: "Thông tin cá nhân",
		path: `/${path.MEMBER}/${path.PERSONAL}`,
		icon: <IoIosInformationCircleOutline size={20} />,
	},
	{
		id: 3,
		type: "SINGLE",
		text: "Giỏ hàng của tôi",
		path: `/${path.MEMBER}/${path.MYCART}`,
		icon: <IoCartOutline size={20} />,
	},
	{
		id: 4,
		type: "SINGLE",
		text: "Sản phẩm đã xem",
		path: `/${path.MEMBER}/${path.VIEWED_PRODUCTS}`,
		icon: <AiOutlineEye size={20} />,
	},
	{
		id: 5,
		type: "SINGLE",
		text: "Lịch sử mua hàng",
		path: `/${path.MEMBER}/${path.BUY_HISTORY}`,
		icon: <AiOutlineHistory size={20} />,
	},
	{
		id: 6,
		type: "SINGLE",
		text: "Đổi mật khẩu",
		path: `/${path.MEMBER}/${path.CHANGE_PASSWORD}`,
		icon: <MdOutlinePassword size={20} />,
	},
];
export const colorArr = [
	{ id: 1, value: "Đen" },
	{ id: 2, value: "Xanh" },
	{ id: 3, value: "Trắng" },
	{ id: 4, value: "Cam" },
	{ id: 5, value: "Xám" },
	{ id: 6, value: "Đỏ" },
	{ id: 7, value: "Vàng" },
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
	{
		code: 3,
		value: "Thanh toán qua VNPay",
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

export const statusOrdersLabel = [
	{
		label: "Đã hủy",
		value: "Đã hủy",
	},
	{
		label: "Đang xử lý",
		value: "Đang xử lý",
	},
	{
		label: "Đang giao",
		value: "Đang giao",
	},
	{
		label: "Thành công",
		value: "Thành công",
	},
];
export const roleLabel = [
	{
		label: "Admin",
		value: "2001",
	},
	{
		label: "Người dùng",
		value: "2000",
	},
];
export const cateLabel = [
	{
		label: "MÁY BAY NÔNG NGHIỆP",
		value: "MÁY BAY NÔNG NGHIỆP",
	},
	{
		label: "ROBOT PHUN THUỐC TỰ ĐỘNG",
		value: "ROBOT PHUN THUỐC TỰ ĐỘNG",
	},
	{
		label: "MÁY CẮT CỎ TỰ ĐỘNG",
		value: "MÁY CẮT CỎ TỰ ĐỘNG",
	},
	{
		label: "THIẾT BỊ DẪN ĐƯỜNG TỰ ĐỘNG",
		value: "THIẾT BỊ DẪN ĐƯỜNG TỰ ĐỘNG",
	},
	{
		label: "TRẠM THAM CHIẾU CORS",
		value: "TRẠM THAM CHIẾU CORS",
	},
	{
		label: "LINH KIỆN",
		value: "LINH KIỆN",
	},
	{
		label: "PHỤ KIỆN",
		value: "PHỤ KIỆN",
	},
	{
		label: "THIẾT BỊ ĐIỀU HƯỚNG",
		value: "THIẾT BỊ ĐIỀU HƯỚNG",
	},
	{
		label: "HỆ THỐNG TƯỚI TỰ ĐỘNG",
		value: "HỆ THỐNG TƯỚI TỰ ĐỘNG",
	},
	{
		label: "HỆ THỐNG NUÔI TRỒNG THỦY SẢN 4.0",
		value: "HỆ THỐNG NUÔI TRỒNG THỦY SẢN 4.0",
	},
];
