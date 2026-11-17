
//When a user logs in we save their token and tell the header to update.

//window dispatch event notifies other parts of the application that the token has changed
export function saveToken(token) {
    localStorage.setItem("access_token", token);
    window.dispatchEvent(new Event("storage"));
}

//When a user logs out we remove the token from local storage
export function clearToken() {
    localStorage.removeItem("access_token");
    window.dispatchEvent(new Event("storage"));
}

//This is a function that returns true or false depending on whether the user is logged in or not. It checks if there is an access token in local storage.
export function isLoggedIn() {
    return Boolean(localStorage.getItem("access_token"));
}
