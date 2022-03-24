const bcrypt = require("bcrypt");
const mysql = require("mysql");
const db = require("../config/database");
const crypto = require("crypto");

const nodemailer = require("nodemailer");
const { end } = require("../config/database");
// -----------------------------------------

// exports.getAdminFrontPage = (req, res) => {
//   // console.log(req.query);
//   res.status(200).send(`welcome admin ${req.query.adminUserName}`);
// };
exports.getHr = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "select HR_ID,FIRST_NAME, LAST_NAME,EMAIL,PHONE_NUMBER,date_format(DOB, '%Y-%m-%d' ) as 'DOB',date_format(HIRE_DATE, '%Y-%m-%d' ) as 'HIRE_DATE',ADDRESS,CNIC from HR ",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failer" });
      }

      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.addHr = (req, res, next) => {
  //getting data from body
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    hireDate,
    address,
    cnic,
  } = req.body;
  let hrId;
  //generating password
  const password = crypto.randomBytes(20).toString("hex");

  // db.connect((err) => {
  //   if (err) {
  //     res.status(500).json({ message: "internal error occured..." });
  //   }
  // });

  //feting the latest hrId
  db.query("select hr_id from hr ORDER BY hr_id DESC", (err, row) => {
    if (err) {
      return res.status(500).json({ message: "internal error occured..." });
    }
    if (row.length === 0) {
      hrId = "h0";
    } else {
      hrId = `h${parseInt(row[0].hr_id.substring(1, row[0].hr_id.length)) + 1}`;
    }

    // hashing password
    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)).then((hash) => {
      // ------------------------------------------
      // let getId = row[0].hr_id;
      // console.log(getId.substring(1, getId.length), "-----");
      db.query(
        "insert into hr values ('" +
          hrId +
          "','" +
          firstName +
          "','" +
          lastName +
          "','" +
          hash +
          "','" +
          email +
          "'," +
          phoneNumber +
          ",'" +
          dob +
          "','" +
          hireDate +
          "','" +
          address +
          "','" +
          cnic +
          "','" +
          req.id +
          "')",
        (err, result) => {
          if (err) {
            return res.status(404).json({ status: "failed...", err });
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
            to: email,
            subject: "Congragulations,You have been Hired on Hr Position",
            text: `Congragulations Mr/Ms ${firstName} ${lastName}! You have been hired as Hr in our company.For the portal access your email is: ${email} and password is: ${password}`,
          };

          transporter.sendMail(options, (err, info) => {
            if (err) {
              console.log(err);
              return;
            }
            // console.log("Send: " + info.response);
          });
          res.status(200).json({
            status: "success",
            message: "employee added successfully",
          });
        }
      ); //db 2nd query
    }); //bycrypt
  }); //db 1st query
  // db.end;
};
exports.delHr = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "delete from hr where hr_id='" + req.body.hrId + "'",
    (err, result) => {
      if (err) {
        return res.status(404).json({ status: "failed" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.updateHr = (req, res) => {
  const {
    hrId,
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    hireDate,
    address,
    cnic,
  } = req.body;
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "update hr set FIRST_NAME='" +
      firstName +
      "',LAST_NAME='" +
      lastName +
      "',EMAIL='" +
      email +
      "',PHONE_NUMBER='" +
      phoneNumber +
      "',DOB='" +
      dob +
      "',HIRE_DATE='" +
      hireDate +
      "',ADDRESS='" +
      address +
      "',CNIC='" +
      cnic +
      "' where HR_ID='" +
      hrId +
      "'",
    (err, result) => {
      if (err) {
        return res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
// admin data
exports.getAdminData = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "iinternal error occured..." });
  //   }
  // });
  db.query(
    "select  ADMIN_ID,FIRST_NAME,LAST_NAME,CNIC from sys_admin where admin_id='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        // throw err;
        return res.status(404).json({ status: "failer" });
      }

      res.status(200).json({ status: "success", result });
    }
  );
  // db.end();
};
// DESIGNATION DATABSE
exports.getDesignation = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "select  DESIGNATION_ID ,DESIGNATION_NAME,BASIC_SALARY,ALLOUNCE  from designation where admin_id='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failer" });
      }

      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.postDesignation = (req, res) => {
  const { DESIGNATION_NAME, BASIC_SALARY, ALLOUNCE } = req.body;
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "select designation_id from designation order by designation_id desc",
    (err, row) => {
      if (err) {
        return res.status(400).json({ status: "failer" });
      }
      let designationId;
      if (row.length === 0) {
        designationId = 1;
      } else {
        designationId = parseInt(row[0].designation_id) + 1;
      }

      db.query(
        "insert into designation(designation_id,DESIGNATION_NAME,BASIC_SALARY,ALLOUNCE,admin_id) values('" +
          designationId +
          "','" +
          DESIGNATION_NAME +
          "','" +
          BASIC_SALARY +
          "','" +
          ALLOUNCE +
          "','" +
          req.id +
          "')",
        (err, result) => {
          if (err) {
            return res.status(400).json({ status: "failer" });
          }
          res.status(200).json({
            status: "success",
          });
        }
      );
    }
  );
  // db.end;
};

exports.delDesignation = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "delete from designation where designation_id='" +
      req.body.designationId +
      "'",
    (err, result) => {
      if (err) {
        return res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.updateDesignation = (req, res) => {
  const { designation_id, DESIGNATION_NAME, BASIC_SALARY, ALLOUNCE } = req.body;
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "update designation set DESIGNATION_NAME='" +
      DESIGNATION_NAME +
      "' ,BASIC_SALARY=" +
      BASIC_SALARY +
      ", ALLOUNCE=" +
      ALLOUNCE +
      " where DESIGNATION_ID='" +
      designation_id +
      "' ",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  db.end;
};
//Department
exports.getDepartment = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "select  DEPARTMENT_ID ,DEPARTMENT_NAME  from DEPARTMENT where admin_id='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failed" });
      }

      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.postDepartment = (req, res) => {
  const { DEPARTMENT_NAME } = req.body;
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "select DEPARTMENT_ID from department order by DEPARTMENT_ID desc",
    (err, row) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }
      let departmentId;
      if (row.length === 0) {
        departmentId = 1;
      } else {
        departmentId = parseInt(row[0].DEPARTMENT_ID) + 1;
      }

      db.query(
        "insert into department(DEPARTMENT_ID,DEPARTMENT_NAME,admin_id) values('" +
          departmentId +
          "','" +
          DEPARTMENT_NAME +
          "','" +
          req.id +
          "')",
        (err, result) => {
          if (err) {
            return res.status(400).json({ status: "failed" });
          }
          res.status(200).json({
            status: "success",
          });
        }
      );
    }
  );
  // db.end;
};

exports.delDepartment = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "delete from department where department_id='" +
      req.body.departmentId +
      "'",
    (err, result) => {
      if (err) {
        return res.status(404).json({ status: "failed" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.updateDepartment = (req, res) => {
  const { DEPARTMENT_ID, DEPARTMENT_NAME } = req.body;
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).json({ message: "internal error occured..." });
  //   }
  // });
  db.query(
    "update department set DEPARTMENT_NAME='" +
      DEPARTMENT_NAME +
      "' where DEPARTMENT_ID='" +
      DEPARTMENT_ID +
      "' and admin_id='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
// exports.addHr = async (req, res) => {
//   const { emp_id, type, password } = req.body;

//   const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//   });
//   try {
//     const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
//     db.query(
//       "insert into hr values('" + emp_id + "','" + type + "','" + hash + "')",
//       (err, result) => {
//         if (err) {
//           res.status(400).json({
//             status: "failed",
//             message: "cannot process request at the moment",
//           });
//         }

//         res
//           .status(200)
//           .json({ status: "sucess", message: "hr added successfully" });
//       }
//     );
//     db.end();
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: "cannot process request at the moment",
//     });
//   }
// };
