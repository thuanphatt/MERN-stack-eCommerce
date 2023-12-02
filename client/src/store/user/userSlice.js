import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
export const userSlice = createSlice({
	name: "user",
	initialState: {
		isLoggedIn: false,
		current: null,
		token: null,
		isLoading: false,
		mes: "",
		currentCart: [],
		currentWishlist: [],
		currentViewedProducts: [],
	},
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn;
			state.token = action.payload.token;
		},
		logout: (state, action) => {
			state.isLoggedIn = false;
			state.current = null;
			state.token = null;
			state.isLoading = false;
			state.mes = "";
		},
		clearMessage: (state, action) => {
			state.mes = "";
		},
		updateCart: (state, action) => {
			const { pid, quantity, color, category } = action.payload;
			const updatingCart = JSON.parse(JSON.stringify(state.currentCart));
			state.currentCart = updatingCart.map((el) => {
				if (el.color === color && el.product?._id === pid) {
					return { ...el, quantity, category };
				} else return el;
			});
		},
		updateWishList: (state, action) => {
			const { pid, quantity, color, category } = action.payload;
			const updatingCurrentWishList = JSON.parse(JSON.stringify(state.currentWishlist));
			state.currentWishlist = updatingCurrentWishList.map((el) => {
				if (el.color === color && el.product?._id === pid) {
					return { ...el, quantity, category };
				} else return el;
			});
		},
		updateViewedProducts: (state, action) => {
			const { pid, quantity, color, category } = action.payload;
			const updatingViewedProducts = JSON.parse(JSON.stringify(state.currentViewedProducts));
			state.currentViewedProducts = updatingViewedProducts.map((el) => {
				if (el.color === color && el.product?._id === pid) {
					return { ...el, quantity, category };
				} else return el;
			});
		},
	},
	// Code xử lý async action
	extraReducers: (builder) => {
		// Bắt đầu thực hiện action login (Promise pending)
		builder.addCase(actions.getCurrent.pending, (state) => {
			// Bật trạng thái loading
			state.isLoading = true;
		});

		// Khi thực hiện action login thành công (Promise fulfilled)
		builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
			// Tắt trạng thái loading, lưu thông tin user vào store
			state.isLoading = false;
			state.current = action.payload;
			state.isLoggedIn = true;
			state.currentCart = action.payload.cart;
			state.currentWishlist = action.payload.wishList;
			state.currentViewedProducts = action.payload.viewedProducts;
		});

		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getCurrent.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false;
			state.current = "";
			state.isLoggedIn = false;
			state.token = null;
			state.mes = "Phiên đăng nhập đã hết hạn, hãy đăng nhập lại";
		});
	},
});
export const { login, logout, clearMessage, updateCart, updateViewedProducts } = userSlice.actions;

export default userSlice.reducer;
