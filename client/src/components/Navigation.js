import React from "react";
import { navigation } from "../utils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="border-y mb-6 w-main h-[48px] py-2 flex items-center text-sm">
      {navigation.map((el) => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) =>
            isActive
              ? "pr-[30px] hover:text-main text-main"
              : "pr-[30px] hover:text-main"
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
