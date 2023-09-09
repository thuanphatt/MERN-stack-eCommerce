import React from "react";
import { formatMoney } from "../utils/helpers";
const Product = ({ productData }) => {
  return (
    <div className="w-full text-base px-[10px]">
      <div className="w-full border p-[15px] flex flex-col items-center">
        <img
          src={
            productData?.thumb ||
            "https://stores.blackberrys.com/VendorpageTheme/Enterprise/EThemeForBlackberrys/images/product-not-found.jpg"
          }
          alt={productData.title}
          className="w-[243px] h-[243px] object-cover"
        ></img>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="line-clamp-1">{productData?.title}</span>

          <span>{formatMoney(productData?.price)}VND</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
