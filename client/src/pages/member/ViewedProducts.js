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
						<h2 className="text-gray-500 font-bold text-2xl">Bạn chưa xem sản phẩm nào!</h2>
						<img
							src="https://bernardjewelers.com/assets/images/empty-wishlist.png"
							alt="Danh sách những sản phẩm đã xem rỗng"
							className="w-[150px] h-[150px] object-cover rounded-md"
						/>
					</div>
				)}
				{currentViewedProducts &&
					currentViewedProducts?.map((el) => (
						<div
							className="grid md:grid-cols-10 grid-cols-4 md:w-main w-full mx-auto border-b md:pl-10 py-4"
							key={el._id}
						>
							<span className="w-full text-center md:col-span-5 col-span-2 flex items-center md:flex-row flex-col">
								<img
									src={el.thumbnail}
									alt="Ảnh sản phẩm"
									className="md:w-[200px] md:h-[200px] w-[50px] h-[50px] object-contain"
								/>
								<div className="flex flex-col gap-2 px-4 py-2">
									<span className="font-medium text-sm">{el.title}</span>
									<span className="text-sm">{el.color}</span>
								</div>
							</span>

							<span className="w-full md:text-center md:col-span-3 col-span-1">
								<div className="flex items-center h-full">
									<h2 className="text-center md:w-main w-full font-bold">{`${formatMoney(
										formatPrice(el.price)
									)} VND`}</h2>
								</div>
							</span>
							<span
								className="p-2 rounded-full hover:text-red-500 cursor-pointer w-full md:text-center md:col-span-2 col-span-1 flex items-center justify-center"
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
