import React, { useState, useCallback, useEffect, memo } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import logo from "assets/logo.png";
import { InputField, Button, Loading } from "components";
import img from "assets/login.png";
import { apiRegister, apiLogin, apiForgotPassword } from "apis/user";
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
					Swal.fire("Congratulation", response.mes, "success").then(() => {
						setIsRegister(false);
					});
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
	// const handleFinalRegister = async () => {
	// 	dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
	// 	const response = await apiFinalRegister(token);
	// 	dispatch(showModal({ isShowModal: false, modalChildren: null }));
	// 	if (response.success) {
	// 		Swal.fire("Xin chúc mừng", response.mes, "success").then(() => {
	// 			setIsRegister(false);
	// 			resetPayload();
	// 		});
	// 	} else Swal.fire("Opps", response.mes, "error");
	// 	setIsVerifiedEmail(false);
	// 	setToken("");
	// };
	return (
		<div className="md:w-screen w-full h-screen relative grid md:grid-cols-10">
			{isForgotPassword && (
				<div className="absolute right-0 left-0 top-0 bottom-0 bg-white z-50 flex flex-col items-center py-8 animate-slide-right">
					<div className="flex items-center flex-col justify-center bg-[#F3EEEA] rounded-lg py-6 my-auto">
						<div className="flex items-center justify-center">
							<img
								src="https://cdni.iconscout.com/illustration/premium/thumb/forgot-password-mobile-8044866-6430775.png?f=webp"
								alt="forgot-password"
								className="w-[70%] h-auto object-contain"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<h2 className="font-bold text-2xl text-main mb-4">Quên mật khẩu</h2>
							<label htmlFor="email">Nhập email của bạn:</label>
							<input
								type="text"
								name="email"
								className="w-full border-b md:p-2 my-2 outline-none placeholder:text-sm"
								placeholder="VD : email@gmail.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></input>
							<div className="flex items-center justify-between">
								<Button
									handleOnClick={() => {
										setIsForgotPassword(false);
									}}
									// eslint-disable-next-line react/style-prop-object
									style="px-4 py-2 rounded-md text-white bg-red-500 font-semibold my-2"
								>
									Quay lại
								</Button>
								<Button handleOnClick={handleForgotPassword}>Gửi</Button>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="col-span-6 md:flex items-center justify-center hidden">
				<img src={img} alt="anh login" className="w-full h-full object-contain" />
			</div>
			<div className="md:col-span-4 w-full flex items-center justify-center bg-[#F3EEEA]">
				<div className="p-8 bg-white rounded-md md:min-w-[430px] min-w-[350px] flex flex-col items-center justify-center relative md:max-h-[665px] md:mx-0 mx-4">
					<div className="flex flex-col items-center gap-2">
						<Link to={`/${path.HOME}`} className="flex items-center justify-center">
							<img src={logo} alt="logo" className="w-[100px] h-[80px] object-contain"></img>
						</Link>
						<span className="font-bold text-2xl">Xin chào</span>
						<span className="text-sm text-gray-500">{`Hãy ${
							isRegister ? "đăng ký" : "đăng nhập"
						} bằng email của bạn`}</span>
					</div>
					<h1 className="text-[28px] font-semibold text-main my-8">{isRegister ? "Đăng ký" : "Đăng nhập"}</h1>
					{isRegister && (
						<div className="flex items-center justify-center relative flex-col">
							<div className="flex items-center gap-2">
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
							</div>
							<div className="w-full my-1"></div>
							<div className="w-full">
								<InputField
									value={payload.mobile}
									setValue={setPayload}
									nameKey="mobile"
									fullWidth
									invalidField={invalidField}
									setInvalidField={setInvalidField}
								/>
							</div>
							<div className="w-full my-1"></div>
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
					<div className="w-full my-1"></div>
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
							className="absolute right-[36px] md:bottom-[122px] bottom-[156px] cursor-pointer p-2"
							onClick={() => {
								setIsShow(!isShow);
							}}
						>
							{isShow ? <AiFillEye /> : <BiSolidHide />}
						</span>
					)}
					{payload.password && !isRegister && (
						<span
							className="absolute right-[36px] md:bottom-[156px] bottom-[158px] cursor-pointer p-2"
							onClick={() => {
								setIsShow(!isShow);
							}}
						>
							{isShow ? <AiFillEye /> : <BiSolidHide />}
						</span>
					)}
					<div className="w-full my-1"></div>
					<Button handleOnClick={handleSubmit} fullwidth>
						{isRegister ? "Đăng ký" : "Đăng nhập"}
					</Button>
					<div className="flex items-center justify-between my-2 w-full text-sm">
						{!isRegister && (
							<span
								className="text-black opacity-50 hover:underline cursor-pointer"
								onClick={() => {
									setIsForgotPassword(true);
								}}
							>
								Quên mật khẩu?
							</span>
						)}
						{!isRegister && (
							<span className="text-black hover:underline cursor-pointer" onClick={() => setIsRegister(true)}>
								Tạo tài khoản
							</span>
						)}
						{isRegister && (
							<span
								className="text-black hover:underline cursor-pointer w-full text-center"
								onClick={() => setIsRegister(false)}
							>
								Đăng nhập
							</span>
						)}
					</div>
				</div>
			</div>
			<div className="md:hidden block h-[100px]"></div>
		</div>
	);
};

export default memo(Login);
