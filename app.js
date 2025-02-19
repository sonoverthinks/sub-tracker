import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
// Middleware to parse JSON bodies
// It automatically parses JSON request bodies and makes the data available on req.body.
app.use(express.json());

// Middleware to parse URL-encoded bodies
// It parses URL-encoded data (e.g., form data) and makes it available on req.body.
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// Middleware to parse cookies
// Necessary for applications that use cookies for session management, user authentication, or storing user preferences.
app.use(cookieParser());
// arcket rate limiting
app.use(arcjetMiddleware);
// global error checking

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send({ greeting: "hello" });
});

app.listen(PORT, async () => {
  console.log(`server is running on ${PORT}`);
  await connectToDatabase();
});
