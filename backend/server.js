const app = require("./app"); //IMPORT APP

const dotenv = require("dotenv"); //IMPORT ENVVIRONMENT LIBRARY
// ----------------------------------

//CONFIGURE ENVIRONMENT VARIABLE FILE
dotenv.config({ path: "config/config.env" });

// ----------------------------------

//-----------------------------------
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is listening to port ${process.env.PORT}...`);
});
