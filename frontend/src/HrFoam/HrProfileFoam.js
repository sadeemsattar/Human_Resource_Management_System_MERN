import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
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
// const ProfileItems = [
//   { text: "HR ID :", value: "k191102" },
//   { text: "First Name :", value: "Sadeem" },
//   { text: "Last Name :", value: "Sattar" },
//   { text: "CNIC :", value: "42201-1556501-9" },
//   { text: "Genter :", value: "Male" },
//   { text: "Email :", value: "sadeemsattar@gmail.com" },
//   { text: "Phone Number :", value: "03331297472" },
//   { text: "Date Of Birth :", value: "21-Feb-2001" },
//   { text: "Hire Date :", value: "21-Feb-2001" },

//   { text: "Basic Salary :", value: "$45555" },
//   { text: "Allounce :", value: "$544566" },
// ];
export default function HrProfileFoam(props) {
  const { heading } = props;
  const classes = useStyles();
  // --------------------------------
  const [ProfileItems, setProfileItems] = useState([]);

  const getHrData = async () => {
    const response = await axios.get("http://localhost:5000/hr/gethrdata", {
      withCredentials: true,
    });
    setProfileItems([
      { text: "HR ID :", value: response.data.result[0].HR_ID },
      { text: "First Name :", value: response.data.result[0].FIRST_NAME },
      { text: "Last Name :", value: response.data.result[0].LAST_NAME },
      { text: "CNIC :", value: response.data.result[0].CNIC },
      { text: "Email :", value: response.data.result[0].EMAIL },
      { text: "Phone Number :", value: response.data.result[0].PHONE_NUMBER },
      { text: "Date Of Birth :", value: response.data.result[0].DOB },
      { text: "Hire Date :", value: response.data.result[0].HIRE_DATE },
      { text: "Address :", value: response.data.result[0].ADDRESS },
    ]);
  };
  useEffect(() => {
    getHrData();
  }, []);

  return (
    <Paper elevation={0} square className={classes.root} align="center">
      <foam classes={classes.content}>
        <Typography variant="h6" component="div" align="center">
          {heading}
        </Typography>
        <table>
          {ProfileItems
            ? ProfileItems.map((item) => (
                <tr>
                  <td>{item.text}</td>
                  <td>
                    <input value={item.value}></input>
                  </td>
                </tr>
              ))
            : ""}
        </table>
      </foam>
    </Paper>
  );
}
