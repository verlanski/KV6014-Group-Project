const authService = require("../services/authService");

/**
 * Handle new user registration
 * POST /api/auth/register
 */
async function register(req, res) {
    try {
        const { email, password, fullName, phone, address, consent } = req.body;

        if (!email || !password || !fullName) {
            return res.status(400).json({
                error: "Full name, email, and password are required"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                error: "Password must be at least 8 characters long"
            });
        }

        const result = await authService.registerUser({
            email,
            password,
            fullName,
            phone,
            address,
            consent
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result.user,
            session: result.session,
            role: result.role,
            profile: result.profile
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        // Friendly error for duplicate emails or auth issues
        const statusCode = error.status || (error.message?.includes("already registered") ? 400 : 500);
        res.status(statusCode).json({
            error: error.message || "Registration failed"
        });
    }
}

/**
 * Handle user login
 * POST /api/auth/login
 */
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const result = await authService.loginUser({
            email,
            password
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: result.user,
            session: result.session,
            role: result.role,
            profile: result.profile
        });

    } catch (error) {
        console.error("Login error:", error.message);

        const isAuthFail = error.message?.toLowerCase().includes("invalid login credentials");
        res.status(isAuthFail ? 401 : 500).json({
            error: isAuthFail ? "Invalid email or password" : (error.message || "Login failed")
        });
    }
}

/**
 * Retrieve current authenticated user profile
 * GET /api/auth/me
 */
async function getMe(req, res) {
    try {
        const profile = await authService.getUserProfile(req.user.id);

        res.status(200).json({
            success: true,
            user: req.user,
            role: profile?.role || "user",
            profile
        });

    } catch (error) {
        console.error("Fetch current user error:", error.message);

        res.status(500).json({
            error: "Unable to retrieve user profile"
        });
    }
}

module.exports = {
    register,
    login,
    getMe
};
