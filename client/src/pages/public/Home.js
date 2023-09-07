import React from "react";
import { Sidebar, Banner } from "../../components";
const Home = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[20%] flex-auto">
        <Sidebar />
        <span>Daily Deal</span>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[80%] flex-auto">
        <Banner />
        <span>Best Seller</span>
      </div>
    </div>
  );
};

export default Home;
