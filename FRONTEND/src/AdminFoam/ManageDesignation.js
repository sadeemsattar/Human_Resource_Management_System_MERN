import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
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
//     Designation_ID: "S344",
//     Designation_Name: "CS",
//     Basic_Salary: 4566,
//     Allounce: 56677,
//   },
//   {
//     Designation_ID: "S344",
//     Designation_Name: "CS",
//     Basic_Salary: 4566,
//     Allounce: 56677,
//   },
//   {
//     Designation_ID: "S344",
//     Designation_Name: "CS",
//     Basic_Salary: 4566,
//     Allounce: 56677,
//   },
// ];
export default function ManageDesignation(props) {
  const { columns } = props;
  const classes = useStyles();
  // -----------------------------
  const [tableData, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/admin/managedesignation",
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
        title="Manage Designation Table"
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
              // console.log(oldValueRow.tableData.id, newValueRow);
              // console.log("----", oldValueRow.tableData);
              // const rowIndex = oldValueRow.tableData.id;
              // const updateRows = [...tableData];
              // updateRows[rowIndex] = newValueRow;

              axios.put(
                "http://localhost:5000/admin/managedesignation",
                {
                  designation_id: oldValueRow.DESIGNATION_ID,
                  DESIGNATION_NAME: newValueRow.DESIGNATION_NAME,
                  BASIC_SALARY: newValueRow.BASIC_SALARY,
                  ALLOUNCE: newValueRow.ALLOUNCE,
                },
                { withCredentials: true }
              );
              setTimeout(() => {
                getData();
                // setData(updateRows);

                resolve();
                showMessage("Update");
              }, 3000);
            }),
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              // const updateRows = [...tableData, newRow];
              axios.post(
                "http://localhost:5000/admin/managedesignation",
                {
                  DESIGNATION_NAME: newRow.DESIGNATION_NAME,
                  BASIC_SALARY: newRow.BASIC_SALARY,
                  ALLOUNCE: newRow.ALLOUNCE,
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
              axios.delete("http://localhost:5000/admin/managedesignation", {
                data: { designationId: selectedRow.DESIGNATION_ID },
                withCredentials: true,
              });
              // const rowIndex = selectedRow.tableData.id;
              // const updateRows = [...tableData];
              // updateRows.splice(rowIndex, 1);
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
