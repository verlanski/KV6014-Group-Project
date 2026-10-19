//Pages routing

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router";

//Components
import Header from "./components/Header.jsx";



export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* Login and registration pages routed */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Main pages */}
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/" element={<HomePage />} />

                {/* Anything else (404) */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        {/* Footer component to be added here if needed */}
        </BrowserRouter>
    );
}