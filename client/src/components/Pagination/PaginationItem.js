import clsx from "clsx";
import { memo } from "react";
import { useSearchParams, useNavigate, createSearchParams, useLocation } from "react-router-dom";
const PaginationItem = ({ children }) => {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const location = useLocation();
	const currentPage = params.get("page");
	const handlePanigation = () => {
		const queries = Object.fromEntries([...params]);
		if (Number(children)) queries.page = children;
		navigate({
			pathname: location.pathname,
			search: createSearchParams(queries).toString(),
		});
		window.scrollTo(0, 0);
	};
	return (
		<button
			className={clsx(
				"w-10 h-10 flex items-center justify-center hover:rounded-full hover:bg-gray-300",
				!Number(children) && "pt-1 hover:rounded-none hover:bg-white",
				+currentPage === +children && "bg-gray-300 rounded-full",
				!+currentPage && children === 1 && "bg-gray-300 rounded-full"
			)}
			onClick={handlePanigation}
			type="button"
			disabled={!Number(children)}
		>
			{children}
		</button>
	);
};

export default memo(PaginationItem);
