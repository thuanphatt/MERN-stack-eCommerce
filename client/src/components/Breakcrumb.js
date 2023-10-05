import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { IoIosArrowForward } from "react-icons/io";
const Breakcrumb = ({ title, category }) => {
	const routes = [
		{ path: "/:category", breadcrumb: category.split(",")[1] },
		{ path: "/", breadcrumb: "Home" },
		{ path: "/:category/:pid/:title", breadcrumb: title },
	];
	const breadcrumb = useBreadcrumbs(routes);
	return (
		<div className="text-sm flex items-center gap-1">
			{breadcrumb.map(({ match, breadcrumb }, index, self) => (
				<Link key={match.pathname} to={match.pathname} className="flex items-center gap-1 hover:text-main">
					<span className="capitalize">{breadcrumb}</span>
					{index !== self.length - 1 && <IoIosArrowForward />}
				</Link>
			))}
		</div>
	);
};

export default Breakcrumb;
