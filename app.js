const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const helmet = require("helmet");
const process = require("dotenv").config();

const { MONGODB_URL_DEV, PORT_DEV } = require("./constants");
const { PORT = PORT_DEV, MONGO_URL = MONGODB_URL_DEV } = process.env;

const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const { limiter } = require("./middlewares/rate-limit");

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

app.use(requestLogger); // логгер запросов
app.use(limiter);

/////////////////////////////////////////

////////////////////////////////////////

app.use((req, res, next) => {
  next(new NotFoundError("Страница не найдена"));
});

app.use(errorLogger); // логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
