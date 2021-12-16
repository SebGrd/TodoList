import createError from "http-errors";
import express, {Request, Response, NextFunction, raw} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import todoListRouter from "./routes/todoList";
import todoListItemRouter from "./routes/todoListItem";

const app = express();

// Security
app.disable('x-powered-by');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/todoList", todoListRouter);
app.use("/todoListItem", todoListItemRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  const error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ message: err.message, error });
});

export default app;
