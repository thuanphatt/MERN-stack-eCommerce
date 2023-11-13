import React, { useState, useCallback, useEffect, memo } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { InputField, Button, Loading } from "components";
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister } from "apis/user";
import path from "utils/path";
import { login } from "store/user/userSlice";
import { validate } from "utils/helpers";
import { showModal } from "store/app/appSlice";
import { AiFillEye } from "react-icons/ai";
import { BiSolidHide } from "react-icons/bi";
const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [payload, setPayload] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		mobile: "",
	});
	const [isRegister, setIsRegister] = useState(false);
	const [email, setEmail] = useState("");
	const [token, setToken] = useState("");
	const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
	const [isForgotPassword, setIsForgotPassword] = useState(false);
	const [invalidField, setInvalidField] = useState([]);
	const [isShow, setIsShow] = useState(false);

	const resetPayload = () => {
		setPayload({
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			mobile: "",
		});
	};
	useEffect(() => {
		resetPayload();
	}, [isRegister]);
	const handleSubmit = useCallback(async () => {
		const { firstName, lastName, mobile, ...data } = payload;
		const invalids = isRegister ? validate(payload, setInvalidField) : validate(data, setInvalidField);
		if (invalids === 0) {
			if (isRegister) {
				const response = await apiRegister(payload);
				if (response.success) {
					setIsVerifiedEmail(true);
				} else {
					Swal.fire("Opps", response.mes, "error");
				}
			} else {
				dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
				const result = await apiLogin(data);
				dispatch(showModal({ isShowModal: false, modalChildren: null }));
				if (result.success) {
					dispatch(
						login({
							isLoggedIn: true,
							token: result.accessToken,
							current: result.userData,
						})
					);
					searchParams.get("redirect") ? navigate(searchParams.get("redirect")) : navigate(`/${path.HOME}`);
				} else {
					Swal.fire("Opps", result.mes, "error");
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [payload, isRegister]);

	const handleForgotPassword = async () => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiForgotPassword({ email });
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			toast.success(response.mes);
		} else {
			toast.error(response.mes);
		}
	};
	const handleFinalRegister = async () => {
		dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
		const response = await apiFinalRegister(token);
		dispatch(showModal({ isShowModal: false, modalChildren: null }));
		if (response.success) {
			Swal.fire("Xin chúc mừng", response.mes, "success").then(() => {
				setIsRegister(false);
				resetPayload();
			});
		} else Swal.fire("Opps", response.mes, "error");
		setIsVerifiedEmail(false);
		setToken("");
	};
	return (
		<div className="w-screen h-screen relative">
			{isVerifiedEmail && (
				<div className="absolute right-0 left-0 top-0 bottom-0 bg-overlay z-50 flex flex-col items-center justify-center">
					<div className=" bg-white w-[1000px] rounded-md p-6">
						<h4>Chúng tôi đã 1 đoạn mã code đến email của bạn. Hãy kiểm tra mail và điền mã code vào bên dưới:</h4>
						<input
							type="text"
							className="w-[800px] border py-2 outline-none placeholder:text-sm rounded-md mr-2 pl-2"
							placeholder="Nhập mã code của bạn tại đây ..."
							value={token}
							onChange={(e) => setToken(e.target.value)}
						></input>
						<Button handleOnClick={handleFinalRegister}>Gửi</Button>
					</div>
				</div>
			)}
			{isForgotPassword && (
				<div className="absolute right-0 left-0 top-0 bottom-0 bg-white z-50 flex flex-col items-center py-8 animate-slide-right">
					<div className="flex flex-col gap-4">
						<label htmlFor="email">Nhập email của bạn:</label>
						<input
							type="text"
							name="email"
							className="w-[800px] border-b pb-2 outline-none placeholder:text-sm"
							placeholder="VD : email@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></input>
					</div>
					<div className="flex items-center justify-end w-[800px] gap-4">
						<Button handleOnClick={handleForgotPassword}>Gửi</Button>
						<Button
							handleOnClick={() => {
								setIsForgotPassword(false);
							}}
							// eslint-disable-next-line react/style-prop-object
							style="px-4 py-2 rounded-md text-white bg-red-500 font-semibold my-2"
						>
							Quay lại
						</Button>
					</div>
				</div>
			)}
			<img
				src="https://vir.com.vn/stores/news_dataimages/hung/122019/29/17/p24-digital-transformation-key-driver-for-agriculture.jpg"
				alt=""
				className="w-full h-full object-cover"
			></img>
			<div className="absolute top-1/2 bottom-1/2 left-1/2 right-1/2 flex items-center justify-center">
				<div className="p-8 bg-white rounded-md min-w-[730px] flex flex-col items-center justify-center">
					<h1 className="text-[28px] font-semibold text-main mb-8">{isRegister ? "Đăng ký" : "Đăng nhập"}</h1>
					{isRegister && (
						<div className="flex items-center gap-2 justify-center relative">
							<InputField
								value={payload.firstName}
								setValue={setPayload}
								nameKey="firstName"
								invalidField={invalidField}
								setInvalidField={setInvalidField}
							/>
							<InputField
								value={payload.lastName}
								setValue={setPayload}
								nameKey="lastName"
								invalidField={invalidField}
								setInvalidField={setInvalidField}
							/>
							<InputField
								value={payload.mobile}
								setValue={setPayload}
								nameKey="mobile"
								invalidField={invalidField}
								setInvalidField={setInvalidField}
							/>
						</div>
					)}
					<InputField
						fullWidth
						value={payload.email}
						setValue={setPayload}
						nameKey="email"
						invalidField={invalidField}
						setInvalidField={setInvalidField}
					/>
					<InputField
						fullWidth
						value={payload.password}
						setValue={setPayload}
						nameKey="password"
						type={`${isShow ? "text" : "password"}`}
						invalidField={invalidField}
						setInvalidField={setInvalidField}
					/>
					{payload.password && isRegister && (
						<span
							className="absolute right-[-330px] top-[34px] cursor-pointer p-2"
							onClick={() => {
								setIsShow(!isShow);
							}}
						>
							{isShow ? <AiFillEye /> : <BiSolidHide />}
						</span>
					)}
					{payload.password && !isRegister && (
						<span
							className="absolute right-[-330px] top-[-2px] cursor-pointer p-2"
							onClick={() => {
								setIsShow(!isShow);
							}}
						>
							{isShow ? <AiFillEye /> : <BiSolidHide />}
						</span>
					)}
					<Button handleOnClick={handleSubmit} fullwidth>
						{isRegister ? "Đăng ký" : "Đăng nhập"}
					</Button>
					<div className="flex items-center justify-between my-2 w-full text-sm">
						{!isRegister && (
							<span
								className="text-blue-500 hover:underline cursor-pointer"
								onClick={() => {
									setIsForgotPassword(true);
								}}
							>
								Quên mật khẩu
							</span>
						)}
						{!isRegister && (
							<span className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsRegister(true)}>
								Tạo tài khoản
							</span>
						)}
						{isRegister && (
							<span
								className="text-blue-500 hover:underline cursor-pointer w-full text-center"
								onClick={() => setIsRegister(false)}
							>
								Đăng nhập
							</span>
						)}
					</div>
					<Link to={`/${path.HOME}`} className="text-blue-500 hover:underline cursor-pointer text-sm">
						Trang chủ?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default memo(Login);
