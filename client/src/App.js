import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Home,
	Login,
	PublicLayout,
	Blogs,
	Products,
	DetailProduct,
	Services,
	FinalRegister,
	ResetPassword,
	DetailBlog,
	Trainning,
	DetailService,
	Contact,
} from "./pages/public";
import { Route, Routes } from "react-router-dom";
import path from "./utils/path";
import { getCategories } from "./store/app/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { Cart, Modal, WishList } from "./components";
import {
	AdminLayout,
	CreateBlog,
	CreateCategory,
	CreateProduct,
	CreateService,
	CreateShip,
	Dashboard,
	ManageBlog,
	ManageCategory,
	ManageOrder,
	ManageProduct,
	ManageSerice,
	ManageShipment,
	ManageUser,
	RevenueStatistics,
} from "pages/admin";
import { MemberLayout, Personal, BuyHistory, Checkout, MyCart } from "pages/member";
import { showCart, showWishList } from "store/app/appSlice";
import CreateCoupon from "pages/admin/CreateCoupon";
import ManageCoupon from "pages/admin/ManageCoupon";
function App() {
	const dispatch = useDispatch();
	const { isShowModal, modalChildren, isShowCart, isShowWishList } = useSelector((state) => state.app);
	useEffect(() => {
		dispatch(getCategories());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="font-main min-h-screen relative w-full">
			{isShowCart && (
				<div
					className="bg-overlay z-50 absolute inset-0 flex justify-end "
					onClick={() => {
						dispatch(showCart());
					}}
				>
					<Cart />
				</div>
			)}
			{isShowWishList && (
				<div
					className="bg-overlay z-50 absolute inset-0 flex justify-end "
					onClick={() => {
						dispatch(showWishList());
					}}
				>
					<WishList />
				</div>
			)}

			{isShowModal && <Modal>{modalChildren}</Modal>}
			<Routes>
				<Route path={path.CHECKOUT} element={<Checkout />}></Route>
				<Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
					<Route path={path.HOME} element={<Home />}></Route>
					<Route path={path.BLOGS} element={<Blogs />}></Route>
					<Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}></Route>
					<Route path={path.DETAIL_BLOG__CATEGORY__BID__TITLE} element={<DetailBlog />}></Route>
					<Route path={path.DETAIL_SERVICE__SID__TITLE} element={<DetailService />}></Route>
					<Route path={path.CONTACT} element={<Contact />}></Route>
					<Route path={path.OUR_SERVICES} element={<Services />}></Route>
					<Route path={path.TRAINNING} element={<Trainning />}></Route>
					<Route path={path.PRODUCTS} element={<Products />}></Route>
					<Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
					<Route path={path.ALL} element={<Home />}></Route>
				</Route>
				<Route path={path.ADMIN} element={<AdminLayout />}>
					<Route path={path.DASHBOARD} element={<Dashboard />}></Route>
					<Route path={path.MANAGE_USER} element={<ManageUser />}></Route>
					<Route path={path.MANAGE_PRODUCT} element={<ManageProduct />}></Route>
					<Route path={path.MANAGE_ORDER} element={<ManageOrder />}></Route>
					<Route path={path.MANAGE_CATEGORY} element={<ManageCategory />}></Route>
					<Route path={path.MANAGE_BLOG} element={<ManageBlog />}></Route>
					<Route path={path.MANAGE_SHIP} element={<ManageShipment />}></Route>
					<Route path={path.MANAGE_SERVICE} element={<ManageSerice />}></Route>
					<Route path={path.MANAGE_COUPON} element={<ManageCoupon />}></Route>
					<Route path={path.CREATE_BLOG} element={<CreateBlog />}></Route>
					<Route path={path.CREATE_SERVICE} element={<CreateService />}></Route>
					<Route path={path.CREATE_PRODUCT} element={<CreateProduct />}></Route>
					<Route path={path.REVENUE_STATISTICS} element={<RevenueStatistics />}></Route>
					<Route path={path.CREATE_CATEGORY} element={<CreateCategory />}></Route>
					<Route path={path.CREATE_SHIP} element={<CreateShip />}></Route>
					<Route path={path.CREATE_COUPON} element={<CreateCoupon />}></Route>
				</Route>
				<Route path={path.MEMBER} element={<MemberLayout />}>
					<Route path={path.PERSONAL} element={<Personal />}></Route>
					<Route path={path.MYCART} element={<MyCart />}></Route>
					<Route path={path.BUY_HISTORY} element={<BuyHistory />}></Route>
					<Route path={path.WISHLIST} element={<WishList />}></Route>
				</Route>
				<Route path={path.REGISTER_FINAL} element={<FinalRegister />}></Route>
				<Route path={path.LOGIN} element={<Login />}></Route>
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
}

export default App;
