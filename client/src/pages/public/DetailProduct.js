import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { apiGetProduct } from "../../apis/product";
import { Breakcrumb } from "../../components";

const DetailProduct = () => {
  const { pid, title } = useParams();
  const fetchProductData = async () => {
    const reponse = apiGetProduct(pid);
    console.log(reponse);
  };
  useEffect(() => {
    if (pid) fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid]);
  return (
    <div className="w-full">
      <div className="h-[81px] bg-gray-100 flex justify-center items-center">
        <div className="w-main">
          <h3> {title}</h3>
          <Breakcrumb />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
