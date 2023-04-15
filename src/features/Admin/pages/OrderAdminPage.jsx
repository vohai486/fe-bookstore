import { Box, Paper, styled } from "@mui/material";
import React from "react";

import { NavLink, Route, Routes } from "react-router-dom";
import ListOrder from "../components/order/ListOrder";
import OrderDetails from "../components/order/OrderDetails";

const BoxMain = styled(Box)(({ theme }) => ({
  svg: {
    fontSize: "1rem",
  },
  fontSize: ".875rem",
  color: theme.palette.black.main,
  ".heading": {
    cursor: "pointer",
    padding: "1rem",
    marginBottom: "1rem",
    fontSize: "1.25rem",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      borderRadius: ".25rem",
      fontSize: ".875rem",
      width: "176px",
      height: "40px",
      color: theme.palette.background.main,
      background: theme.palette.second.main,
    },
  },
}));

const OrderAdminPage = () => {
  return (
    <BoxMain elevation={0}>
      <Paper elevation={0} className="heading">
        <NavLink to="/admin/orders">Danh sách Đơn Hàng</NavLink>
      </Paper>
      <Routes>
        <Route index element={<ListOrder />}></Route>
        <Route path="/:id" element={<OrderDetails />}></Route>
      </Routes>
    </BoxMain>
  );
};

export default OrderAdminPage;
