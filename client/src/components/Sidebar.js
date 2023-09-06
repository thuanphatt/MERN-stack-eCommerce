import React from "react";
import { useEffect, useState } from "react";
import { apiGetCategories } from "../apis/app";
// import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const [categories, setCategories] = useState(null);
  const fetchCategories = async () => {
    const response = await apiGetCategories();
    if (response.success) setCategories(response.prodcategory);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      {/* <ul>
      {categories.map(el => (
        <li>{categories.}</li>
      ))}
    </ul> */}
    </div>
  );
};

export default Sidebar;
