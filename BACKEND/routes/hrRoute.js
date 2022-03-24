const express = require("express");
const router = express.Router();
// --------------------------------
const {
  getHrData,
  addEmployee,
  getEmployee,
  delEmployee,
  updateEmployee,
  getLeave,
  updateLeave,
  getResignation,
  updateResignation,
  getpayroll,
  postpayroll,
  updatepayroll,
} = require("../controller/hrController");
// -------------------------------
router.route("/gethrdata").get(getHrData);
router
  .route("/manageemployee")
  .get(getEmployee)
  .post(addEmployee)
  .delete(delEmployee)
  .put(updateEmployee);
router.route("/manageleave").get(getLeave).put(updateLeave);
router.route("/manageresignation").get(getResignation).put(updateResignation);
router
  .route("/managepayroll")
  .get(getpayroll)
  .post(postpayroll)
  .put(updatepayroll);
// --------------------------------
module.exports = router;
