const e = require("express");
const express = require("express");
const router = express.Router();
const db = require("../config/database");
// ----------------------------------
const getEmployeeId = (req, res) => {
  const { id } = req.body;
  console.log(id);
  if (id) {
    db.query(
      "select E.EMP_ID from employee E where E.EMP_ID='" +
        id +
        "'and  E.EMP_ID NOT IN (select L.EMP_ID from leave_request L where L.EMP_ID='" +
        id +
        "' AND date_format(sysdate(), '%Y-%m-%d' ) between date_format(L.Start_date, '%Y-%m-%d' ) and date_format(L.end_date, '%Y-%m-%d' ) and L.LEAVE_STATUS='approved') and E.EMP_ID NOT IN (select EMP_ID FROM attendence where EMP_ID='" +
        id +
        "' AND MARK_DATE=date_format(sysdate(), '%Y-%m-%d' ))",

      (err, result) => {
        if (err) {
          return res.status(400).json({ status: "failed.." });
        }
        if (result.length === 1) {
          db.query(
            "insert into attendence(mark,mark_Date,emp_id) values('P',date_format(sysdate(), '%Y-%m-%d' ),'" +
              id +
              "')",
            (err, row) => {
              if (err) {
                return res.status(400).json({ status: "failed..", err });
              }
              res.status(200).json({ status: "success", message: "marked" });
            }
          );
        } else {
          res.status(404).json({ status: "failed", message: "not marked" });
        }
      }
    );
  }
};
router.route("/read").post(getEmployeeId);
module.exports = router;
