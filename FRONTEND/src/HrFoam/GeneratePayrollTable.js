import React from "react";
import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  content: { padding: theme.spacing(4), margin: theme.spacing(3) },
}));
// const data = [
//   {
//     EMP_ID: "er",
//     Employee_Name: "Jabbar",
//     Basic_Salary: 35,
//     Allounce: 56,
//     Salary_Date: `${new Date()}`,
//   },
// ];
export default function GenertePayrollTable(props) {
  const { columns } = props;
  const classes = useStyles();
  // ------------------------
  const [tableData, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get("http://localhost:5000/hr/managepayroll", {
      withCredentials: true,
    });
    setData(response.data.result);
  };

  useEffect(() => {
    getData();
  }, []);
  // console.log(tableData);
  const generatePayroll = async () => {
    try {
      await axios.post(
        "http://localhost:5000/hr/managepayroll",
        {},
        { withCredentials: true }
      );
      getData();
    } catch (err) {}
  };
  return (
    <Paper elevation={0} square className={classes.root}>
      <Typography variant="h6" component="div">
        Hi, Welcome Back! Sadeem
      </Typography>
      <button
        onClick={() => {
          generatePayroll();
        }}
      >
        GENERATE PAYROLL FOR ALL EMPLOYEES
      </button>
      <MaterialTable
        title="Generate Payroll Table"
        data={tableData}
        columns={columns}
        options={{
          // filtering: true
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
        editable={{
          onRowUpdate: (newValueRow, oldValueRow) =>
            new Promise((resolve, reject) => {
              // const rowIndex = oldValueRow.tableData.id;
              // const updateRows = [...tableData];
              // updateRows[rowIndex] = newValueRow;
              axios.put(
                "http://localhost:5000/hr/managepayroll",
                {
                  EMP_ID: oldValueRow.EMP_ID,
                  SALARY: newValueRow.SALARY,
                },
                { withCredentials: true }
              );
              setTimeout(() => {
                // setData(updateRows);
                getData();
                resolve();
              }, 3000);
            }),
        }}
      />
    </Paper>
  );
}
