const path = {
	PUBLIC_LAYOUT: "/",
	HOME: "",
	ALL: "*",
	LOGIN: "login",
	PRODUCTS: ":category",
	BLOGS: "blogs",
	OUR_SERVICES: "services",
	FAQs: "faqs",
	DETAIL_CART: "detail-cart",
	DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
	REGISTER_FINAL: "registerfinal/:status",
	RESET_PASSWORD: "reset-password/:token",
	CHECKOUT: "checkout",

	//Admin
	ADMIN: "admin",
	DASHBOARD: "dashboard",
	MANAGE_USER: "manage-user",
	MANAGE_PRODUCT: "manage-product",
	MANAGE_ORDER: "manage-order",
	CREATE_PRODUCT: "create-product",
	MANAGE_CATEGORY: "manage-category",
	REVENUE_STATISTICS: "revenue-statistics",
	CREATE_CATEGORY: "create-category",
	//Member
	MEMBER: "member",
	PERSONAL: "personal",
	BUY_HISTORY: "buy-history",
	MYCART: "my-cart",
	WISHLIST: "wishlist",
};
export default path;
