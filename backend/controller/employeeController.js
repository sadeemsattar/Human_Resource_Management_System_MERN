const path = require("path");
const db = require("../config/database");
// exports.getEmployeeFrontPage = (req, res) => {
//   res.status(200).send(`welcome employee ${req.query.employeeUserName}`);
// };

exports.getEmployeeData = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  console.log(req);
  let myData;
  db.query(
    "select * from employee where EMP_ID='" + req.id + "'",
    (err, result) => {
      myData = result;
      // console.log(myData[0].EMP_ID);
      res.status(200).json({ status: "success", data: result });
    }
  );
  // db.end;
};

exports.getEmployeeAttendance = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  db.query(
    "select MARK,date_format(MARK_DATE, '%Y-%m-%d' ) as 'MARK_DATE',EMP_ID from attendence where EMP_ID='" +
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

exports.getEmployeePayroll = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });

  db.query(
    "select * from payroll where EMP_ID='" + req.id + "'",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.getRequestLeave = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured..
  //   }
  // });
  db.query(
    "select date_format(START_DATE, '%Y-%m-%d' ) as 'START_DATE',date_format(END_DATE, '%Y-%m-%d' ) as 'END_DATE',REASON,LEAVE_STATUS,EMP_ID,HR_ID from leave_request where EMP_ID='" +
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

exports.postrequestleave = (req, res) => {
  const { reason, startDate, endDate } = req.body;
  // console.log(endDate, req.body);
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  db.query(
    "insert into leave_request(start_date,end_date,reason,leave_status,EMP_ID,HR_ID) values('" +
      startDate +
      "','" +
      endDate +
      "','" +
      reason +
      "','under review','" +
      req.id +
      "',(select HR_ID from employee where EMP_ID='" +
      req.id +
      "'))",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failer", err });
      }
      res.status(200).json({
        status: "success",
      });
    }
  );
  // db.end;
};
exports.delLeaveRequest = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  db.query(
    "delete from leave_request where EMP_ID='" +
      req.id +
      "' and start_date='" +
      req.body.startDate +
      "' and leave_status='under review'",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.updateLeaveRequest = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  db.query(
    "update leave_request set reason='" +
      req.body.reason +
      "',end_date='" +
      req.body.endDate +
      "' where emp_id='" +
      req.id +
      "' and start_date='" +
      req.body.startDate +
      "' and leave_status='under review'",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};

exports.getResignationRequest = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  db.query(
    "select  approved_status,reason,date_format(apply_date, '%Y-%m-%d' ) as 'apply_date',hr_id,emp_id from resignation where emp_id='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failer", err });
      }

      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.postResignationRequest = (req, res) => {
  const { reason, date } = req.body;
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  db.query(
    "select EMP_ID FROM resignation where EMP_ID='" +
      req.id +
      "'and approved_status='under review'",
    (error, row) => {
      if (error) {
        return res.status(400).json({ status: "failed" });
      }
      if (row.length === 0) {
        db.query(
          " insert into resignation(reason,apply_date,approved_status,emp_id,HR_ID) values('" +
            reason +
            "','" +
            date +
            "','under review','" +
            req.id +
            "',(select HR_ID from employee where EMP_ID='" +
            req.id +
            "')) ",
          (err, result) => {
            if (err) {
              return res.status(400).json({ status: "failer", err });
            }
            res.status(200).json({
              status: "success",
            });
          }
        );
      } else {
        res.status(400).json({
          status: "failed",
          message: "resignation request under review",
        });
      }
    }
  );

  // db.end;
};

exports.delResignationRequest = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  db.query(
    "delete from resignation where EMP_ID='" +
      req.id +
      "' and apply_date='" +
      req.body.date +
      "' and approved_status='under review'",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  db.end;
};
exports.updateResignationRequest = (req, res) => {
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  db.query(
    "update resignation set reason='" +
      req.body.reason +
      "' where emp_id='" +
      req.id +
      "' and apply_date='" +
      req.body.date +
      "' and approved_status='under review'",
    (err, result) => {
      if (err) {
        res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
