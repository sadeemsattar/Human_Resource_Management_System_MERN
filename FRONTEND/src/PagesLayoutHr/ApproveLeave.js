import React from "react";

import { CssBaseline, makeStyles, MenuItem } from "@material-ui/core";

import HrLeaveTable from "../HrFoam/HrLeaveTable";

export default function ApproveLeave() {
  const columns = [
    { title: "EmployeeID", field: "EMP_ID", editable: false },
    { title: "Start Date", field: "START_DATE", editable: false },
    { title: "End Date", field: "END_DATE", editable: false },
    { title: "Reason", field: "REASON", editable: false },
    {
      title: "Leave Status",
      field: "LEAVE_STATUS",
      validate: (rowData) => {
        var reg_LEAVE_STATUS = /^[a-zA-Z\s]*$/;
        if (rowData.LEAVE_STATUS == undefined || rowData.LEAVE_STATUS == "") {
          return "Approved/DisApproved Input Only";
        } else if (!reg_LEAVE_STATUS.test(rowData.LEAVE_STATUS)) {
          return "Approved/DisApproved Input Only";
        } else if (
          rowData.LEAVE_STATUS.toLowerCase() !== "approved" &&
          rowData.LEAVE_STATUS.toLowerCase() !== "disapproved"
        ) {
          return "Invalid Input";
        } else if (
          rowData.LEAVE_STATUS.toLowerCase() === "approved" ||
          rowData.LEAVE_STATUS.toLowerCase() === "disapproved"
        ) {
          return true;
        }
        return false;
      },
    },
  ];

  return (
    <>
      <HrLeaveTable columns={columns} />

      <CssBaseline />
    </>
  );
}
