import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis/product";
import Product from "./Product";
import Slider from "react-slick";
const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
  { id: 3, name: "tablet" },
];
var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) setBestSeller(response[0].products);
    if (response[1]?.success) setNewProducts(response[1].products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="flex gap-8 pb-4 border-b-2 border-main ">
        {tabs.map((el) => (
          <span
            className={`font-semibold border-r cursor-pointer uppercase text-gray-500 ${
              activedTab === el.id ? "text-gray-950" : ""
            }`}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-2">
        <Slider {...settings}>
          {bestSeller?.map((el) => (
            <Product key={el._id} productData={el} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;
