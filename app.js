const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const helmet = require("helmet");
require("dotenv").config();

const { MONGODB_URL_DEV, PORT_DEV } = require("./constants");
const { PORT = PORT_DEV, MONGO_URL = MONGODB_URL_DEV } = process.env;

const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const { limiter } = require("./middlewares/rate-limit");
const { NotFoundError } = require("./errors/errors");

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
const Skill = require("./models/skill");
const SkillsRouter = express.Router();

SkillsRouter.post("/skills", (req, res) => {
  Skill.create({ name: "SQL" })
    .then((skill) => res.send(skill))
    .catch((error) => res.send(error));
});

SkillsRouter.get("/skills", (req, res, next) => {
  Skill.find({})
    .then((skills) => res.send(skills))
    .catch(next);
});

app.use(SkillsRouter);

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

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
