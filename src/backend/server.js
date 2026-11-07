require("dotenv").config();


const express = require("express");
const cors = require("cors");
const { checkDatabaseConnection } = require("./services/healthService");

const app = express();
const PORT = process.env.PORT || 3000;

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

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

