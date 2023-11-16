const path = {
	PUBLIC_LAYOUT: "/",
	HOME: "",
	ALL: "*",
	LOGIN: "login",
	PRODUCTS: ":category",
	BLOGS: "blogs",
	OUR_SERVICES: "services",
	CONTACT: "contact",
	TRAINNING: "trainning",
	DETAIL_CART: "detail-cart",
	DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
	DETAIL_BLOG__CATEGORY__BID__TITLE: "blogs/:bid/:title",
	DETAIL_SERVICE__SID__TITLE: "services/:sid/:name",
	REGISTER_FINAL: "registerfinal/:status",
	RESET_PASSWORD: "reset-password/:token",
	CHANGE_PASSWORD: "change-password",
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
	MANAGE_CATEGORY: "manage-category",
	MANAGE_BLOGCATEGORY: "manage-blogcategory",
	MANAGE_COUPON: "manage-coupon",
	MANAGE_BANNER: "manage-banner",
	MANAGE_SALE: "manage-sale",
	CREATE_PRODUCT: "create-product",
	CREATE_SALE: "create-sale",
	CREATE_BANNER: "create-banner",
	CREATE_SERVICE: "create-service",
	CREATE_CATEGORY: "create-category",
	CREATE_BLOGCATEGORY: "create-blogcategory",
	CREATE_SHIP: "create-ship",
	CREATE_BLOG: "create-blog",
	CREATE_COUPON: "create-coupon",
	REVENUE_STATISTICS: "revenue-statistics",
	//Member
	MEMBER: "member",
	PERSONAL: "personal",
	BUY_HISTORY: "buy-history",
	MYCART: "my-cart",
	WISHLIST: "wishlist",
	VIEWED_PRODUCTS: "viewed-products",
};
export default path;
