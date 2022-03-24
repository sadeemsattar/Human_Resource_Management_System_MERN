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
  { title: "Attendence", field: "MARK", editable: false },
  { title: "Attendence Mark Date", field: "MARK_DATE", editable: false },
  // { title: "Employee ID", field: "EMP_ID", editable: false },
];
// const data = [];
export default function EmployeeViewAttendence() {
  const classes = useStyles();
  // ----------------------------
  const [tableData, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/employee/getEmployeeAttendance",
      {
        withCredentials: true,
      }
    );
    setData(response.data.result);
  };

  useEffect(() => {
    getData();
  }, []);
  // console.log(tableData, "----------");
  return (
    <Paper elevation={0} square className={classes.root}>
      <Typography variant="h6" component="div">
        Hi, Welcome Back! Sadeem
      </Typography>
      <MaterialTable
        title="View Attendence Table"
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
