//Pages routing

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AboutCCPage from "./pages/AboutCCPage";
import AdminManageBookingsPage from "./pages/AdminManageBookingsPage";
import AdminManageTimeslots from "./pages/AdminManageTimeslotsPage.jsx";
import AdminManageSlotCapacityPage from "./pages/AdminManageSlotCapacityPage.jsx";
import AdminManageCLPage from "./pages/AdminManageCLPage.jsx";
import Confirmation from "./pages/Confirmation";

import NotFoundPage from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router";

//Components
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import AdminRoute from "./components/Admin/AdminRoute.jsx";



export default function App () {
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
                <Route path="/about-cervical-cancer" element={<AboutCCPage/>} />
                <Route path="/" element={<HomePage />} />
                <Route path="/booking/confirmation" element={<Confirmation />} /> 

                {/* Admin pages: AdminRoute checks the user is an admin first */}
                <Route path="/admin" element={<AdminRoute />}>
                    <Route index element={<AdminPage />} />
                    <Route path="manage-bookings" element={<AdminManageBookingsPage />} />
                    <Route path="manage-timeslots" element={<AdminManageTimeslots />} />
                    <Route path="manage-slot-capacity" element={<AdminManageSlotCapacityPage />} />
                    <Route path="manage-community-leaders" element={<AdminManageCLPage />} />
                </Route>

                {/* Anything else (404) */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </div>
            <Footer />
        </div>
        </BrowserRouter>
    );
}
