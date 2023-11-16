import { apiRemoveProductInViewedProducts } from "apis";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import { formatMoney, formatPrice } from "utils/helpers";

const ViewedProducts = ({ dispatch }) => {
	const { currentViewedProducts } = useSelector((state) => state.user);
	const removeViewedItem = async (pid, color) => {
		const response = await apiRemoveProductInViewedProducts(pid, color);
		dispatch(getCurrent());
		if (!response.success) toast.error(response.mes);
	};
	return (
		<div className="w-full min-h-full text-black px-4" onClick={(e) => e.stopPropagation()}>
			<header className="text-3xl font-semibold py-4 border-b border-main">Sản phẩm đã xem</header>
			<section className="min-h-full py-3 flex gap-4 flex-col">
				{currentViewedProducts?.length === 0 && (
					<div className="text-center h-screen p-4 flex flex-col items-center gap-4 justify-center ">
						<h2 className="text-gray-500 font-bold text-2xl">Danh sách những sản phẩm đã xem đang rỗng</h2>
						<img
							src="https://bernardjewelers.com/assets/images/empty-wishlist.png"
							alt="Danh sách những sản phẩm đã xem rỗng"
							className="w-[150px] h-[150px] object-cover rounded-md"
						/>
					</div>
				)}
				{currentViewedProducts &&
					currentViewedProducts?.map((el) => (
						<div key={el._id} className="flex border-b border-[#ccc] pb-8 items-center justify-between">
							<div className="flex gap-4 items-center">
								<img src={el.thumbnail} alt="Ảnh sản phẩm" className="w-[150px] h-[150px] object-contain rounded" />
								<div className="flex flex-col gap-1">
									<span className="font-medium text-lg text-black">{el.title}</span>
									<span className="text-base font-medium">{el.color}</span>
									<span className="text-base font-medium">{`${formatMoney(formatPrice(el.price))} VND`}</span>
								</div>
							</div>
							<span
								className="p-2 rounded-full hover:text-red-500 cursor-pointer"
								onClick={() => {
									removeViewedItem(el.product, el.color);
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

export default withBaseComponent(memo(ViewedProducts));
