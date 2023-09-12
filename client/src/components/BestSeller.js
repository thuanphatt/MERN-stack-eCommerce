import React, { useEffect, useState, memo } from "react";
import { apiGetProducts } from "../apis/product";
import Product from "./Product";
import Slider from "react-slick";
const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
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
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) {
      setBestSeller(response[0].products);
      setProducts(response[0].products);
    }
    if (response[1]?.success) setNewProducts(response[1].products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSeller);
    if (activedTab === 2) setProducts(newProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activedTab]);
  return (
    <div>
      <div className="flex ml-[-32px]">
        {tabs.map((el) => (
          <span
            className={`font-semibold text-xl border-r px-8 cursor-pointer uppercase text-gray-500 ${
              activedTab === el.id ? "text-gray-950" : ""
            }`}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full border-b-2 border-main mt-3"></div>
      <div className="mt-2 mx-[-10px] pt-3">
        <Slider {...settings}>
          {products?.map((el) => (
            <Product
              key={el._id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
            />
          ))}
        </Slider>
      </div>
      <div className="flex gap-4 mt-5">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner1"
          className="flex-1 object-contain"
        ></img>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner1"
          className="flex-1 object-contain"
        ></img>
      </div>
    </div>
  );
};

export default memo(BestSeller);
