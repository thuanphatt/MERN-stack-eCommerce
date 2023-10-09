import React, { memo, useRef, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

import logo from "assets/logo.png";
import { Button } from "components";
import { voteOptions } from "utils/contants";

const VoteOptions = ({ nameProduct, handleSubmitVoteOption }) => {
	const modalRef = useRef();
	const [chooseVote, setChooseVote] = useState(null);
	const [comment, setComment] = useState("");
	const [score, setScore] = useState("");
	useEffect(() => {
		modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
	});
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			ref={modalRef}
			className="bg-white w-[700px] flex flex-col gap-4 items-center justify-center p-4"
		>
			<img src={logo} alt="logo" className="w-[300px] h-[200px] object-contain" />
			<h2 className="text-center text-lg font-medium">{`Đánh giá sản phẩm ${nameProduct}`}</h2>
			<textarea
				cols="10"
				rows="5"
				className="outline outline-1 w-full p-2 placeholder:text-sm placeholder:text-gray-500"
				placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm"
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			></textarea>
			<div className="flex flex-col gap-4 w-full">
				<h2>Bạn cảm thấy thế nào về sản phẩm này?</h2>
				<div className="flex items-center justify-center gap-4">
					{voteOptions.map((el) => (
						<div
							key={el.id}
							className="flex bg-gray-200 cursor-pointer rounded-md p-4 flex-col items-center justify-center gap-2 w-[90px] h-[90px]"
							onClick={() => {
								setChooseVote(el.id);
								setScore(el.id);
							}}
						>
							{Number(chooseVote) && chooseVote >= el.id ? <AiFillStar color="orange" /> : <AiFillStar color="grey" />}
							<span>{el.text}</span>
						</div>
					))}
				</div>
			</div>
			<Button handleOnClick={() => handleSubmitVoteOption({ comment, score })} fullwidth>
				Gửi
			</Button>
		</div>
	);
};

export default memo(VoteOptions);
