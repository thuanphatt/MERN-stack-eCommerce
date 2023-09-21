import React, { useState, useCallback } from "react";
import Swal from "sweetalert2";

import { InputField, Button } from "../../components";
import { apiRegister, apiLogin } from "../../apis/user";
const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobile: "",
    });
  };
  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, phone, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      console.log(response);
      if (response.success) {
        Swal.fire("Congratulations", response.mes, "success").then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else {
        Swal.fire("Opps", response.mes, "error");
      }
    } else {
      const result = await apiLogin(data);
      console.log(result);
    }
  }, [payload, isRegister]);
  return (
    <div className="w-screen h-screen relative">
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
              />
              <InputField
                value={payload.lastName}
                setValue={setPayload}
                nameKey="lastName"
              />
            </div>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
          />
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey="mobile"
            />
          )}
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fullwidth
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer">
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
