const verifyAdmin = (req, res, next) => {
  if (req.id[0] === "a" && req.loginAs === "Admin") {
    // console.log(req.admin, req);
    return next();
  } else {
    res.status(400).json({ status: "falied", message: "access is restricted" });
  }
};
const verifyEmployee = (req, res, next) => {
  if (req.id[0] === "e" && req.loginAs === "Employee") {
    // console.log(req.admin, req);
    return next();
  } else {
    res.status(400).json({ status: "falied", message: "access is restricted" });
  }
};
const verifyHr = (req, res, next) => {
  if (req.id[0] === "h" && req.loginAs === "Hr") {
    // console.log(req.admin, req);
    return next();
  } else {
    res.status(400).json({ status: "falied", message: "access is restricted" });
  }
};
module.exports = { verifyAdmin, verifyEmployee, verifyHr };
