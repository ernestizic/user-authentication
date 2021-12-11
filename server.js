const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const users = require("./routes/apis/users")


dotenv.config();

// ***************    DATABASE CONNECTION ***************** */

const connectDB = require("./configs/db");
connectDB();

// ********************************************************** */

const app = express();


// *************************** Middleware *************************************
// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));


app.use(passport.initialize());
require("./configs/passportConfig")(passport);

// ***************************** End of Middleware *******************************


// API routes
app.use("/user", users)


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));