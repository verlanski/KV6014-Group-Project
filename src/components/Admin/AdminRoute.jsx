//Here i will be creating an admin route for when a user tries to go to admin page
//I will check if the user is an admin and if they are not i will redirect them to the home page
import { useEffect, useState } from "react";
import { Navigate } from "react-router";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function AdminRoute({ children }) {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const checkAdminStatus = async () => {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) {
                setIsAdmin(false);
                return;
            }
            

            fetch(`${API_URL}/api/auth/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
                .then(response => (response.ok ? response.json() : null))
                .then(data => {
                setIsAdmin(data?.role === "admin");
            })
            .catch(error => {
                console.error("Error checking admin status:", error);
                setIsAdmin(false);
            });

        };
        checkAdminStatus();
    }, []);

    if (isAdmin === null) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace/>;
    }

    return children;
}
