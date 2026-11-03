// This is a service that checks the health of the database connection by querying the database
const supabase = require("../config/supabase");

async function checkDatabaseConnection() {
    const { error } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);

    if (error) {
        throw error;
    }

    return true;
}

module.exports = { checkDatabaseConnection };
