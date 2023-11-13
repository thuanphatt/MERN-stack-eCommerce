import React, { memo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillEye } from "react-icons/ai";
import { BiSolidHide } from "react-icons/bi";

import { Button, Loading } from "components";
import { apiResetPassword } from "apis/user";
import { showModal } from "store/app/appSlice";
import path from "utils/path";
import resetpassword from "assets/resetpassword.png";
import withBaseComponent from "hocs/withBaseComponent";
const ResetPassword = ({ dispatch, navigate }) => {
	const [password, setPassword] = useState("");
	const [isShow, setIsShow] = useState(false);
	const { token } = useParams();

	const handleResetPassword = async () => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiResetPassword({ password, token });
		dispatch(showModal({ isShowModal: false, modalChildren: null }));

		if (response.success) {
			toast.success(response.mes);
			navigate(`/${path.LOGIN}`);
		} else {
			toast.error(response.mes);
		}
	};
	return (
		<div className="absolute right-0 left-0 top-0 bottom-0 bg-white z-50 flex flex-col items-center gap-10">
			<h1 className="h-[75px] flex items-center justify-between text-3xl font-bold px-4 border-b w-full tracking-tight ">
				<span> Cập nhật mật khẩu</span>
			</h1>
			<div className="flex items-center justify-between gap-10">
				<img src={resetpassword} alt="resetpassword" className="object-contain w-[350px]" />
				<div className="w-full">
					<div className="flex flex-col gap-4 relative my-4">
						<label htmlFor="password">Nhập mật khẩu mới của bạn:</label>
						<input
							type={`${isShow ? "text" : "password"}`}
							name="password"
							className="w-[400px] border-b pb-2 outline-none placeholder:text-sm"
							placeholder="Nhập mật khẩu mới của bạn ..."
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
						<span
							className="absolute right-0 top-[50%] cursor-pointer p-2"
							onClick={() => {
								setIsShow(!isShow);
							}}
						>
							{isShow ? <AiFillEye /> : <BiSolidHide />}
						</span>
					</div>
					<div className="flex items-center justify-end w-[400px] gap-4">
						<Button handleOnClick={handleResetPassword}>Cập nhật</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default withBaseComponent(memo(ResetPassword));
