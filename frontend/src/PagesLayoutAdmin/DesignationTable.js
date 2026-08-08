import React from "react";

import { CssBaseline } from "@material-ui/core";
import ManageDesignation from "../AdminFoam/ManageDesignation";
export default function DesignationTable() {
  const columns = [
    {
      title: "Designation ID",
      field: "DESIGNATION_ID",
      editable: false,
    },
    {
      title: "Designation Name",
      field: "DESIGNATION_NAME",
      validate: (rowData) => {
        var reg_Designation_Name = /^[a-zA-Z\s]*$/;
        if (
          rowData.DESIGNATION_NAME == undefined ||
          rowData.DESIGNATION_NAME == ""
        ) {
          return "Field Required";
        } else if (!reg_Designation_Name.test(rowData.DESIGNATION_NAME)) {
          return "Alphabet Is Required";
        } else if (
          (rowData.BASIC_SALARY != undefined || rowData.BASIC_SALARY != "") &&
          (rowData.ALLOUNCE != undefined || rowData.ALLOUNCE != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Basic Salary",
      field: "BASIC_SALARY",
      validate: (rowData) => {
        var reg_numbers = /^[0-9]+$/;
        if (rowData.BASIC_SALARY == undefined || rowData.BASIC_SALARY == "") {
          return "Field Required";
        } else if (!reg_numbers.test(rowData.BASIC_SALARY)) {
          return "Number Is Required";
        } else if (
          (rowData.DESIGNATION_NAME != undefined ||
            rowData.DESIGNATION_NAME != "") &&
          (rowData.ALLOUNCE != undefined || rowData.ALLOUNCE != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Allounce",
      field: "ALLOUNCE",
      validate: (rowData) => {
        var reg_numbers = /^[0-9]+$/;
        if (rowData.ALLOUNCE == undefined || rowData.ALLOUNCE == "") {
          return "Field Required";
        } else if (!reg_numbers.test(rowData.ALLOUNCE)) {
          return "Number Is Required";
        } else if (
          (rowData.DESIGNATION_NAME != undefined ||
            rowData.DESIGNATION_NAME != "") &&
          (rowData.BASIC_SALARY != undefined || rowData.BASIC_SALARY != "")
        ) {
          return true;
        }
        return false;
      },
    },
  ];

  return (
    <>
      <ManageDesignation columns={columns} />

      <CssBaseline />
    </>
  );
}
