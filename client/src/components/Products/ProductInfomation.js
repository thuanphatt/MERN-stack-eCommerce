/* eslint-disable jsx-a11y/iframe-has-title */
import React, { memo, useState } from "react";

import { productInfoTabs } from "utils/contants";
import { getIdYoutube, renderStarFromNumber } from "utils/helpers";
import { Votebar, Button, VoteOptions, Comment } from "components";
import { apiRatings } from "apis";
import { showModal } from "store/app/appSlice";
import { useSelector } from "react-redux";
import path from "utils/path";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import withBaseComponent from "hocs/withBaseComponent";
const ProductInfomation = ({ totalRatings, ratings, nameProduct, pid, rerender, product, dispatch, navigate }) => {
	const [activedTab, setActivedTab] = useState(1);

	const { isLoggedIn } = useSelector((state) => state.user);
	const handleSubmitVoteOption = async ({ comment, score }) => {
		if (!comment || !pid || !score) {
			alert("Hãy đánh giá trước khi gửi");
			return;
		}
		const response = await apiRatings({ star: score, comment, pid: pid, updatedAt: Date.now() });
		if (response.success) {
			toast.success("Đánh giá sản phẩm thành công");
		} else toast.error(response.error);
		dispatch(
			showModal({
				isShowModal: false,
				modalChildren: null,
			})
		);
		rerender();
	};

	const handleVoteNow = () => {
		if (!isLoggedIn) {
			Swal.fire({
				text: "Đăng nhập để đánh giá",
				cancelButtonText: "Hủy",
				confirmButtonText: "Đăng nhập",
				showCancelButton: true,
				title: "Opps!",
			}).then((rs) => {
				if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
			});
		} else {
			dispatch(
				showModal({
					isShowModal: true,
					modalChildren: <VoteOptions nameProduct={nameProduct} handleSubmitVoteOption={handleSubmitVoteOption} />,
				})
			);
		}
	};
	return (
		<div>
			<div className="flex items-center gap-1 relative bottom-[-1px] w-main mx-auto">
				{productInfoTabs.map((el, index) => (
					<span
						key={index}
						className={`p-2 px-4 text-[#505050] cursor-pointer ${
							activedTab === el.id ? "bg-white border border-b-0" : "bg-[#f1f1f1]"
						}`}
						onClick={() => {
							setActivedTab(el.id);
						}}
					>
						{el.name.toUpperCase()}
					</span>
				))}
			</div>
			<div className="border p-4 w-main mx-auto">
				{productInfoTabs.some((el) => activedTab === el.id) &&
					productInfoTabs.find((el) => el.id === activedTab)?.content}
			</div>
			{product?.video && (
				<div className="w-full my-6">
					<iframe
						width="420"
						height="315"
						src={`https://www.youtube.com/embed/${getIdYoutube(product?.video)}?autoplay=1&mute=1&loop=1&controls=0`}
					></iframe>
				</div>
			)}
			<div className="py-8 w-main mx-auto">
				<div className="flex flex-col border p-2">
					<span className="p-2 px-4 text-[#505050]">ĐÁNH GIÁ CỦA NHỮNG KHÁCH HÀNG ĐÃ MUA</span>
					<div className="flex">
						<div className="flex-4 flex flex-col items-center justify-center gap-2">
							<span className="font-semibold text-[22px]">{`${
								Math.round((ratings?.reduce((sum, el) => sum + el.star, 0) * 10) / ratings?.length) / 10
							}/5`}</span>
							<span className="flex items-center gap-1">
								{renderStarFromNumber(totalRatings)?.map((el, index) => (
									<span key={index}>{el}</span>
								))}
							</span>
							<span className="underline text-blue-500">{`${ratings?.length} đánh giá`}</span>
						</div>
						<div className="flex-6 flex flex-col-reverse gap-2">
							{Array.from(Array(5).keys()).map((el, index) => (
								<Votebar
									key={index}
									number={el + 1}
									ratingCount={ratings?.filter((item) => item.star === el + 1)?.length}
									ratingTotal={ratings?.length}
								/>
							))}
						</div>
					</div>
					<div className="flex flex-col items-center justify-center p-4 text-sm gap-2">
						<span>Bạn đánh giá sao về sản phẩm này?</span>
						<Button handleOnClick={handleVoteNow}>Đánh giá ngay</Button>
					</div>
					<div className="flex flex-col gap-2">
						{ratings?.map((el, index) => (
							<Comment
								key={index}
								comment={el?.comment}
								star={el?.star}
								updatedAt={el?.updatedAt}
								name={`${el?.postedBy?.firstName} ${el?.postedBy?.lastName}`}
								img={el?.postedBy.avatar}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withBaseComponent(memo(ProductInfomation));
