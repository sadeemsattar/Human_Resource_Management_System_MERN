import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import axios from "axios";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     background: "#fdfdff",
//     padding: theme.spacing(3),
//     marginTop: theme.spacing(8),
//   },
//   content: { padding: theme.spacing(4), margin: theme.spacing(3) },
// }));

const columns = [
  { title: "START_DATE", field: "START_DATE" },
  { title: "END_DATE", field: "END_DATE" },
  { title: "REASON", field: "REASON" },
  { title: "LEAVE_STATUS", field: "LEAVE_STATUS", editable: false },
  // { title: "Employee ID", field: "EMP_ID", editable: false },
];
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  content: { padding: theme.spacing(4), margin: theme.spacing(3) },
}));

export default function EmployeeLeave() {
  const classes = useStyles();
  // -------------------
  const [tableData, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/employee/requestleave",
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
        title="Apply Leave Table"
        data={tableData}
        columns={columns}
        options={{
          // filtering: true
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              // const updateRows = [...tableData, newRow];
              const response = axios.post(
                "http://localhost:5000/employee/requestleave",
                {
                  startDate: newRow.START_DATE,
                  endDate: newRow.END_DATE,
                  reason: newRow.REASON,
                },
                { withCredentials: true }
              );
              setTimeout(() => {
                //setData(updateRows);
                getData();
                resolve();
                // showMessage("Add");
              }, 3000);
            }),
          onRowUpdate: (newValueRow, oldValueRow) =>
            new Promise((resolve, reject) => {
              // const rowIndex = oldValueRow.tableData.id;
              // const updateRows = [...tableData];
              // updateRows[rowIndex] = newValueRow;
              axios.put(
                "http://localhost:5000/employee/requestleave",
                {
                  startDate: oldValueRow.START_DATE,
                  endDate: newValueRow.END_DATE,
                  reason: newValueRow.REASON,
                },
                { withCredentials: true }
              );
              setTimeout(() => {
                // setData(updateRows);
                getData();
                resolve();
                // showMessage("Update");
              }, 3000);
            }),

          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              // const rowIndex = selectedRow.tableData.id;
              // const updateRows = [...tableData];
              // updateRows.splice(rowIndex, 1);
              axios.delete("http://localhost:5000/employee/requestleave", {
                data: { startDate: selectedRow.START_DATE },
                withCredentials: true,
              });
              setTimeout(() => {
                // setData(updateRows);
                getData();
                resolve();
                // showMessage("Delete");
              }, 3000);
            }),
        }}
      />
    </Paper>
    // <Paper elevation={0} square className={classes.root} align="center">
    //   <foam classes={classes.content}>
    //     <Typography variant="h6" component="div" align="center">
    //       Employee Leave Foam
    //     </Typography>
    //     <table>
    //       <tr>
    //         <td>Reason :</td>
    //         <td>
    //           <textarea rows="5" cols="20"></textarea>
    //         </td>
    //       </tr>
    //       <tr>
    //         {/* <td>
    //           <input type="reset" value="Reset" className="btnAlert"></input>
    //         </td> */}
    //         <td>
    //           <input
    //             type="submit"
    //             value="Submit"
    //             className="btnSuccess"
    //           ></input>
    //         </td>
    //       </tr>
    //     </table>
    //   </foam>
    // </Paper>
  );
}
