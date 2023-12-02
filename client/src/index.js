import React from "react";
import { createRoot } from "react-dom/client";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/redux";
import App from "./App";

import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const container = document.getElementById("root");
const root = createRoot(container);
Kommunicate.init("c523953b62fdee402d6012aaadada7a8", {
	automaticChatOpenOnNavigation: true,
	popupWidget: true,
});
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>
);
