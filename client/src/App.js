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
} from "./pages/public";
import { Route, Routes } from "react-router-dom";
import path from "./utils/path";
import { getCategories } from "./store/app/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "./components";
import { AdminLayout, CreateProduct, Dashboard, ManageOrder, ManageProduct, ManageUser } from "pages/admin";
import { MemberLayout, Personal, BuyHistory, MyCart, WishList } from "pages/member";
function App() {
	const dispatch = useDispatch();
	const { isShowModal, modalChildren } = useSelector((state) => state.app);
	useEffect(() => {
		dispatch(getCategories());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="font-main relative">
			{isShowModal && <Modal>{modalChildren}</Modal>}
			<Routes>
				<Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
					<Route path={path.HOME} element={<Home />}></Route>
					<Route path={path.BLOGS} element={<Blogs />}></Route>
					<Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}></Route>
					<Route path={path.FAQs} element={<FAQ />}></Route>
					<Route path={path.OUR_SERVICES} element={<Services />}></Route>
					<Route path={path.PRODUCTS} element={<Products />}></Route>
					<Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
					<Route path={path.ALL} element={<Home />}></Route>
				</Route>
				<Route path={path.ADMIN} element={<AdminLayout />}>
					<Route path={path.DASHBOARD} element={<Dashboard />}></Route>
					<Route path={path.MANAGE_USER} element={<ManageUser />}></Route>
					<Route path={path.MANAGE_ORDER} element={<ManageOrder />}></Route>
					<Route path={path.MANAGE_PRODUCT} element={<ManageProduct />}></Route>
					<Route path={path.CREATE_PRODUCT} element={<CreateProduct />}></Route>
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
				autoClose={5000}
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
