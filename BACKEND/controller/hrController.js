const path = require("path");
const db = require("../config/database");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");
const req = require("express/lib/request");
// exports.getHrFrontPage = (req, res) => {
//   res.status(200).send(`welcome hr ${req.query.hrUserName}`);
// };

exports.getHrData = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  // ---------------------------------
  db.query(
    "select HR_ID ,FIRST_NAME ,LAST_NAME ,PASSOWRD,EMAIL,PHONE_NUMBER ,DOB ,HIRE_DATE ,ADDRESS,CNIC from hr where HR_ID='" +
      req.id +
      "' ",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.addEmployee = (req, res) => {
  const {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PHONE_NUMBER,
    DOB,
    HIRE_DATE,
    ADDRESS,
    CNIC,
    DEPARTMENT_ID,
    DESIGNATION_ID,
  } = req.body;
  let EMP_ID;
  const password = crypto.randomBytes(20).toString("hex");
  // db.connect((err) => {
  //   if (err) {
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  db.query("select EMP_ID from employee ORDER BY EMP_ID DESC", (err, row) => {
    if (err) {
      return res.status(500).json({ message: "internal error occured..." });
    }

    if (row.length === 0) {
      EMP_ID = "e0";
    } else {
      EMP_ID = `e${
        parseInt(row[0].EMP_ID.substring(1, row[0].EMP_ID.length)) + 1
      }`;
    }

    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)).then((hash) => {
      // console.log(process.env.SALT_ROUNDS);
      db.query(
        "insert into employee values('" +
          EMP_ID +
          "','" +
          FIRST_NAME +
          "','" +
          LAST_NAME +
          "','" +
          hash +
          "','" +
          EMAIL +
          "','" +
          PHONE_NUMBER +
          "','" +
          DOB +
          "','" +
          HIRE_DATE +
          "','" +
          ADDRESS +
          "','" +
          CNIC +
          "','" +
          req.id +
          "','" +
          DEPARTMENT_ID +
          "','" +
          DESIGNATION_ID +
          "')",
        (err, result) => {
          if (err) {
            return res.status(400).json({ status: "failed", err });
          }
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "sas.official.hr@gmail.com",
              pass: "Sas12345",
            },
          });
          const options = {
            from: "sas.official.hr@gmail.com",
            to: EMAIL,
            subject: "Congragulations,You have been Hired on Employee Position",
            text: `Congragulations Mr/Ms ${FIRST_NAME} ${LAST_NAME}! You have been hired as EMPLOYEE in our company.For the portal access your email is: ${EMAIL} and ID is: ${EMP_ID} password is: ${password}`,
          };

          transporter.sendMail(options, (err, info) => {});

          res.status(200).json({ status: "success", data: EMP_ID });
        }
      );
    });
  });

  // db.end;
};
exports.getEmployee = (req, res) => {
  db.query(
    "select EMP_ID,FIRST_NAME,LAST_NAME, EMAIL,PHONE_NUMBER,date_format(DOB, '%Y-%m-%d' ) as 'DOB',date_format(HIRE_DATE, '%Y-%m-%d' ) as 'HIRE_DATE',ADDRESS,CNIC,DEPARTMENT_ID,DESIGNATION_ID from employee where HR_ID='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }

      res.status(200).json({ status: "success", result });
    }
  );
};
exports.delEmployee = (req, res) => {
  db.query(
    "delete from employee where EMP_ID='" +
      req.body.EMP_ID +
      "' AND HR_ID='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        return res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};
exports.updateEmployee = (req, res) => {
  const {
    EMP_ID,
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PHONE_NUMBER,
    DOB,
    HIRE_DATE,
    ADDRESS,
    CNIC,
    DEPARTMENT_ID,
    DESIGNATION_ID,
  } = req.body;

  db.query(
    "update employee set FIRST_NAME='" +
      FIRST_NAME +
      "',LAST_NAME='" +
      LAST_NAME +
      "',EMAIL='" +
      EMAIL +
      "',PHONE_NUMBER=" +
      PHONE_NUMBER +
      ",DOB='" +
      DOB +
      "',HIRE_DATE='" +
      HIRE_DATE +
      "',ADDRESS='" +
      ADDRESS +
      "',CNIC=" +
      CNIC +
      ",DEPARTMENT_ID='" +
      DEPARTMENT_ID +
      "',DESIGNATION_ID='" +
      DESIGNATION_ID +
      "' WHERE EMP_ID='" +
      EMP_ID +
      "' AND HR_ID='" +
      req.id +
      "' ",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};

exports.getLeave = (req, res) => {
  db.query(
    "select date_format(L.START_DATE, '%Y-%m-%d' ) as 'START_DATE',date_format(L.END_DATE, '%Y-%m-%d' ) as 'END_DATE',L.REASON,L.LEAVE_STATUS,L.EMP_ID from leave_request L,employee E where L.EMP_ID=E.EMP_ID and E.HR_ID='" +
      req.id +
      "' ",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};
exports.updateLeave = (req, res) => {
  // if (req.body.LEAVE_STATUS === "approved") {
  //   let END_DATE = new Date(req.body.END_DATE);
  //   let START_DATE = new Date(req.body.START_DATE);
  //   console.log(END_DATE, START_DATE, typeof END_DATE);
  //   let nDays =
  //     Date.UTC(
  //       END_DATE.getFullYear(),
  //       END_DATE.getMonth(),
  //       END_DATE.getDate()
  //     ) -
  //     Date.UTC(
  //       START_DATE.getFullYear(),
  //       START_DATE.getMonth(),
  //       START_DATE.getDate()
  //     );
  //   //    /
  //   // 86400000;
  //   console.log(
  //     nDays)
  //   );
  // }
  db.query(
    "update leave_request set LEAVE_STATUS='" +
      req.body.LEAVE_STATUS +
      "' where EMP_ID='" +
      req.body.EMP_ID +
      "' and START_DATE='" +
      req.body.START_DATE +
      "'and HR_ID='" +
      req.id +
      "'and LEAVE_STATUS='under review'",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};
exports.getResignation = (req, res) => {
  db.query(
    "select R.EMP_ID,R.REASON,date_format(R.APPLY_DATE, '%Y-%m-%d' ) as 'APPLY_DATE',R.APPROVED_STATUS from resignation R,employee E where R.EMP_ID=E.EMP_ID and E.HR_ID='" +
      req.id +
      "' ",
    // and R.APPROVED_STATUS='under review'
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }
      // console.log(result);
      res.status(200).json({ status: "success", result });
    }
  );
};
exports.updateResignation = (req, res) => {
  db.query(
    "update resignation set APPROVED_STATUS='" +
      req.body.APPROVED_STATUS +
      "' where EMP_ID='" +
      req.body.EMP_ID +
      "' and APPLY_DATE='" +
      req.body.APPLY_DATE +
      "'and HR_ID='" +
      req.id +
      "' and APPROVED_STATUS='under review'",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed", err });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};
// -------------------------
exports.getpayroll = (req, res) => {
  db.query(
    "select SALARY,DATE_FORMAT(salary_date, '%Y-%m-%d') as 'SALARY_DATE',EMP_ID from payroll where HR_ID='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed", err });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};
exports.postpayroll = (req, res) => {
  // const HR_ID = req.id;

  let date = new Date();

  let current_month = date.getMonth();
  let current_year = date.getFullYear();
  let first_next = new Date(date.getFullYear, date.getMonth() + 1, 1);
  // db.query
  db.query(
    "select * from payroll where DATE_FORMAT(salary_date, '%Y-%m-%d') like '" +
      `${current_year}-${current_month + 1}-__` +
      "'",
    (err, result4) => {
      if (err) {
        return res.status(400).json({ status: "failed.", err });
      }

      if (result4.length === 0) {
        db.query(
          "select  E.EMP_ID ,E.DESIGNATION_ID,D.BASIC_SALARY,D.ALLOUNCE from employee E,designation D where E.HR_ID='" +
            req.id +
            "' and E.DESIGNATION_ID=D.DESIGNATION_ID ",
          (err, result) => {
            if (err) {
              return res.status(400).json({ status: "failed.", err });
            }

            for (let i = 0; i < result.length; i++) {
              console.log(result[i].EMP_ID);
              db.query(
                "select MARK from attendence where EMP_ID='" +
                  result[i].EMP_ID +
                  "' and MARK_DATE>='" +
                  `${current_year}-${current_month + 1}-01` +
                  "' and MARK_DATE<'" +
                  `${first_next.getFullYear()}-${
                    first_next.getMonth() + 1
                  }-01` +
                  "' ",
                (err, result2) => {
                  if (err) {
                    return res.status(400).json({ status: "failed", err });
                  }
                  // console.log(result2);
                  let salary = 0;
                  if (result2.length > 0) {
                    let absent = 0;
                    result2.forEach((att) => {
                      if (att.MARK === "A") {
                        absent++;
                      }
                    });

                    salary =
                      (parseFloat(result[i].BASIC_SALARY) +
                        parseFloat(result[i].ALLOUNCE)) *
                      (result2.length - absent);
                    console.log(salary);
                  }
                  console.log(salary, result[i].EMP_ID);
                  db.query(
                    "insert into payroll(SALARY,SALARY_DATE,EMP_ID,HR_ID) values('" +
                      salary +
                      "','" +
                      `${current_year}-${current_month + 1}-${date.getDate()}` +
                      "','" +
                      result[i].EMP_ID +
                      "','" +
                      req.id +
                      "')",
                    (err, result3) => {
                      if (err) {
                        // console.log(err);
                        return res
                          .status(400)
                          .json({ status: "failed...", err });
                      }
                    }
                  );
                }
              );
            }

            res.status(200).json({ status: "success" });
          }

          //   "select  EMP_ID ,DESIGNATION_ID from emloyee where HR_ID='" + req.id + "'",
          //   (err, result) => {
          //     if (err) {
          //       return res.status(400).json({ status: "failed", err });
          //     }

          //     for (let i = 0; i < result.length; i++) {
          //       db.query(
          //         "select BASIC_SALARY,ALLOUNCE from designation where DESIGNATION_ID='" +
          //           result[i].DESIGNATION_ID +
          //           "'",
          //         (err, result2) => {
          //           if (err) {
          //             return res.status(400).json({ status: "failed", err });
          //           }
          //           db.query("insert into payroll(SALARY,SALARY_DATE,EMP_ID)");
          //         }
          //       );
          //     }

          //     // const data = result.map((emp_id) => {});
          //   }
        );
      } else {
        res.status(404).json({ status: "failed", message: "already exist" });
      }
    }
  );
};
exports.updatepayroll = (req, res) => {
  const { EMP_ID, SALARY } = req.body;
  let date = new Date();
  let current_month = date.getMonth();
  let current_year = date.getFullYear();
  let first_next = new Date(date.getFullYear, date.getMonth() + 1, 1);
  // db.query
  db.query(
    "update payroll set salary='" +
      SALARY +
      "' where DATE_FORMAT(salary_date, '%Y-%m-%d')like '" +
      `${current_year}-${current_month + 1}-__` +
      "' and EMP_ID='" +
      EMP_ID +
      "' AND HR_ID='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed.", err });
      }

      res.status(200).json({ status: "success." });
    }
  );
};
