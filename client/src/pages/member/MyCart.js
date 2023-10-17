import { OrderItem } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatMoney, formatPrice } from "utils/helpers";
import path from "utils/path";

const MyCart = () => {
	const { currentCart } = useSelector((state) => state.user);

	return (
		<div className="flex flex-col justify-start w-full">
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3 className="uppercase font-semibold mb-1 text-2xl"> Giỏ hàng của tôi</h3>
				</div>
			</div>
			{currentCart.length > 0 ? (
				<div className="flex flex-col border mt-8 w-main mx-auto py-8">
					<div className="grid grid-cols-10 w-main mx-auto font-bold bg-gray-200 py-2">
						<span className="w-full text-center col-span-6">Product</span>
						<span className="w-full text-center col-span-1">Số lượng</span>
						<span className="w-full text-center col-span-3">Giá</span>
					</div>
					{currentCart?.map((el) => (
						<OrderItem
							el={el?.product}
							key={el?._id}
							quantity={el.quantity}
							color={el.color}
							title={el.title}
							thumb={el.thumbnail}
							price={el.price}
							pid={el.product._id}
						/>
					))}
					<div className="w-main mx-auto flex flex-col items-end gap-3 my-4 p-4">
						<div className="flex items-center justify-between gap-4">
							<span>Tổng cộng:</span>
							<h2 className="font-bold">{`${formatMoney(
								formatPrice(currentCart?.reduce((sum, el) => +el.price * el.quantity + sum, 0))
							)} VND`}</h2>
						</div>
						<span className="text-sm italic text-gray-500">
							Vận chuyển, thuế và giảm giá được tính khi thanh toán. Cập nhật giỏ hàng
						</span>
						<Link to={`/${path.CHECKOUT}`} className="bg-main px-4 py-2 text-white rounded-md">
							Thanh toán
						</Link>
					</div>
				</div>
			) : (
				<div className="w-main mx-auto text-center h-screen p-4 flex flex-col items-center gap-4 justify-center">
					<h2 className="text-gray-500 font-bold text-2xl">Giỏ hàng rỗng</h2>
					<img
						src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg"
						alt="Giỏ hàng rỗng"
						className="w-[300px] h-[300px] object-cover"
					/>
				</div>
			)}
		</div>
	);
};

export default withBaseComponent(memo(MyCart));
