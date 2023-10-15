const path = {
	PUBLIC_LAYOUT: "/",
	HOME: "",
	ALL: "*",
	LOGIN: "login",
	PRODUCTS: ":category",
	BLOGS: "blogs",
	OUR_SERVICES: "services",
	FAQs: "faqs",
	CART_DETAIL: "cart-detail",
	DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
	REGISTER_FINAL: "registerfinal/:status",
	RESET_PASSWORD: "reset-password/:token",
	//Admin
	ADMIN: "admin",
	DASHBOARD: "dashboard",
	MANAGE_USER: "manage-user",
	MANAGE_PRODUCT: "manage-product",
	MANAGE_ORDER: "manage-order",
	CREATE_PRODUCT: "create-product",
	//Member
	MEMBER: "member",
	PERSONAL: "personal",
	BUY_HISTORY: "buy-history",
	MYCART: "my-cart",
	WISHLIST: "wishlist",
};
export default path;
