import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, TopHeader, Footer } from "components";

const PublicLayout = () => {
	return (
		<div className="max-h-screen overflow-y-auto flex flex-col items-center">
			<TopHeader />
			<Header />
			<Navigation />
			<div className="w-full flex flex-col items-center">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default PublicLayout;
