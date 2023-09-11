import React, { useEffect } from "react";
import { Home, Login, Public } from "./pages/public";
import { Route, Routes } from "react-router-dom";
import path from "./utils/path";
import { getCategories } from "./store/asyncAction";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
