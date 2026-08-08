const verifyIp = (req, res, next) => {
  console.log(req);
  //   if (req.id[0] === "a" && req.loginAs === "Admin") {
  //     // console.log(req.admin, req);
  //     return next();
  //   } else {
  //     res.status(400).json({ status: "falied", message: "access is restricted" });
  //   }
  var ip = req.header("x-forwarded-for") || req.socket.remoteAddress;
  if (ip.toString() === "128.0.0.1") {
    next();
  } else {
    return res
      .status(404)
      .json({ status: "falied", message: "access is restricted" });
  }
};

module.exports = verifyIp;
