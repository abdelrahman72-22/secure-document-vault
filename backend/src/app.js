const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const http = require("http");

const managerRoutes =
  require(
    "./routes/managerRoutes"
  );
const https = require("https");

const fs = require("fs");

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");
const passport = require("passport");
const twoFactorRoutes =
  require("./routes/twoFactorRoutes");
require("./config/passport");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(passport.initialize());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/manager",
  managerRoutes
);
app.use("/api/documents", documentRoutes);
app.use(
  "/api/2fa",
  twoFactorRoutes
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Secure Document Vault API Running"
  });
});

const PORT = process.env.PORT || 5000;

const HTTP_PORT = 5000;

const HTTPS_PORT = 5001;

http.createServer(app).listen(

  HTTP_PORT,

  () => {

    console.log(
      `HTTP Server running on port ${HTTP_PORT}`
    );

  }

);

https.createServer(

  {

    key: fs.readFileSync(
      "./ssl/key.pem"
    ),

    cert: fs.readFileSync(
      "./ssl/cert.pem"
    )

  },

  app

).listen(

  HTTPS_PORT,

  () => {

    console.log(
      `HTTPS Server running on port ${HTTPS_PORT}`
    );

  }

);


