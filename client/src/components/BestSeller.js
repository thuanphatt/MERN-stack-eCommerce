import React, { useEffect, useState, memo } from "react";
import { apiGetProducts } from "../apis/product";
import { CustomerSlider } from "./";
import { getNewProducts } from "../store/products/asyncAction";
import { useDispatch, useSelector } from "react-redux";
const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
];
const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);
  // redux
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" });
    if (response?.success) {
      setBestSeller(response.products);
      setProducts(response.products);
    }
  };
  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <CustomerSlider products={products} activedTab={activedTab} />
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
