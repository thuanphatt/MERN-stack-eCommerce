import React from "react";
import {
  Sidebar,
  Banner,
  BestSeller,
  // DailyDeal,
  FeatureProduct,
  CustomerSlider,
} from "../../components";
import { useSelector } from "react-redux";

const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  console.log(newProducts);
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          {/* <DailyDeal /> */}
        </div>
        <div className="flex flex-col gap-8 pl-5 w-[75%] flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-4">
        <FeatureProduct />
      </div>
      <div className="my-4 w-full">
        <h2 className="py-[15px] text-xl font-[#151515] uppercase font-semibold border-b-2 border-main">
          new arrivals
        </h2>
        <div className="mt-2 mx-[-10px] pt-3">
          <CustomerSlider products={newProducts} />
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
};

export default Home;
