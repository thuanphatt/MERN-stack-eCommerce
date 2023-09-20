import React, { useState, useCallback } from "react";
import { InputField, Button } from "../../components";
const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
  });
  const handleSubmit = useCallback(() => {
    console.log(payload);
  }, [payload]);
  return (
    <div className="w-screen h-screen relative">
      <img
        src="https://vir.com.vn/stores/news_dataimages/hung/122019/29/17/p24-digital-transformation-key-driver-for-agriculture.jpg"
        alt=""
        className="w-full h-full object-cover"
      ></img>
      <div className="absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center">
        <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center justify-center">
          <h1 className="text-[28px] font-semibold text-main mb-8">Login</h1>
          <InputField
            value={payload.name}
            setValue={setPayload}
            nameKey="name"
          />
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
          <Button name="Login" handleOnClick={handleSubmit} fullwidth />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            <span className="text-blue-500 hover:underline cursor-pointer">
              Forgot your acount
            </span>
            <span className="text-blue-500 hover:underline cursor-pointer">
              Create acount
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
