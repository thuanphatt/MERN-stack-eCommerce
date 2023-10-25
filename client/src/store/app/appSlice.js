import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncAction";
export const appSlice = createSlice({
	name: "app",
	initialState: {
		categories: null,
		isLoading: false,
		isShowModal: false,
		modalChildren: null,
		isShowCart: false,
		isShowWishList: false,
	},
	reducers: {
		showModal: (state, action) => {
			state.isShowModal = action.payload.isShowModal;
			state.modalChildren = action.payload.modalChildren;
		},
		showCart: (state) => {
			state.isShowCart = state.isShowCart === false ? true : false;
		},
		showShowWishList: (state) => {
			state.isShowWishList = state.isShowWishList === false ? true : false;
		},
	},
	//   Code xử lý async action
	extraReducers: (builder) => {
		// Bắt đầu thực hiện action login (Promise pending)
		builder.addCase(actions.getCategories.pending, (state) => {
			// Bật trạng thái loading
			state.isLoading = true;
		});

		// Khi thực hiện action login thành công (Promise fulfilled)
		builder.addCase(actions.getCategories.fulfilled, (state, action) => {
			// Tắt trạng thái loading, lưu thông tin user vào store
			state.isLoading = false;
			state.categories = action.payload;
		});

		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getCategories.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false;
			state.errorMessage = action.payload.message;
		});
	},
});
export const { showModal, showCart, showShowWishList } = appSlice.actions;

export default appSlice.reducer;
