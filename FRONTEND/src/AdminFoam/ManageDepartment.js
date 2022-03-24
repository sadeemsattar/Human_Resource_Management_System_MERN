import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  content: { padding: theme.spacing(4), margin: theme.spacing(3) },
}));
const showMessage = (msg) => {
  if (msg == "Add") toast.success("Data Added Succesful!");
  else if (msg == "Delete") toast.success("Data Delete SUccesful!");
  else if (msg == "Update") toast.success("Data Update Succesful!");
  else toast.error("Error In Performing Operation");
};
// const data = [
//   {
//     Department_ID: "S344",
//     Department_Name: "CS",
//   },
//   {
//     Department_ID: "S344",
//     Department_Name: "CS",
//   },
//   {
//     Department_ID: "S344",
//     Department_Name: "CS",
//   },
//   {
//     Department_ID: "S344",
//     Department_Name: "CS",
//   },
// ];
export default function ManageDepartmentTable(props) {
  const { columns } = props;
  const classes = useStyles();
  //-----------------------------------
  const [tableData, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/admin/managedepartment",
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
        Hi, Welcome Back! {}
      </Typography>
      <MaterialTable
        title="Manage Department Table"
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
              axios.put(
                "http://localhost:5000/admin/managedepartment",
                {
                  DEPARTMENT_ID: oldValueRow.DEPARTMENT_ID,
                  DEPARTMENT_NAME: newValueRow.DEPARTMENT_NAME,
                },
                { withCredentials: true }
              );
              // const rowIndex = oldValueRow.tableData.id;
              // const updateRows = [...tableData];
              // updateRows[rowIndex] = newValueRow;
              setTimeout(() => {
                // setData(updateRows);
                getData();
                resolve();
                showMessage("Update");
              }, 3000);
            }),
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              // const updateRows = [...tableData, newRow];
              axios.post(
                "http://localhost:5000/admin/managedepartment",
                {
                  DEPARTMENT_NAME: newRow.DEPARTMENT_NAME,
                },
                { withCredentials: true }
              );
              setTimeout(() => {
                // setData(updateRows);
                getData();
                resolve();
                showMessage("Add");
              }, 3000);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              // const rowIndex = selectedRow.tableData.id;
              // const updateRows = [...tableData];
              // updateRows.splice(rowIndex, 1);
              axios.delete("http://localhost:5000/admin/managedepartment", {
                data: { departmentId: selectedRow.DEPARTMENT_ID },
                withCredentials: true,
              });
              setTimeout(() => {
                // setData(updateRows);
                getData();
                resolve();
                showMessage("Delete");
              }, 3000);
            }),
        }}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </Paper>
  );
}
