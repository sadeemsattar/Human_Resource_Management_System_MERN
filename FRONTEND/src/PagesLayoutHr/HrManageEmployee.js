import React from "react";

import { CssBaseline } from "@material-ui/core";

import HrManageEmployeeTable from "../HrFoam/HrManageEmployeeTable";

export default function HrManageEmployee() {
  const columns = [
    {
      title: "EMP ID",
      field: "EMP_ID",
      editable: false,
    },
    {
      title: "First Name",
      field: "FIRST_NAME",
      validate: (rowData) => {
        var reg_First_Name = /^[a-zA-Z\s]*$/;
        if (rowData.FIRST_NAME == undefined || rowData.FIRST_NAME == "") {
          return "Field Required";
        } else if (!reg_First_Name.test(rowData.FIRST_NAME)) {
          return "Alphabet Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Last Name",
      field: "LAST_NAME",
      validate: (rowData) => {
        var reg_Last_Name = /^[a-zA-Z\s]*$/;
        if (rowData.LAST_NAME == undefined || rowData.LAST_NAME == "") {
          return "Field Required";
        } else if (!reg_Last_Name.test(rowData.LAST_NAME)) {
          return "Alphabet Is Required";
        } else if (
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Email",
      field: "EMAIL",
      validate: (rowData) => {
        var reg_Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (rowData.EMAIL == undefined || rowData.EMAIL == "") {
          return "Field Required";
        } else if (!reg_Email.test(rowData.EMAIL)) {
          return "InValid Email";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Phone Number",
      field: "PHONE_NUMBER",
      validate: (rowData) => {
        var reg_Phone_Number = /^[0-9]+$/;
        if (rowData.PHONE_NUMBER == undefined || rowData.PHONE_NUMBER == "") {
          return "Field Required";
        } else if (!reg_Phone_Number.test(rowData.PHONE_NUMBER)) {
          return "Number Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "DOB",
      field: "DOB",
      validate: (rowData) => {
        var reg_DOB = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if (rowData.DOB == undefined || rowData.DOB == "") {
          return "Field Required";
        } else if (!reg_DOB.test(rowData.DOB)) {
          return "Invalid Date Format";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Hire Date",
      field: "HIRE_DATE",
      validate: (rowData) => {
        var reg_Hire_Date = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if (rowData.HIRE_DATE == undefined || rowData.HIRE_DATE == "") {
          return "Field Required";
        } else if (!reg_Hire_Date.test(rowData.HIRE_DATE)) {
          return "Invalid Date Format";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Address",
      field: "ADDRESS",
      validate: (rowData) => {
        var reg_Address = /^[a-zA-Z\s]*$/;
        if (rowData.ADDRESS == undefined || rowData.ADDRESS == "") {
          return "Field Required";
        } else if (!reg_Address.test(rowData.ADDRESS)) {
          return "Number Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "CNIC",
      field: "CNIC",
      validate: (rowData) => {
        var reg_CNIC = /^[0-9]+$/;
        if (rowData.CNIC == undefined || rowData.CNIC == "") {
          return "Field Required";
        } else if (!reg_CNIC.test(rowData.CNIC)) {
          return "Number Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "DEPARTMENT ID",
      field: "DEPARTMENT_ID",
      validate: (rowData) => {
        var reg_DEPARTMENT_ID = /^[0-9]+$/;
        if (rowData.DEPARTMENT_ID == undefined || rowData.DEPARTMENT_ID == "") {
          return "Field Required";
        } else if (!reg_DEPARTMENT_ID.test(rowData.DEPARTMENT_ID)) {
          return "Number Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "DESIGNATION ID",
      field: "DESIGNATION_ID",
      validate: (rowData) => {
        var reg_DESIGNATION_ID = /^[0-9]+$/;
        if (
          rowData.DESIGNATION_ID == undefined ||
          rowData.DESIGNATION_ID == ""
        ) {
          return "Field Required";
        } else if (!reg_DESIGNATION_ID.test(rowData.DESIGNATION_ID)) {
          return "Number Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
  ];

  return (
    <>
      <HrManageEmployeeTable
      // columns={columns}
      />

      <CssBaseline />
    </>
  );
}
