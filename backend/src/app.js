const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const app= express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/notes", noteRoutes);
app.use(errorHandler)
module.exports= app;