import React from "react";
import { Outlet } from "react-router-dom";

import { CssBaseline, makeStyles, TableBody } from "@material-ui/core";

import GeneratePayrollTable from "../HrFoam/GeneratePayrollTable";

export default function GeneratePayroll() {
  const columns = [
    { title: "Employee_ID", field: "EMP_ID", editable: false },
    {
      title: "Basic Salary",
      field: "SALARY",
      validate: (rowData) => {
        var reg_Basic_Salary = /^[0-9]+$/;
        if (rowData.SALARY == undefined || rowData.SALARY === "") {
          return "Field Required";
        } else if (!reg_Basic_Salary.test(rowData.SALARY)) {
          return "Number Is Required";
        }
        {
          return true;
        }
        return false;
      },
    },

    // {
    //   title: "Alloounce",
    //   field: "",
    //   validate: (rowData) => {
    //     var reg_Allounce = /^[0-9]+$/;
    //     if (rowData.Allounce == undefined || rowData.Allounce === "") {
    //       return "Field Required";
    //     } else if (!reg_Allounce.test(rowData.Allounce)) {
    //       return "Number Is Required";
    //     } else if (rowData.Basic_Salary != "" || rowData.Basic_Salary != "") {
    //       return true;
    //     }
    //     return false;
    //   },
    // },
    {
      title: "Date",
      field: "SALARY_DATE",
      editable: false,
    },
  ];

  return (
    <>
      <GeneratePayrollTable columns={columns} />
      <Outlet />
      <CssBaseline />
    </>
  );
}
