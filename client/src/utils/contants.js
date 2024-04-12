import path from "./path";
import icons from "./icons";
import review1 from "../assets/review1.jpg";
import review2 from "../assets/review2.jpg";
import review3 from "../assets/review3.jpg";
const {
	FaShieldAlt,
	RiCoupon3Line,
	IoHomeOutline,
	IoIosInformationCircleOutline,
	AiFillGift,
	BsFillReplyFill,
	FaTty,
	MdOutlineDashboard,
	GrGroup,
	MdManageSearch,
	IoReceiptOutline,
	IoCreateOutline,
	IoBagCheck,
	BiCategory,
	TfiReceipt,
	IoBarChartOutline,
	LiaShippingFastSolid,
	IoNewspaperOutline,
	RiCustomerService2Fill,
	MdOutlineLockReset,
	AiOutlineEye,
	BsCalendar2Event,
	TbReportAnalytics,
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
		sub: "Miễn phí trên tất cả đơn hàng trên 1,000,000 VND",
		icon: <IoBagCheck size={20} />,
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
		icon: <MdOutlineDashboard size={20} />,
	},
	{
		id: 2,
		type: "SINGLE",
		text: "Quản lý người dùng",
		path: `/${path.ADMIN}/${path.MANAGE_USER}`,
		icon: <GrGroup size={18} />,
	},
	{
		id: 3,
		type: "PARENT",
		text: "Quản lý sản phẩm",
		icon: <MdManageSearch size={20} />,
		submenu: [
			{ text: "Tạo sản phẩm", path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`, icon: <IoCreateOutline size={20} /> },

			{
				text: "Quản lý sản phẩm",
				path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
				icon: <MdManageSearch size={20} />,
			},
		],
	},
	{
		id: 4,
		type: "PARENT",
		text: "Quản lý phiếu nhập",
		icon: <TfiReceipt size={20} />,
		submenu: [
			{ text: "Tạo phiếu nhập", path: `/${path.ADMIN}/${path.CREATE_RECEIPT}`, icon: <IoCreateOutline size={20} /> },
			{
				text: "Quản lý phiếu nhập",
				path: `/${path.ADMIN}/${path.MANAGE_RECEIPT}`,
				icon: <TfiReceipt size={20} />,
			},
		],
	},
	{
		id: 5,
		type: "SINGLE",
		text: "Quản lý đơn hàng",
		path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
		icon: <IoReceiptOutline size={20} />,
	},
	{
		id: 6,
		type: "PARENT",
		text: "Quản lý danh mục",

		icon: <BiCategory size={20} />,
		submenu: [
			{ text: "Tạo danh mục", path: `/${path.ADMIN}/${path.CREATE_CATEGORY}`, icon: <IoCreateOutline size={20} /> },
			{
				text: "Quản lý danh mục",
				path: `/${path.ADMIN}/${path.MANAGE_CATEGORY}`,
				icon: <BiCategory size={20} />,
			},
		],
	},
	{
		id: 7,
		type: "PARENT",
		text: "Quản lý danh mục tin tức",

		icon: <BiCategory size={20} />,
		submenu: [
			{
				text: "Tạo danh mục tin tức",
				path: `/${path.ADMIN}/${path.CREATE_BLOGCATEGORY}`,
				icon: <IoCreateOutline size={20} />,
			},
			{
				text: "Quản lý danh mục tin tức",
				path: `/${path.ADMIN}/${path.MANAGE_BLOGCATEGORY}`,
				icon: <BiCategory size={20} />,
			},
		],
	},

	{
		id: 8,
		type: "PARENT",
		text: "Quản lý phí vận chuyển",

		icon: <LiaShippingFastSolid size={20} />,
		submenu: [
			{ text: "Tạo phí vận chuyển", path: `/${path.ADMIN}/${path.CREATE_SHIP}`, icon: <IoCreateOutline size={20} /> },
			{
				text: "Quản lý phí vận chuyển",
				path: `/${path.ADMIN}/${path.MANAGE_SHIP}`,
				icon: <LiaShippingFastSolid size={20} />,
			},
		],
	},

	{
		id: 9,
		type: "PARENT",
		text: "Thống kê và báo cáo",
		path: `/${path.ADMIN}/${path.REVENUE_STATISTICS}`,
		icon: <IoBarChartOutline size={20} />,
		submenu: [
			{
				text: "Thống kê doanh thu",
				path: `/${path.ADMIN}/${path.REVENUE_STATISTICS}`,
				icon: <IoBarChartOutline size={20} />,
			},
			{
				text: "Báo cáo doanh thu",
				path: `/${path.ADMIN}/${path.REVENUE_REPORT}`,
				icon: <TbReportAnalytics size={20} />,
			},
		],
	},
	{
		id: 10,
		type: "PARENT",
		text: "Quản lý tin tức",

		icon: <IoNewspaperOutline size={20} />,
		submenu: [
			{ text: "Tạo tin tức", path: `/${path.ADMIN}/${path.CREATE_BLOG}`, icon: <IoCreateOutline size={20} /> },
			{
				text: "Quản lý tin tức",
				path: `/${path.ADMIN}/${path.MANAGE_BLOG}`,
				icon: <IoNewspaperOutline size={20} />,
			},
		],
	},
	{
		id: 11,
		type: "PARENT",
		text: "Quản lý dịch vụ",

		icon: <RiCustomerService2Fill size={20} />,
		submenu: [
			{ text: "Tạo dịch vụ", path: `/${path.ADMIN}/${path.CREATE_SERVICE}`, icon: <IoCreateOutline size={20} /> },
			{
				text: "Quản lý dịch vụ",
				path: `/${path.ADMIN}/${path.MANAGE_SERVICE}`,
				icon: <RiCustomerService2Fill size={20} />,
			},
		],
	},
	{
		id: 12,
		type: "PARENT",
		text: "Quản lý mã giảm giá",

		icon: <RiCoupon3Line size={20} />,
		submenu: [
			{ text: "Tạo mã giảm giá", path: `/${path.ADMIN}/${path.CREATE_COUPON}`, icon: <IoCreateOutline size={20} /> },
			{
				text: "Quản lý mã giảm giá",
				path: `/${path.ADMIN}/${path.MANAGE_COUPON}`,
				icon: <RiCoupon3Line size={20} />,
			},
		],
	},
	{
		id: 13,
		type: "PARENT",
		text: "Quản lý sự kiện",

		icon: <BsCalendar2Event size={20} />,
		submenu: [
			{ text: "Tạo sự kiện", path: `/${path.ADMIN}/${path.CREATE_SALE}`, icon: <IoCreateOutline size={20} /> },
			{
				text: "Quản lý sự kiện",
				path: `/${path.ADMIN}/${path.MANAGE_SALE}`,
				icon: <BsCalendar2Event size={20} />,
			},
		],
	},
	{
		id: 14,
		type: "PARENT",
		text: "Quản lý nội dung",

		icon: <BiCategory size={20} />,
		submenu: [
			{ text: "Tạo nội dung", path: `/${path.ADMIN}/${path.CREATE_CONTENT}`, icon: <IoCreateOutline size={20} /> },
			{
				text: "Quản lý nội dung",
				path: `/${path.ADMIN}/${path.MANAGE_CONTENT}`,
				icon: <BiCategory size={20} />,
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
		id: 4,
		type: "SINGLE",
		text: "Sản phẩm đã xem",
		path: `/${path.MEMBER}/${path.VIEWED_PRODUCTS}`,
		icon: <AiOutlineEye size={20} />,
	},
	{
		id: 5,
		type: "SINGLE",
		text: "Đơn hàng",
		path: `/${path.MEMBER}/${path.ORDERS}`,
		icon: <TfiReceipt size={20} />,
	},
	{
		id: 6,
		type: "SINGLE",
		text: "Đổi mật khẩu",
		path: `/${path.MEMBER}/${path.CHANGE_PASSWORD}`,
		icon: <MdOutlineLockReset size={20} />,
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
		src: review1,
	},
	{
		id: 2,
		src: review2,
	},
	{
		id: 3,
		src: review3,
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
		label: "HỆ THỐNG XỬ LÝ NƯỚC THẢI NÔNG NGHIỆP THÔNG MINH 4.0",
		value: "HỆ THỐNG XỬ LÝ NƯỚC THẢI NÔNG NGHIỆP THÔNG MINH 4.0",
	},
];
export const paymentMethodOrdersLabel = [
	{
		label: "COD",
		value: "COD",
	},
	{
		label: "Paypal",
		value: "Paypal",
	},
	{
		label: "VNPay",
		value: "VNPay",
	},
];
export const colorsFilter = [
	{ label: "Đen", value: "đen" },
	{ label: "Xanh", value: "xanh" },
	{ label: "Trắng", value: "trắng" },
	{ label: "Cam", value: "cam" },
	{ label: "Xám", value: "xám" },
	{ label: "Đỏ", value: "đỏ" },
	{ label: "Vàng", value: "vàng" },
];
export const brandsFilter = [
	{
		label: "G",
		value: "G",
	},
	{
		label: "GY",
		value: "GY",
	},
	{
		label: "RG",
		value: "RG",
	},
	{
		label: "XAG",
		value: "XAG",
	},
	{
		label: "NX",
		value: "NX",
	},
	{
		label: "30S",
		value: "30S",
	},
	{
		label: "GC",
		value: "GC",
	},
	{
		label: "Azud",
		value: "Azud",
	},
	{
		label: "Greentech",
		value: "Greentech",
	},
	{
		label: "LZ1E",
		value: "LZ1E",
	},
	{
		label: "Rainbird",
		value: "Rainbird",
	},
	{
		label: "YSI",
		value: "YSI",
	},
];
