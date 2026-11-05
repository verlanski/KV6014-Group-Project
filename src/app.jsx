//Pages routing

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AboutCCPage from "./pages/AboutCCPage";
import NotFoundPage from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router";

//Components
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";



export default function App() {
    return (
        <BrowserRouter>
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1"> 
            <Routes>
                {/* Login and registration pages routed */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Main pages */}
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/about-cervical-cancer" element={<AboutCCPage/>} />
                <Route path="/" element={<HomePage />} />

                {/* Anything else (404) */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </div>
            <Footer />
        </div>
        </BrowserRouter>
    );
}