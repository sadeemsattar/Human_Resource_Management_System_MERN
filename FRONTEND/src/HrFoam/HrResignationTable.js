import React from "react";
import TableTemplate from "../component/Table/TableTemplate";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import { useState, useEffect } from "react";
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
//     EMP_ID: "e2",
//     APPLY_DATE: "2001-21-09",
//     REASON: "i leave",
//     APPROVED_STATUS: "Approved",
//   },
// ];
export default function HrResignationTable(props) {
  const { columns } = props;
  const classes = useStyles();
  // -----------------------------
  const [tableData, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/hr/manageresignation",
      {
        withCredentials: true,
      }
    );
    setData(response.data.result);
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(tableData);
  return (
    <Paper elevation={0} square className={classes.root}>
      <Typography variant="h6" component="div">
        Hi, Welcome Back! Sadeem
      </Typography>
      <MaterialTable
        title="Manage Resignation Table"
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
                "http://localhost:5000/hr/manageresignation",
                {
                  APPROVED_STATUS: newValueRow.APPROVED_STATUS,
                  EMP_ID: oldValueRow.EMP_ID,
                  APPLY_DATE: oldValueRow.APPLY_DATE,
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
