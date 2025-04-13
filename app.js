const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

const ownersRouter = require("./routes/ownerRouter");
const productsRouter = require("./routes/productRouter"); // this must be correct filename
const usersRouter = require("./routes/userRouter");
const indexRouter = require("./routes/index");

require("./config/mongoose-connections"); // connect to MongoDB

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// ROUTES
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter); // <-- connects POST /products/create

// SERVER
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000"); 
});
