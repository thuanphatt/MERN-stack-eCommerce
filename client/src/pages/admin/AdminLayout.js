import React, { memo } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import path from "utils/path";

import { AdminSidebar } from "components";
const AdminLayout = () => {
	const { isLoggedIn, current } = useSelector((state) => state.user);
	if (!isLoggedIn || !current || +current.role !== 2001) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
	return (
		<div className="flex w-full bg-[#F1EFEF] min-h-screen relative text-[#191717]">
			<div className="w-[256px] flex-none fixed top-0 bottom-0">
				<AdminSidebar />
			</div>
			<div className="w-[256px]"></div>
			<div className="flex-auto min-h-screen">
				<Outlet />
			</div>
		</div>
	);
};

export default memo(AdminLayout);
