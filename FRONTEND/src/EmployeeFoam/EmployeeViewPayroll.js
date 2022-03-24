import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  content: { padding: theme.spacing(4), margin: theme.spacing(3) },
}));
const columns = [
  { title: "Employee ID", field: "EMP_ID", editable: false },
  { title: "Pay Slip Date", field: "SALARY_DATE", editable: false },
  { title: "Amount", field: "SALARY", editable: false },
];
const data = [];
export default function EmployeeViewPayroll() {
  const classes = useStyles();
  //
  const [tableData, setData] = useState(data);
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/employee/getEmployeePayroll",
      {
        withCredentials: true,
      }
    );
    setData(response.data.result);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Paper elevation={0} square className={classes.root}>
      <Typography variant="h6" component="div">
        Hi, Welcome Back! Sadeem
      </Typography>
      <MaterialTable
        title="View Payroll Table"
        data={tableData}
        columns={columns}
        options={{
          // filtering: true
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
      />
    </Paper>
  );
}
