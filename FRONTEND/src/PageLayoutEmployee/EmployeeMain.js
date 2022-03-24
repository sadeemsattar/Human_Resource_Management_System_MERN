import React from "react";
import Main from "../component/Main/Main";
import { CssBaseline } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

export default function EmployeeMain() {
  const Items = [
    {
      text: "Number Of Projects",
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(255, 231, 217)",
    },
    {
      text: "Leave Status",
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(255, 247, 205)",
    },
    {
      text: "Payroll Status",
      icon: <PersonIcon fontSize="large" color="secondary" />,
      background: "rgb(208, 242, 255)",
    },
  ];
  return (
    <>
      <Main name="Sadeem" Items={Items} />

      <CssBaseline />
    </>
  );
}
