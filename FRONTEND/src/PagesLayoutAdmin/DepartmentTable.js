import React from "react";
import { CssBaseline } from "@material-ui/core";
import ManageDepartment from "../AdminFoam/ManageDepartment";
export default function DepartmentTable() {
  const columns = [
    {
      title: "Department ID",
      field: "DEPARTMENT_ID",
      editable: false,
    },
    {
      title: "Department Name",
      field: "DEPARTMENT_NAME",
      validate: (rowData) => {
        var reg_Department_Name = /^[a-zA-Z\s]*$/;
        if (
          rowData.DEPARTMENT_NAME == undefined ||
          rowData.DEPARTMENT_NAME == ""
        ) {
          return "Field Required";
        } else if (!reg_Department_Name.test(rowData.DEPARTMENT_NAME)) {
          return "Alphabet Is Required";
        }
        return true;
      },
    },
  ];

  return (
    <>
      <ManageDepartment columns={columns} />

      <CssBaseline />
    </>
  );
}
