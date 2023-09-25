import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { InputField, Button } from "../../components";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis/user";
import path from "../../utils/path";
import { login } from "../../store/user/userSlice";
import { validate } from "../../utils/helpers";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    const invalids = isRegister
      ? validate(payload, setInvalidField)
      : validate(data, setInvalidField);
    if (invalids === 0) {
      if (isRegister) {
        const response = await apiRegister(payload);
        console.log(response);
        if (response.success) {
          setIsVerifiedEmail(true);
        } else {
          Swal.fire("Opps", response.mes, "error");
        }
      } else {
        const result = await apiLogin(data);

        dispatch(
          login({
            isLoggedIn: true,
            token: result.accessToken,
            current: result.userData,
          })
        );
        if (result.success) {
          navigate(`/${path.HOME}`);
        } else {
          Swal.fire("Opps", result.mes, "error");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, isRegister]);

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    // console.log("times");
    if (response.success) {
      toast.success(response.mes);
    } else {
      toast.error(response.mes);
    }
  };
  const handleFinalRegister = async () => {
    const response = await apiFinalRegister(token);
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
            <h4 className="">
              Chúng tôi đã 1 đoạn mã code đến email của bạn. Hãy kiểm tra mail
              và điền mã code vào bên dưới:
            </h4>
            <input
              type="text"
              className="w-[800px] border py-2 outline-none placeholder:text-sm rounded-md mr-2 pl-2"
              placeholder="Nhập mã code của bạn tại đây ..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
            ></input>
            <Button name="Gửi" handleOnClick={handleFinalRegister} />
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="absolute right-0 left-0 top-0 bottom-0 bg-white z-50 flex flex-col items-center py-8 animate-slide-right">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Enter your mail:</label>
            <input
              type="text"
              name="email"
              className="w-[800px] border-b pb-2 outline-none placeholder:text-sm"
              placeholder="Example : email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="flex items-center justify-end w-[800px] gap-4">
            <Button name="Submit" handleOnClick={handleForgotPassword} />
            <Button
              name="Back"
              handleOnClick={() => {
                setIsForgotPassword(false);
              }}
              // eslint-disable-next-line react/style-prop-object
              style="px-4 py-2 rounded-md text-white bg-red-500 font-semibold my-2"
            />
          </div>
        </div>
      )}
      <img
        src="https://vir.com.vn/stores/news_dataimages/hung/122019/29/17/p24-digital-transformation-key-driver-for-agriculture.jpg"
        alt=""
        className="w-full h-full object-cover"
      ></img>
      <div className="absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center">
        <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center justify-center">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
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
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
            invalidField={invalidField}
            setInvalidField={setInvalidField}
          />

          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fullwidth
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                  setIsForgotPassword(true);
                }}
              >
                Forgot your acount
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create acount
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                onClick={() => setIsRegister(false)}
              >
                Go Login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
