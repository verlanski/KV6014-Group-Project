const supabase = require("../config/supabase");
const supabaseAdmin = require("../config/supabaseAdmin");

/**
 * Register a new user in Supabase Auth and save profile in profiles table
 * @param {Object} userData - Registration payload
 * @returns {Promise<Object>} Created user, session, and profile
 */
async function registerUser({ email, password, fullName, phone, address, consent }) {
    // 0. Pre-check if email already exists via admin client
    const { data: usersList } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = usersList?.users?.find(
        (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
        const error = new Error("An account with this email address already exists. Please log in instead.");
        error.status = 409;
        throw error;
    }

    // 1. Sign up user via Supabase Auth
    const redirectUrl = process.env.FRONTEND_URL 
        ? `${process.env.FRONTEND_URL}/login` 
        : "http://localhost:5173/login";

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: redirectUrl,
            data: {
                full_name: fullName,
                phone,
                address,
                consent: consent ?? true
            }
        }
    });

    if (authError) throw authError;

    // Check if Supabase detected a duplicate via empty identities
    if (authData.user && (!authData.user.identities || authData.user.identities.length === 0)) {
        const error = new Error("An account with this email address already exists. Please log in instead.");
        error.status = 409;
        throw error;
    }

    const user = authData.user;
    if (!user) {
        throw new Error("User registration failed. No user record returned.");
    }

    // 2. Insert or update user profile with 'customer' role in database
    const profilePayload = {
        id: user.id,
        full_name: fullName,
        role: "customer"
    };

    const { data: profileData, error: profileError } = await supabaseAdmin
        .from("profiles")
        .upsert(profilePayload)
        .select()
        .single();

    if (profileError) {
        console.error("Warning: Profile record could not be created:", profileError.message);
    }

    return {
        user,
        session: authData.session,
        profile: profileData || profilePayload,
        role: "user"
    };
}

/**
 * Authenticate user with email and password, retrieving their profile & role
 * @param {Object} credentials - Email and password
 * @returns {Promise<Object>} User, session token, profile, and role
 */
async function loginUser({ email, password }) {
    // 1. Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;

    // 2. Fetch role and profile details from profiles table
    let { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (!profile) {
        const { data: newProfile } = await supabaseAdmin
            .from("profiles")
            .insert({
                id: data.user.id,
                full_name: data.user.user_metadata?.full_name || email,
                role: "customer"
            })
            .select()
            .single();
        profile = newProfile;
    }

    const role = profile?.role || "customer";

    return {
        user: data.user,
        session: data.session,
        role,
        profile: profile || null
    };
}

/**
 * Retrieve user profile and role by user ID
 * @param {string} userId - Supabase auth user UUID
 * @returns {Promise<Object>} User profile
 */
async function getUserProfile(userId) {
    if (!userId) {
        throw new Error("User ID is required to fetch profile");
    }

    const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) throw error;
    return data;
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
