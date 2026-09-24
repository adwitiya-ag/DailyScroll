import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOrigin = process.env.CORS_ORIGIN === "*" 
    ? true 
    : (process.env.CORS_ORIGIN || "http://localhost:5173");

app.use(cors({
    origin: corsOrigin,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// routes import
import userRouter from "./src/routes/user.route.js";
import journalRouter from "./src/routes/journal.route.js";


// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/journals", journalRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        statusCode,
        data: null,
        message: err.message || "Internal Server Error",
        success: false,
        errors: err.errors || []
    });
});

export { app };