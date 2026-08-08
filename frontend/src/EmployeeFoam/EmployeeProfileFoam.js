import React, { useState, useEffect } from "react";
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
const ProfileItems = [];
export default function EmployeeProfileFoam(props) {
  const { heading } = props;
  const classes = useStyles();
  // -------------------------
  const [ProfileItems, setProfileItems] = useState([]);

  const getAdminData = async () => {
    const response = await axios.get(
      "http://localhost:5000/employee/getemployeedata",
      {
        withCredentials: true,
      }
    );
    setProfileItems([
      { text: "Employee ID :", value: response.data.data[0].EMP_ID },
      { text: "First Name :", value: response.data.data[0].FIRST_NAME },
      { text: "Last Name :", value: response.data.data[0].LAST_NAME },
      { text: "CNIC :", value: response.data.data[0].CNIC },
      { text: "Email :", value: response.data.data[0].EMAIL },
      { text: "Phone Number :", value: response.data.data[0].PHONE_NUMBER },
      { text: "Date Of Birth :", value: response.data.data[0].DOB },
      { text: "Hire Date :", value: response.data.data[0].HIRE_DATE },
      { text: "Address:", value: response.data.data[0].ADDRESS },
    ]);
  };

  useEffect(() => {
    getAdminData();
  }, []);
  console.log(ProfileItems);
  return (
    <Paper elevation={0} square className={classes.root} align="center">
      <foam classes={classes.content}>
        <Typography variant="h6" component="div" align="center">
          {heading}
        </Typography>
        <table>
          {ProfileItems.map((item) => (
            <tr>
              <td>{item.text}</td>
              <td>
                <input value={item.value}></input>
              </td>
            </tr>
          ))}
        </table>
      </foam>
    </Paper>
  );
}
