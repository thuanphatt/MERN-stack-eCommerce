import { Breakcrumb, Button, OrderItem } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { formatMoney, formatPrice } from "utils/helpers";

const CartDetail = ({ location }) => {
	const { current } = useSelector((state) => state.user);
	return (
		<div className="flex flex-col justify-start w-full">
			<div className="h-[81px] bg-gray-100 flex justify-center items-center">
				<div className="w-main">
					<h3 className="uppercase font-semibold mb-1"> Giỏ hàng của tôi</h3>
					<Breakcrumb title={location?.pathname} />
				</div>
			</div>
			<div className="flex flex-col border mt-8 w-main mx-auto py-8">
				<div className="grid grid-cols-10 w-main mx-auto font-bold bg-gray-200 py-2">
					<span className="w-full text-center col-span-6">Product</span>
					<span className="w-full text-center col-span-1">Số lượng</span>
					<span className="w-full text-center col-span-3">Giá</span>
				</div>
				{current?.cart?.map((el) => (
					<OrderItem el={el} key={el._id} />
				))}
				<div className="w-main mx-auto flex flex-col items-end gap-3 my-4 p-4">
					<div className="flex items-center justify-between gap-4">
						<span>Tổng cộng:</span>
						<h2 className="font-bold">{`${formatMoney(
							formatPrice(current?.cart?.reduce((sum, el) => +el.price + sum, 0))
						)} VND`}</h2>
					</div>
					<span className="text-sm italic text-gray-500">
						Vận chuyển, thuế và giảm giá được tính khi thanh toán. Cập nhật giỏ hàng
					</span>
					<Button>Thanh toán</Button>
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(CartDetail));
