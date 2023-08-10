import React from "react";
import { Button } from "antd";
import Partner from "shared/partner";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Main;
