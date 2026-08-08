import React from "react";
import "../foam.css";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";

const initialData = {
  FirstName: "",
  LastName: "",
  Gmail: "",
  PhoneNumber: "",
  DOB: "",
  Gender: "male",
  HireDate: new Date(),
};
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  content: { padding: theme.spacing(4), margin: theme.spacing(3) },
}));
export default function HrEmployeeFoam(props) {
  const classes = useStyles();
  const [data, setData] = useState(initialData);
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const Check = (e) => {
    e.preventDefault();
    var reg = new RegExp("/^[a-zA-Z]*$/");
    const flag = /^[a-zA-Z]*$/.test(e.target.value);
    if (flag == true) {
      // e.target.value.pop();
      alert("Pop");
    }
  };
  return (
    <Paper elevation={0} square className={classes.root} align="center">
      <foam classes={classes.content} autocomplete="off">
        <Typography variant="h6" component="div" align="center">
          {props.heading}
        </Typography>
        <table>
          <tr>
            <td>First Name : </td>
            <td>
              <input type="text" placeholder="First Name" required></input>
            </td>
          </tr>
          <tr>
            <td>Last Name : </td>
            <td>
              <input type="text" placeholder="Last Name" required></input>
            </td>
          </tr>
          <tr>
            <td>CNIC : </td>
            <td>
              <input
                type="tel"
                placeholder="****-*******-*"
                required
                maxLength="13"
              ></input>
            </td>
          </tr>
          <tr>
            <td>Gender : </td>
            <td>
              <input type="radio" name="Gender" required />
              Male
              <input type="radio" name="Gender" required />
              Female
            </td>
          </tr>
          <tr>
            <td>Gmail : </td>
            <td>
              <input type="gmail" placeholder="name@gmail.com" required></input>
            </td>
          </tr>
          <tr>
            <td>Phone Number : </td>
            <td>
              <input
                type="phone"
                placeholder="33******"
                required
                maxLength="11"
                onChange={Check}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Password : </td>
            <td>
              <input type="password" placeholder="******" readonly></input>
            </td>
          </tr>
          <tr>
            <td>Date Of Birth : </td>
            <td>
              <input type="date"></input>
            </td>
          </tr>
          <tr>
            <td>Hire Date : </td>
            <td>
              <input type="date"></input>
            </td>
          </tr>
          <tr>
            <td>Address : </td>
            <td>
              <textarea rows="4" cols="20" placeholder="Address"></textarea>
            </td>
          </tr>
          <tr>
            <td>
              <input type="reset" value="Reset" className="btnAlert"></input>
            </td>
            <td>
              <input
                type="submit"
                value="Submit"
                className="btnSuccess"
              ></input>
            </td>
          </tr>
        </table>
      </foam>
    </Paper>
  );
}
