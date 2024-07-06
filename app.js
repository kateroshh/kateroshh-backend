const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const { errors } = require("celebrate");
const helmet = require("helmet");
const process = require("dotenv").config();

const { MONGODB_URL_DEV, PORT_DEV } = require("./constants");
const { PORT = PORT_DEV, MONGO_URL = MONGODB_URL_DEV } = process.env;

const app = express();
app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://kateroshh.ru",
      "http://kateroshh.ru",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

mongoose.connect(MONGO_URL).then(() => console.log("Connected!"));

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
