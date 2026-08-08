import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import axios from "axios";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     background: "#fdfdff",
//     padding: theme.spacing(3),
//     marginTop: theme.spacing(8),
//   },
//   content: { padding: theme.spacing(4), margin: theme.spacing(3) },
// }));
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  content: { padding: theme.spacing(4), margin: theme.spacing(3) },
}));
const columns = [
  { title: "approved_status", field: "approved_status", editable: false },
  { title: "reason", field: "reason" },
  { title: "apply_date", field: "apply_date" },
  //  editable: false
];
export default function EmployeeResignation() {
  const classes = useStyles();
  // ---------------------
  const [tableData, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/employee/requestresignation",
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
        title="Apply Resignation Table"
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
                "http://localhost:5000/employee/requestresignation",
                {
                  reason: newRow.reason,
                  date: newRow.apply_date,
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
                "http://localhost:5000/employee/requestresignation",
                {
                  reason: newValueRow.reason,
                  date: oldValueRow.apply_date,
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
              axios.delete(
                "http://localhost:5000/employee/requestresignation",
                {
                  data: { date: selectedRow.apply_date },
                  withCredentials: true,
                }
              );
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
    //       Employee Resignation Foam
    //     </Typography>
    //     <table>
    //       <tr>
    //         <td>Resignation Date :</td>
    //         <td>
    //           <input
    //             type="Date"
    //             onChange={(e) => {
    //               setDate(e.target.value);
    //             }}
    //           />
    //         </td>
    //       </tr>
    //       <tr>
    //         <td>Reason :</td>
    //         <td>
    //           <textarea
    //             rows="5"
    //             cols="20"
    //             onChange={(e) => {
    //               setReason(e.target.value);
    //             }}
    //           ></textarea>
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
    //             onClick={async () => {
    //               await axios.post(
    //                 "http://localhost:5000/hr/manageleave",
    //                 {
    //                   reason: reason,
    //                   date: date,
    //                 },
    //                 { withCredentials: true }
    //               );
    //             }}
    //           ></input>
    //         </td>
    //       </tr>
    //     </table>
    //   </foam>
    // </Paper>
  );
}
