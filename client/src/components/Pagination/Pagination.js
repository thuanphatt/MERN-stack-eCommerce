import React, { memo } from "react";
import usePanigation from "hooks/usePanigation";
import { useSearchParams } from "react-router-dom";
import { PaginationItem } from "../";

const Pagination = ({ totalCount }) => {
	const pagination = usePanigation(totalCount, 2);
	const [params] = useSearchParams();

	const range = () => {
		const currentPage = +params.get("page");
		const pageSize = +process.env.REACT_APP_PRODUCT_LIMIT || 10;
		const start = (currentPage - 1) * pageSize + 1;
		const end = Math.min(currentPage * pageSize, totalCount);
		return `${start} - ${end}`;
	};

	return (
		<div className="flex items-center justify-between w-main">
			{!+params.get("page") ? (
				<span className="text-sm italic">{`Hiển thị sản phẩm 1 - ${
					+process.env.REACT_APP_PRODUCT_LIMIT || 10
				} của ${totalCount}`}</span>
			) : (
				<span className="text-sm italic">{`Hiển thị sản phẩm ${range()} của ${totalCount}`}</span>
			)}

			<div className="flex items-center">
				{pagination?.map((el) => (
					<PaginationItem key={el}>{el}</PaginationItem>
				))}
			</div>
		</div>
	);
};

export default memo(Pagination);
