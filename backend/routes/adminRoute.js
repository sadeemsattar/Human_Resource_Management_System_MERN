const express = require("express");
const router = express.Router();
// --------------------------------

const {
  getHr,
  delHr,
  updateHr,
  addHr,
  getAdminData,
  getDesignation,
  postDesignation,
  delDesignation,
  updateDesignation,
  getDepartment,
  postDepartment,
  delDepartment,
  updateDepartment,
} = require("../controller/adminController");
// --------------------------------
// router.route("/admin").get(getAdminFrontPage);
// router.route("/addemployee").post(addEmployee);
router.route("/addhr").get(getHr).post(addHr).delete(delHr).put(updateHr);
router.route("/getadmindata").get(getAdminData);
router
  .route("/managedesignation")
  .get(getDesignation)
  .post(postDesignation)
  .delete(delDesignation)
  .put(updateDesignation);
router
  .route("/managedepartment")
  .get(getDepartment)
  .post(postDepartment)
  .delete(delDepartment)
  .put(updateDepartment);
module.exports = router;
