const path = {
	PUBLIC_LAYOUT: "/",
	HOME: "",
	ALL: "*",
	LOGIN: "login",
	PRODUCTS: ":category",
	BLOGS: "blogs",
	OUR_SERVICES: "services",
	FAQs: "faqs",
	TRAINNING: "trainning",
	DETAIL_CART: "detail-cart",
	DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
	DETAIL_BLOG__CATEGORY__BID__TITLE: "blogs/:bid/:title",
	DETAIL_SERVICE__BID__TITLE: "services/:sid/:name",
	REGISTER_FINAL: "registerfinal/:status",
	RESET_PASSWORD: "reset-password/:token",
	CHECKOUT: "checkout",

	//Admin
	ADMIN: "admin",
	DASHBOARD: "dashboard",
	MANAGE_USER: "manage-user",
	MANAGE_PRODUCT: "manage-product",
	MANAGE_ORDER: "manage-order",
	MANAGE_SHIP: "manage-ship",
	MANAGE_BLOG: "manage-blog",
	MANAGE_SERVICE: "manage-service",
	CREATE_PRODUCT: "create-product",
	CREATE_SERVICE: "create-service",
	MANAGE_CATEGORY: "manage-category",
	REVENUE_STATISTICS: "revenue-statistics",
	CREATE_CATEGORY: "create-category",
	CREATE_SHIP: "create-ship",
	CREATE_BLOG: "create-blog",
	//Member
	MEMBER: "member",
	PERSONAL: "personal",
	BUY_HISTORY: "buy-history",
	MYCART: "my-cart",
	WISHLIST: "wishlist",
};
export default path;
