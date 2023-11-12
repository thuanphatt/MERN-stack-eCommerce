import React, { memo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoTrashBinSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { apiRemoveProductInWishList } from "apis";
import withBaseComponent from "hocs/withBaseComponent";
import { showWishList } from "store/app/appSlice";
import { getCurrent } from "store/user/asyncActions";
import { formatMoney, formatPrice } from "utils/helpers";

const WishList = ({ dispatch }) => {
	const { currentWishlist } = useSelector((state) => state.user);
	const removeWishListItem = async (pid, color) => {
		const response = await apiRemoveProductInWishList(pid, color);
		dispatch(getCurrent());
		if (!response.success) toast.error(response.mes);
	};
	return (
		<div
			className="w-[400px] h-screen bg-black text-white p-8 grid grid-rows-10 animate-slide-left"
			onClick={(e) => e.stopPropagation()}
		>
			<h2 className="font-bold border-b uppercase border-gray-500 text-xl flex items-center justify-between row-span-1 h-full">
				<span>Danh sách yêu thích</span>
				<span
					className="cursor-pointer p-2 hover:text-gray-500"
					onClick={() => {
						dispatch(showWishList());
					}}
				>
					<AiOutlineClose size={24} />
				</span>
			</h2>
			<section className="row-span-7 h-full max-h-full overflow-y-auto py-3 flex gap-4 flex-col">
				{currentWishlist.length === 0 && (
					<div className="text-center h-screen p-4 flex flex-col items-center gap-4 justify-center ">
						<h2 className="text-gray-500 font-bold text-2xl">Danh sách yêu thích đang rỗng</h2>
						<img
							src="https://bernardjewelers.com/assets/images/empty-wishlist.png"
							alt="Danh sách yêu thích rỗng"
							className="w-[150px] h-[150px] object-cover rounded-md"
						/>
					</div>
				)}
				{currentWishlist &&
					currentWishlist?.map((el) => (
						<div key={el._id} className="flex border-b border-gray-500 pb-8 justify-between items-center">
							<div className="flex gap-2">
								<img src={el.thumbnail} alt="Ảnh sản phẩm" className="w-[100px] h-[100px] object-contain" />
								<div className="flex flex-col gap-[6px]">
									<span className="font-medium text-sm text-main truncate max-w-[150px]">{el.title}</span>
									<span className="text-sm">{el.color}</span>
									<span className="text-sm">{`Số lượng: ${el.quantity}`}</span>
									<span className="text-sm">{`${formatMoney(formatPrice(el.price))} VND`}</span>
								</div>
							</div>
							<span
								className="p-2 rounded-full hover:text-red-500 cursor-pointer"
								onClick={() => {
									removeWishListItem(el.product, el.color);
								}}
							>
								<IoTrashBinSharp size={20} />
							</span>
						</div>
					))}
			</section>
		</div>
	);
};

export default withBaseComponent(memo(WishList));
