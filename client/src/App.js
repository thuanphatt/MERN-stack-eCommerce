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
	FAQ,
	Services,
	FinalRegister,
	ResetPassword,
	DetailBlog,
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
	CreateShip,
	Dashboard,
	ManageBlog,
	ManageCategory,
	ManageOrder,
	ManageProduct,
	ManageShipment,
	ManageUser,
	RevenueStatistics,
} from "pages/admin";
import { MemberLayout, Personal, BuyHistory, Checkout, MyCart } from "pages/member";
import { showCart, showShowWishList } from "store/app/appSlice";
function App() {
	const dispatch = useDispatch();
	const { isShowModal, modalChildren, isShowCart, isShowWishList } = useSelector((state) => state.app);
	useEffect(() => {
		dispatch(getCategories());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="font-main h-screen relative">
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
						dispatch(showShowWishList());
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
					<Route path={path.FAQs} element={<FAQ />}></Route>
					<Route path={path.OUR_SERVICES} element={<Services />}></Route>
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
					<Route path={path.CREATE_BLOG} element={<CreateBlog />}></Route>
					<Route path={path.CREATE_PRODUCT} element={<CreateProduct />}></Route>
					<Route path={path.REVENUE_STATISTICS} element={<RevenueStatistics />}></Route>
					<Route path={path.CREATE_CATEGORY} element={<CreateCategory />}></Route>
					<Route path={path.CREATE_SHIP} element={<CreateShip />}></Route>
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
