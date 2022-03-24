import React from "react";
import Sidebar from "../component/Sidebar/Sidebar";

import Header from "../component/Header/Header.js";
import { CssBaseline, makeStyles, MenuItem } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PersonIcon from "@material-ui/icons/Person";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles({
  appHeader: {
    paddingLeft: "320px",
    width: "100%",
  },
});
export default function AdminDashBoard() {
  const classes = useStyles();

  const menuItems = [
    {
      text: "Admin Dash Board",
      icon: <DashboardIcon color="#69F0AE" />,
      path: "/Admin-DashBoard",
    },
    {
      text: "View Profile",
      icon: <AccountCircleIcon color="#69F0AE" />,
      path: "Admin-Profile",
    },
    // {
    //   text: "Add HR",
    //   icon: <PersonAddIcon color="#69F0AE" />,
    //   path: "Admin-HR-Foam",
    // },

    {
      text: "Manage Designation",
      icon: <AddCircleIcon color="#69F0AE" />,
      path: "Admin-Designation-Table",
    },
    {
      text: "Manage Department",
      icon: <AddCircleIcon color="#69F0AE" />,
      path: "Admin-Department-Table",
    },
    {
      text: "Manage HR",
      icon: <AddCircleIcon color="#69F0AE" />,
      path: "Admin-HR-Table",
    },
  ];

  return (
    <>
      <Sidebar menuItems={menuItems} />
      <div className={classes.appHeader}>
        <Header />

        <Outlet />
      </div>

      <CssBaseline />
    </>
  );
}
