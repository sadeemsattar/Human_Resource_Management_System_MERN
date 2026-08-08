// import "../../foam.css";
// import React, { useState } from "react";
// import Axios from "axios";
// import { makeStyles } from "@material-ui/styles";
// import { Paper, Typography } from "@material-ui/core";
// import { useNavigate } from "react-router-dom";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     background: "#fdfdff",
//     padding: theme.spacing(15),
//     height: theme.spacing(98),
//   },
//   content: { padding: theme.spacing(4), marginTop: theme.spacing(3) },
// }));
// export default function Login() {
//   const [Username, setUsername] = useState("");
//   const [Userpassword, setUserpassword] = useState("");
//   const [LoginType, setLoginType] = useState("");
//   const [msg, setMsg] = useState(false);
//   const classes = useStyles();
//   const navigate = useNavigate();
//   const LoginAs = (e) => {
//     setLoginType(e.target.value);
//   };
//   //--------------------------------------
//   const Signin = async (e) => {
//     e.preventDefault();
//     console.log(Username, Userpassword, LoginType);
//     const data = await Axios.post("localhost:5000/userLogin", {
//       id: Username,
//       password: Userpassword,
//       loginAs: LoginType,
//     });
//     if (LoginType != "") {
//       // console.log(data.data[0]);
//       if (LoginType === "Hr") navigate("/Hr-DashBoard");
//       else if (LoginType === "Admin") navigate("/Admin-DashBoard");
//       else if (LoginType === "Employee") navigate("/Employee-DashBoard");
//       // setMsg(true);
//     }
//   };

//   return (
//     <Paper elevation={0} square className={classes.root} align="center">
//       <Typography variant="h4" component="div" align="center" color="primary">
//         HR Management System
//       </Typography>

//       <foam className={classes.content}>
//         <Typography variant="h6" component="div" align="center">
//           Login Foam
//         </Typography>
//         <table className={classes.loginfoam}>
//           <tr>
//             <td>User Name :</td>
//             <td>
//               <input
//                 type="text"
//                 onChange={(e) => {
//                   setUsername(e.target.value);
//                 }}
//               />
//             </td>
//           </tr>

//           <tr>
//             <td>Password :</td>
//             <td>
//               <input
//                 type="password"
//                 onChange={(e) => {
//                   setUserpassword(e.target.value);
//                 }}
//               />
//             </td>
//           </tr>
//           <tr>
//             <td>Login As :</td>
//             <td>
//               <select onChange={LoginAs}>
//                 <option selected disabled></option>
//                 <option value="Hr">Hr</option>
//                 <option value="Admin">Admin</option>
//                 <option value="Employee">Employee</option>
//               </select>
//             </td>
//           </tr>
//           <tr>
//             <td></td>
//             <td>
//               <input
//                 type="submit"
//                 value="Sign in"
//                 onClick={() => {
//                   Signin();
//                 }}
//                 className="btnSuccess"
//               />
//             </td>
//           </tr>
//         </table>
//       </foam>
//     </Paper>
//   );
// }
import "../../foam.css";
import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { Paper, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
    padding: theme.spacing(15),
    height: theme.spacing(98),
  },
  content: { padding: theme.spacing(4), marginTop: theme.spacing(3) },
}));
export default function Login() {
  const [Username, setUsername] = useState("");
  const [Userpassword, setUserpassword] = useState("");
  const [LoginType, setLoginType] = useState("");
  const [msg, setMsg] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const LoginAs = (e) => {
    setLoginType(e.target.value);
  };
  const Signin = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        "http://localhost:5000/userLogin",
        {
          id: Username,
          password: Userpassword,
          loginAs: LoginType,
        },
        { withCredentials: true } //important if want to save cookie in browser
      );

      if (LoginType === "Hr") navigate("/Hr-DashBoard");
      else if (LoginType === "Admin") navigate("/Admin-DashBoard");
      else if (LoginType === "Employee") navigate("/Employee-DashBoard");
      // navigate(`/${loginAs}`);
    } catch (err) {
      if (err.response === 401);
      {
        setMsg("Credentials not found. Please try again");
      }
    }
  };

  return (
    <Paper elevation={0} square className={classes.root} align="center">
      <Typography variant="h4" component="div" align="center" color="primary">
        HR Management System
      </Typography>

      <foam className={classes.content}>
        <Typography variant="h6" component="div" align="center">
          Login Foam
        </Typography>
        <table className={classes.loginfoam}>
          <tr>
            <td>User Name :</td>
            <td>
              <input
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </td>
          </tr>

          <tr>
            <td>Password :</td>
            <td>
              <input
                type="password"
                onChange={(e) => {
                  setUserpassword(e.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Login As :</td>
            <td>
              <select onChange={LoginAs}>
                <option selected disabled></option>
                <option value="Hr">Hr</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                type="submit"
                value="Sign in"
                onClick={Signin}
                className="btnSuccess"
              />
            </td>
          </tr>
        </table>
      </foam>
    </Paper>
  );
}
