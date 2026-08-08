import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
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
// const data = [
//   {
//     EMP_ID: "Zain",
//     START_DATE: "2000-12-30",
//     END_DATE: "2001-21-09",
//     REASON: "i leave",
//     LEAVE_STATUS: "Approved",
//   },
// ];
export default function HrLeaveTable(props) {
  const { columns } = props;
  const classes = useStyles();
  // ----------------------
  const [tableData, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get("http://localhost:5000/hr/manageleave", {
      withCredentials: true,
    });
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
        title="Hr Leave Table"
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
                "http://localhost:5000/hr/manageleave",
                {
                  EMP_ID: oldValueRow.EMP_ID,
                  LEAVE_STATUS: newValueRow.LEAVE_STATUS,
                  START_DATE: oldValueRow.START_DATE,
                  END_DATE: oldValueRow.END_DATE,
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
