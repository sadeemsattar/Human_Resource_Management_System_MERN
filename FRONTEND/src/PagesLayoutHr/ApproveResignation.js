import React from "react";
import TableTemplate from "../component/Table/TableTemplate";

import { CssBaseline } from "@material-ui/core";

import HrResignationTable from "../HrFoam/HrResignationTable";

export default function ApproveResignation() {
  const columns = [
    { title: "EmployeeID", field: "EMP_ID", editable: false },
    { title: "Apply Date", field: "APPLY_DATE", editable: false },
    { title: "Reason", field: "REASON", editable: false },
    {
      title: "Approved Status",
      field: "APPROVED_STATUS",
      validate: (rowData) => {
        var reg_APPROVED_STATUS = /^[a-zA-Z\s]*$/;
        if (
          rowData.APPROVED_STATUS == undefined ||
          rowData.APPROVED_STATUS == ""
        ) {
          return "Approved/DisApproved Input Only";
        } else if (!reg_APPROVED_STATUS.test(rowData.APPROVED_STATUS)) {
          return "Approved/DisApproved Input Only";
        } else if (
          rowData.APPROVED_STATUS.toLowerCase() !== "approved" &&
          rowData.APPROVED_STATUS.toLowerCase() !== "disapproved"
        ) {
          return "Invalid Input";
        } else if (
          rowData.APPROVED_STATUS.toLowerCase() === "approved" ||
          rowData.APPROVED_STATUS.toLowerCase() === "disapproved"
        ) {
          return true;
        }
        return false;
      },
    },
  ];

  return (
    <>
      <HrResignationTable columns={columns} />

      <CssBaseline />
    </>
  );
}
