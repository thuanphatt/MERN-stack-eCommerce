import React from "react";
import moment from "moment";
import "moment/locale/vi";
import { renderStarFromNumber } from "../utils/helpers";
const Comment = ({ img, name = "Anonymous", comment, updatedAt, star }) => {
	moment.locale("vi");
	return (
		<div className="flex gap-4">
			<div className="flex-none">
				<img
					src={img || "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"}
					alt="avatar"
					className="w-[25px] h-[25px] object-cover rounded-full"
				/>
			</div>
			<div className="flex flex-col flex-auto ">
				<div className="flex justify-between items-center">
					<h3 className="font-semibold">{name}</h3>
					<span className="italic text-sm">{moment(updatedAt)?.fromNow()}</span>
				</div>
				<div className="flex flex-col gap-2 pl-4 text-sm mt-4 border py-2 bg-gray-100 border-gray-300">
					<span className="flex items-center gap-2">
						<span className="font-semibold">Đánh giá:</span>
						<span className="flex items-center gap-1">
							{renderStarFromNumber(star)?.map((el, index) => (
								<span key={index}>{el}</span>
							))}
						</span>
					</span>
					<span className="flex gap-1">
						<span className="font-semibold">Nhận xét:</span>
						<span className="flex items-center gap-1">{comment}</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Comment;
