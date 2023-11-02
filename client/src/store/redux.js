import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import appSlice from "./app/appSlice";
import productSlice from "./products/productSlice";
import userSlice from "./user/userSlice";

const commonConfig = {
	storage,
};
const userConfig = {
	...commonConfig,
	whitelist: ["isLoggedIn", "token", "current", "currentCart", "currentWishlist"],
	key: "shop/user",
};
const productConfig = {
	...commonConfig,
	whitelist: ["dealDaily"],
	key: "shop/deal",
};

export const store = configureStore({
	reducer: {
		app: appSlice,
		products: persistReducer(productConfig, productSlice),
		user: persistReducer(userConfig, userSlice),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
export const persistor = persistStore(store);
