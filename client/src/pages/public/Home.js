import React from "react";
import { Sidebar, Banner } from "../../components";
const Home = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[30%] flex-auto border">
        <Sidebar />
        <span>Daily Deal</span>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[70%] flex-auto border">
        <Banner />
        <span>Best Seller</span>
      </div>
    </div>
  );
};

export default Home;
