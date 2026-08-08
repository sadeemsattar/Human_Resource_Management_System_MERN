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
//   { text: "Admin ID :", value: response.data.result[0].ADMIN_ID },
//   { text: "First Name :", value: response.data.result[0].FIRST_NAME },
//   { text: "Last Name :", value: response.data.result[0].LAST_NAME },
//   { text: "CNIC :", value: response.data.result[0].CNIC },
// ];
export default function AdminProfileFoam(props) {
  const { heading } = props;
  const classes = useStyles();
  // ----------------------------------------
  const [ProfileItems, setProfileItems] = useState([]);

  const getAdminData = async () => {
    const response = await axios.get(
      "http://localhost:5000/admin/getadmindata",
      { withCredentials: true }
    );
    setProfileItems([
      { text: "Admin ID :", value: response.data.result[0].ADMIN_ID },
      { text: "First Name :", value: response.data.result[0].FIRST_NAME },
      { text: "Last Name :", value: response.data.result[0].LAST_NAME },
      { text: "CNIC :", value: response.data.result[0].CNIC },
    ]);
  };

  useEffect(() => {
    getAdminData();
  }, []);

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
