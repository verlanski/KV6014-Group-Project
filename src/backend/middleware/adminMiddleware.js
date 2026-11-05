const supabaseAdmin = require("../config/supabaseAdmin");

// Any feature that requires admin privileges uses this middleware to check the user's permissions.
async function requireAdmin(req, res, next) {
    try {
        // Fetch the role from the profiles table for the logged-in user.
        const { data, error } = await supabaseAdmin
            .from("profiles")
            .select("role")
            .eq("id", req.user.id)
            .single();

        // If there's an error or no data is returned, deny access.
        if (error || !data) {
            return res.status(403).json({
                error: "Access denied"
            });
        }

        // If the user doesn't have the admin role, deny access.
        if (data.role !== "admin") {
            return res.status(403).json({
                error: "Administrator permissions required"
            });
        }

        // The user is an admin, so continue to the next middleware or route handler.
        next();

    // Catch any unexpected errors and return a 500 internal server error.
    } catch (error) {
        console.error("Admin authorisation error:", error.message);

        return res.status(500).json({
            error: "Authorisation failed"
        });
    }
}

module.exports = { requireAdmin };
