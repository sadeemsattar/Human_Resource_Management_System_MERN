import React from "react";
import Sidebar from "../component/Sidebar/Sidebar";
import Main from "../component/Main/Main";
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
      text: "HR Dash Board",
      icon: <DashboardIcon color="#69F0AE" />,
      path: "/HR-DashBoard",
    },
    {
      text: "View Profile",
      icon: <AccountCircleIcon color="#69F0AE" />,
      path: "HR-Profile",
    },
    // {
    //   text: "Add Employee",
    //   icon: <PersonAddIcon color="#69F0AE" />,
    //   path: "HR-Employee-Foam",
    // },
    {
      text: "Manage Employee",
      icon: <PersonAddIcon color="#69F0AE" />,
      path: "HR-ManageEmployee-Foam",
    },
    {
      text: "Approve Leave",
      icon: <AddCircleIcon color="#69F0AE" />,
      path: "HR-ApproveLeave-Foam",
    },
    {
      text: "Approve Resignation",
      icon: <AddCircleIcon color="#69F0AE" />,
      path: "HR-ApproveResignation-Foam",
    },
    {
      text: "Generate Payroll",
      icon: <AddCircleIcon color="#69F0AE" />,
      path: "HR-GeneratePayroll-Foam",
    },
  ];

  const Items = [
    {
      text: "Number Of Employees",
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(255, 231, 217)",
    },
    {
      text: "Number Of Department",
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(255, 247, 205)",
    },
    {
      text: "Number Of Projects",
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(208, 242, 255)",
    },
    {
      text: "Number Of Resignation",
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(200, 250, 205)",
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
