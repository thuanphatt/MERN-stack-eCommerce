import { apiRemoveProductInCart } from "apis";
import clsx from "clsx";
import Button from "components/Buttons/Button";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoTrashBinSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showCart } from "store/app/appSlice";
import { getCurrent } from "store/user/asyncActions";
import { formatMoney, formatPrice } from "utils/helpers";
import path from "utils/path";

const Cart = ({ dispatch, navigate }) => {
	const { currentCart, current } = useSelector((state) => state.user);
	const removeCartItem = async (pid, color) => {
		const response = await apiRemoveProductInCart(pid, color);
		dispatch(getCurrent());
		if (!response.success) toast.error(response.mes);
	};
	return (
		<div
			className="md:w-[400px] w-[350px] h-screen bg-black text-white p-8 grid grid-rows-10 animate-slide-left"
			onClick={(e) => e.stopPropagation()}
		>
			<h2 className="font-bold border-b uppercase border-gray-500 text-xl flex items-center justify-between row-span-1 h-full">
				<span>Giỏ hàng của tôi</span>
				<span
					className="cursor-pointer p-2 hover:text-gray-500"
					onClick={() => {
						dispatch(showCart());
					}}
				>
					<AiOutlineClose size={24} />
				</span>
			</h2>
			<section className="md:row-span-7 row-span-6 h-full max-h-full overflow-y-auto py-3 flex gap-4 flex-col">
				{currentCart.length === 0 && (
					<div className="text-center h-screen p-4 flex flex-col items-center gap-4 justify-center ">
						<h2 className="text-gray-500 font-bold text-2xl">Giỏ hàng đang rỗng</h2>
						<img
							src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg"
							alt="Giỏ hàng rỗng"
							className="w-[150px] h-[150px] object-cover rounded-md"
						/>
					</div>
				)}
				{currentCart &&
					currentCart?.map((el) => (
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
									removeCartItem(el.product._id, el.color);
								}}
							>
								<IoTrashBinSharp size={20} />
							</span>
						</div>
					))}
			</section>

			{currentCart.length > 0 && (
				<div className="row-span-2 h-full flex flex-col justify-between gap-4">
					<div className="flex items-center gap-2 justify-between pt-4 border-t border-gray-500">
						<span>Tổng cộng:</span>
						<span>{`${formatMoney(
							formatPrice(currentCart.reduce((sum, el) => sum + Number(el.price) * el.quantity, 0))
						)} VND`}</span>
					</div>
					<span className="text-[12px] text-gray-500 font-normal text-center">
						Phí vận chuyển và giảm giá được tính khi thanh toán.
					</span>
					<Button
						fullwidth
						style={clsx("rounded-md py-3 bg-main")}
						handleOnClick={() => {
							if (current?.isBlocked) {
								toast.warning("Tài khoản đã bị khóa tính năng thanh toán");
								return;
							}
							dispatch(showCart());
							navigate(`/${path.CHECKOUT}`);
						}}
					>
						Tiến hành thanh toán
					</Button>
				</div>
			)}
		</div>
	);
};

export default withBaseComponent(memo(Cart));
