import { useMemo } from "react";
import { generateArrayRange } from "../utils/helpers";
import { BsThreeDots } from "react-icons/bs";

const usePanigation = (totalProductCount, currentPage, siblingCount = 1) => {
	const paginationArray = useMemo(() => {
		// 60 / 10 => totalProductCount = 60 ; pageSize = 10 ;  paginationCount = 6
		// [1,2,3,4,5,6]
		// [1,...,6,7,8,9,10]
		//  [1,2,3,4,5,...,10]
		const pageSize = process.env.REACT_APP_LIMIT || 10;
		const paginationCount = Math.ceil(totalProductCount / pageSize);
		const totalPaginationItem = siblingCount + 5;
		if (paginationCount <= totalPaginationItem) return generateArrayRange(1, paginationCount);
		const isShowLeft = currentPage - siblingCount > 2;
		const isShowRight = currentPage + siblingCount < paginationCount + 1;
		if (isShowLeft && !isShowRight) {
			const rightStart = paginationCount - 4;
			const rightRange = generateArrayRange(rightStart, paginationCount);
			return [1, <BsThreeDots />, ...rightRange];
		}
		if (!isShowLeft && isShowRight) {
			const leftRange = generateArrayRange(1, 5);
			return [...leftRange, <BsThreeDots />, paginationCount];
		}
		const siblingCountLeft = Math.max(currentPage - siblingCount, 1);
		const siblingCountRight = Math.min(currentPage + siblingCount, paginationCount);
		if (isShowLeft && isShowRight) {
			const midleRange = generateArrayRange(siblingCountLeft, siblingCountRight);
			return [1, <BsThreeDots />, ...midleRange, <BsThreeDots />, paginationCount];
		}
	}, [totalProductCount, currentPage, siblingCount]);
	return paginationArray;
};

export default usePanigation;
