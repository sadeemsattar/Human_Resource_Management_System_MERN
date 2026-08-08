// Restricts QR attendance marking to clients on the organization's network:
// the request IP must match ORG_IP (the organization's public/gateway IP).
const verifyIp = (req, res, next) => {
  const ip = req.header("x-forwarded-for") || req.socket.remoteAddress;
  if (ip.toString() === process.env.ORG_IP) {
    next();
  } else {
    return res
      .status(404)
      .json({ status: "failed", message: "access is restricted" });
  }
};

module.exports = verifyIp;
