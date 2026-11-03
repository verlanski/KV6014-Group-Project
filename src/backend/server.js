require("dotenv").config();


const express = require("express");
const cors = require("cors");
const { checkDatabaseConnection } = require("./services/healthService");

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require("./routes/adminRoutes");

app.use("/api/admin", routes);

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));


app.use(express.json());

app.get("/api/health", async (req, res) => {
    try {
        await checkDatabaseConnection();

        res.json({
            status: "success",
            database: "connected"
        });
    } catch (error) {
        console.error("Database test failed:", error.message);

        res.status(500).json({
            status: "error",
            database: "connection failed"
        });
    }
});

app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
});

