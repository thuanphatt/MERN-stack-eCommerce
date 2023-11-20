import React, { memo } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { IoIosArrowForward } from "react-icons/io";
const Breakcrumb = ({ title, category }) => {
	const routes = [
		{ path: "/products/:category", breadcrumb: category },
		{ path: "/", breadcrumb: "Trang chủ" },
		{ path: "/:category/:pid/:title", breadcrumb: title },
	];
	const breadcrumb = useBreadcrumbs(routes);
	return (
		<div className="text-sm flex items-center gap-1">
			{breadcrumb
				?.filter((el) => !el.match.route === false)
				.map(({ match, breadcrumb }, index, self) => (
					<Link key={match.pathname} to={match.pathname} className="flex items-center gap-1 hover:text-main">
						<span className="capitalize truncate md:max-w-full max-w-[150px]">{breadcrumb}</span>
						{index !== self.length - 1 && <IoIosArrowForward />}
					</Link>
				))}
		</div>
	);
};

export default memo(Breakcrumb);
