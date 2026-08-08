import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Select, Typography, MenuItem } from "@material-ui/core";
import MaterialTable from "material-table";
import axios from "axios";
import qrcode from "qrcode";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  content: { padding: theme.spacing(4), margin: theme.spacing(3) },
}));
// const data = [
//   { First_Name: "Zain", Last_Name: "Jabbar", Phone_Number: 21 },
//   { First_Name: "Ahsan", Last_Name: "Khan", Phone_Number: 24 },
// ];
export default function HrManageEmployeeTable(props) {
  const DropDown = ({ value, onChange }) => (
    <Select onChange={onChange} value={value || ""}>
      <MenuItem value="1">1</MenuItem>
      <MenuItem value="2">2</MenuItem>
      <MenuItem value="3">3</MenuItem>
    </Select>
  );
  // const { columns } = props;
  const classes = useStyles();
  const columns = [
    {
      title: "EMP ID",
      field: "EMP_ID",
      editable: false,
    },
    {
      title: "First Name",
      field: "FIRST_NAME",
      validate: (rowData) => {
        var reg_First_Name = /^[a-zA-Z\s]*$/;
        if (rowData.FIRST_NAME == undefined || rowData.FIRST_NAME == "") {
          return "Field Required";
        } else if (!reg_First_Name.test(rowData.FIRST_NAME)) {
          return "Alphabet Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Last Name",
      field: "LAST_NAME",
      validate: (rowData) => {
        var reg_Last_Name = /^[a-zA-Z\s]*$/;
        if (rowData.LAST_NAME == undefined || rowData.LAST_NAME == "") {
          return "Field Required";
        } else if (!reg_Last_Name.test(rowData.LAST_NAME)) {
          return "Alphabet Is Required";
        } else if (
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Email",
      field: "EMAIL",
      validate: (rowData) => {
        var reg_Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (rowData.EMAIL == undefined || rowData.EMAIL == "") {
          return "Field Required";
        } else if (!reg_Email.test(rowData.EMAIL)) {
          return "InValid Email";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Phone Number",
      field: "PHONE_NUMBER",
      validate: (rowData) => {
        var reg_Phone_Number = /^[0-9]+$/;
        if (rowData.PHONE_NUMBER == undefined || rowData.PHONE_NUMBER == "") {
          return "Field Required";
        } else if (!reg_Phone_Number.test(rowData.PHONE_NUMBER)) {
          return "Number Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "DOB",
      field: "DOB",
      validate: (rowData) => {
        var reg_DOB = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if (rowData.DOB == undefined || rowData.DOB == "") {
          return "Field Required";
        } else if (!reg_DOB.test(rowData.DOB)) {
          return "Invalid Date Format";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Hire Date",
      field: "HIRE_DATE",
      validate: (rowData) => {
        var reg_Hire_Date = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        if (rowData.HIRE_DATE == undefined || rowData.HIRE_DATE == "") {
          return "Field Required";
        } else if (!reg_Hire_Date.test(rowData.HIRE_DATE)) {
          return "Invalid Date Format";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "Address",
      field: "ADDRESS",
      validate: (rowData) => {
        var reg_Address = /^[a-zA-Z\s]*$/;
        if (rowData.ADDRESS == undefined || rowData.ADDRESS == "") {
          return "Field Required";
        } else if (!reg_Address.test(rowData.ADDRESS)) {
          return "Number Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "CNIC",
      field: "CNIC",
      validate: (rowData) => {
        var reg_CNIC = /^[0-9]+$/;
        if (rowData.CNIC == undefined || rowData.CNIC == "") {
          return "Field Required";
        } else if (!reg_CNIC.test(rowData.CNIC)) {
          return "Number Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "DEPARTMENT ID",
      field: "DEPARTMENT_ID",
      validate: (rowData) => {
        var reg_DEPARTMENT_ID = /^[0-9]+$/;
        if (rowData.DEPARTMENT_ID == undefined || rowData.DEPARTMENT_ID == "") {
          return "Field Required";
        } else if (!reg_DEPARTMENT_ID.test(rowData.DEPARTMENT_ID)) {
          return "Number Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DESIGNATION_ID != undefined || rowData.DESIGNATION_ID != "")
        ) {
          return true;
        }
        return false;
      },
    },
    {
      title: "DESIGNATION ID",
      field: "DESIGNATION_ID",
      validate: (rowData) => {
        var reg_DESIGNATION_ID = /^[0-9]+$/;
        if (
          rowData.DESIGNATION_ID == undefined ||
          rowData.DESIGNATION_ID == ""
        ) {
          return "Field Required";
        } else if (!reg_DESIGNATION_ID.test(rowData.DESIGNATION_ID)) {
          return "Number Is Required";
        } else if (
          (rowData.LAST_NAME != undefined || rowData.LAST_NAME != "") &&
          (rowData.EMAIL != undefined || rowData.EMAIL != "") &&
          (rowData.HIRE_DATE != undefined || rowData.HIRE_DATE != "") &&
          (rowData.DOB != undefined || rowData.DOB != "") &&
          (rowData.PHONE_NUMBER != undefined || rowData.PHONE_NUMBER != "") &&
          (rowData.ADDRESS != undefined || rowData.ADDRESS != "") &&
          (rowData.FIRST_NAME != undefined || rowData.FIRST_NAME != "") &&
          (rowData.CNIC != undefined || rowData.CNIC != "") &&
          (rowData.DEPARTMENT_ID != undefined || rowData.DEPARTMENT_ID != "")
        ) {
          return true;
        }
        return false;
      },
      // editable: false,
      // editComponent: (row) => (
      //   <DropDown
      //     value={row.DEPARTMENT_ID}
      //     onChange={(e) => {
      //       console.log(e.target.value);
      //       // row.onChange(e.target.value);
      //       row.DESIGNATION_ID = e.target.value;
      //     }}
      //   />
      // )
      // render: (row) => (
      //   <DropDown
      //     value={row.DESIGNATION_ID}
      //     onChange={(e) => {
      //       console.log(e.target.value);
      //       row.DESIGNATION_ID = e.target.value;
      //     }}
      //   />
      // console.log("dsdsd");
      // return (
      //   <select
      //     onChange={(e) => {
      //       console.log(e.target.value);
      //       row.DESIGNATION_ID = e.target.value;
      //       console.log(row.DEPARTMENT_ID);
      //     }}
      //   >
      //     <option selected disabled hidden>
      //       {row.DESIGNATION_ID}
      //     </option>
      //     <option>8</option>
      //     <option>3</option>
      //   </select>
      // );
      // ),
    },
  ];

  //--------------------------------
  const [tableData, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/hr/manageemployee",
      {
        withCredentials: true,
      }
    );
    setData(response.data.result);
  };

  useEffect(() => {
    getData();
  }, []);
  // ----------------------------
  const generteCode = async (empId) => {
    try {
      const qrUrl = await qrcode.toDataURL(empId);
      let element = document.createElement("a");
      let file = new Blob([qrUrl], { type: "image/*" });
      console.log(element, qrUrl);
      element.setAttribute("href", qrUrl);
      element.setAttribute("download", empId);
      element.click();
      //   SetUrlImage(urlImage);
      //   console.log(urlImage);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Paper elevation={0} square className={classes.root}>
      <Typography variant="h6" component="div">
        Hi, Welcome Back!
      </Typography>
      <MaterialTable
        title="Manage Employee Table"
        data={tableData}
        columns={columns}
        options={{
          // filtering: true
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
        editable={{
          onRowAdd: (newRow) =>
            new Promise(async (resolve, reject) => {
              // const updateRows = [...tableData, newRow];
              try {
                const response = await axios.post(
                  "http://localhost:5000/hr/manageemployee",
                  {
                    FIRST_NAME: newRow.FIRST_NAME,
                    LAST_NAME: newRow.LAST_NAME,
                    EMAIL: newRow.EMAIL,
                    PHONE_NUMBER: newRow.PHONE_NUMBER,
                    DOB: newRow.DOB,
                    HIRE_DATE: newRow.HIRE_DATE,
                    ADDRESS: newRow.ADDRESS,
                    CNIC: newRow.CNIC,
                    DEPARTMENT_ID: newRow.DEPARTMENT_ID,
                    DESIGNATION_ID: newRow.DESIGNATION_ID,
                  },
                  { withCredentials: true }
                );

                setTimeout(() => {
                  // setData(updateRows);
                  // console.log(response, "---");
                  generteCode(response.data.data);
                  getData();
                  resolve();
                }, 3000);
              } catch (err) {}
            }),
          onRowUpdate: (newValueRow, oldValueRow) =>
            new Promise((resolve, reject) => {
              axios.put(
                "http://localhost:5000/hr/manageemployee",
                {
                  EMP_ID: oldValueRow.EMP_ID,
                  FIRST_NAME: newValueRow.FIRST_NAME,
                  LAST_NAME: newValueRow.LAST_NAME,
                  EMAIL: newValueRow.EMAIL,
                  PHONE_NUMBER: newValueRow.PHONE_NUMBER,
                  DOB: newValueRow.DOB,
                  HIRE_DATE: newValueRow.HIRE_DATE,
                  ADDRESS: newValueRow.ADDRESS,
                  CNIC: newValueRow.CNIC,
                  DEPARTMENT_ID: newValueRow.DEPARTMENT_ID,
                  DESIGNATION_ID: newValueRow.DESIGNATION_ID,
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
              }, 3000);
            }),

          // onRowDelete: (selectedRow) =>
          //   new Promise((resolve, reject) => {
          //     const rowIndex = selectedRow.tableData.id;
          //     const updateRows = [...tableData];
          //     updateRows.splice(rowIndex, 1);
          //     setTimeout(() => {
          //       setData(updateRows);
          //       resolve();
          //     }, 1000);
          //   }),
        }}
      />
    </Paper>
  );
}
