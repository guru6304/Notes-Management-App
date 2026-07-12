const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const app= express();
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            process.env.FRONTEND_URL
        ],
        credentials: true
    })
);
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Notes Management API is running...");
});
app.use("/api/auth",authRouter);
app.use("/api/notes", noteRoutes);
app.use(errorHandler)
module.exports= app;