import React from "react";

const Product = ({ productData }) => {
  return (
    <div className="w-1/3">
      <img
        src={productData?.images[0] || ""}
        alt={productData.title}
        className="w-full object-contain"
      ></img>
    </div>
  );
};

export default Product;
