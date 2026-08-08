const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
// ---------------------------------

const usersRoute = require("./routes/usersRoute");
const adminRoute = require("./routes/adminRoute");
const hrRoute = require("./routes/hrRoute");
const qrRoute = require("./routes/qrRoute");
const employeeRoute = require("./routes/employeeRoute");
const { validateToken } = require("./middleware/JWT");
const {
  verifyAdmin,
  verifyHr,
  verifyEmployee,
} = require("./middleware/verifyRoles");
const authIp = require("./middleware/authIp");
// --------------------------------------------------
//setup middlewares
app.use(express.static(path.join(__dirname, "build")));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ] /*added after attendance issue.need to do it in clinet-server achitect(told by pedro). might delet later*/,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
); //for cors error
app.use(express.json()); //to get req.body data instead of undefined.for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(cookieParser());
// ---------------------------------------------------
// routes middleswares
app.use("/", usersRoute);
app.use("/qr", authIp, qrRoute);
app.use("/admin", validateToken, verifyAdmin, adminRoute);
app.use("/hr", validateToken, verifyHr, hrRoute);
app.use("/employee", validateToken, verifyEmployee, employeeRoute);

app.use("*", (req, res) => {
  res.status(404).send("404 page not founf");
});
module.exports = app;
