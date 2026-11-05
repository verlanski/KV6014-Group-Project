const express = require("express");
const cors = require("cors");


//import the API routes (Only admin for now because that's all I have done)

const adminRoutes = require("./routes/adminRoutes");


const app = express();


//Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use(express.json());

//This is just a health check to make sure that our server is running.
app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "API is running, no issues found"
    });
});

//Routes
app.use("/api/admin", adminRoutes);

//Export the app
module.exports = app;
