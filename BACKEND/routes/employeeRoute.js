const express = require("express");
const router = express.Router();
// --------------------------------
const {
  getEmployeeData,
  getEmployeeAttendance,
  getEmployeePayroll,
  getRequestLeave,
  postrequestleave,
  getResignationRequest,
  delLeaveRequest,
  updateLeaveRequest,
  postResignationRequest,
  delResignationRequest,
  updateResignationRequest,
} = require("../controller/employeeController");
// -------------------------------
router.route("/getemployeedata").get(getEmployeeData);
router.route("/getEmployeeAttendance").get(getEmployeeAttendance);
router.route("/getEmployeePayroll").get(getEmployeePayroll);
router
  .route("/requestleave")
  .get(getRequestLeave)
  .post(postrequestleave)
  .delete(delLeaveRequest)
  .put(updateLeaveRequest);
router
  .route("/requestresignation")
  .get(getResignationRequest)
  .post(postResignationRequest)
  .delete(delResignationRequest)
  .put(updateResignationRequest);
// -------------------------------

module.exports = router;
