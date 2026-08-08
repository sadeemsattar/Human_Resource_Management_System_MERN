const db = require("../config/database");
const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/JWT");
// exports.getLoginPage = (req, res) => {
//   // console.log(path.resolve(__dirname));
//   res
//     .status(200)
//     .sendFile(
//       path.join(__dirname.replace("controller", ""), "build", "index.html")
//     );
// };

exports.verifyCredentials = (req, res) => {
  //get the data from login form

  const { id, password, loginAs } = req.body;
  // console.log(id, password, loginAs);
  //write query depending on whuch user is logging in
  let query = "";
  if (loginAs === "Admin") {
    query = "select * from sys_admin where admin_id=? and admin_id=?";
  } else if (loginAs === "Employee") {
    query =
      "select * from employee where EMP_ID=? AND EMP_ID NOT IN(SELECT EMP_ID FROM RESIGNATION WHERE EMP_ID=? and APPROVED_STATUS='approved')";
    // `select * from employee where emp_id='${id}' AND EMP_ID NOT IN(SELECT EMP_ID FROM RESIGNATION WHERE EMP_ID='"+${id}+"' and APPROVED_STATUS='approved')`;
  } else if (loginAs === "Hr") {
    query = "select * from hr where hr_id=? and hr_id=?";
  }
  // ---------------------------------------------------

  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  // ------------------------------------------

  //run db query to fetch user data
  db.query(query, [id, id], (err, row, fields) => {
    if (err) {
      console.log(err);
    }
    // console.log("---", row.length);
    if (row.length === 1) {
      bcrypt.compare(password, row[0].PASSOWRD).then((match) => {
        if (!match) {
          return res.status(401).json({
            status: "failure",
            message: "wrong username or password",
          });
        }
        const accessToken = createToken(id, loginAs);

        res.cookie("accessToken", accessToken, {
          maxAge: 1800000, //30 min
          httpOnly: true,
        });
        // res.header("Access-Control-Allow-Credentials", true);
        // /res.header("Access-Control-Allow-origin", true);

        res
          .status(200)
          .json({ status: "success", message: "successfully logged in" });
      });

      // json({ status: "success", adminId: userName });
    } else {
      res
        .status(401)
        .json({ status: "failed", message: "Invalid credentials.Try again" });
    }
  });
  // db.end;
};
