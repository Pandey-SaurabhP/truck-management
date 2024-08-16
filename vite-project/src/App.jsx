import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet,
    useNavigate,
    Navigate,
} from "react-router-dom";
import SendDelivery from "./components/SendDelivery";
import ReceiveDelivery from "./components/ReceiveDelivery";
import QRScanner from "./components/Qr_Scanner";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CurrentDeliveries from "./components/CurrentDeliveries";
import Login from "./components/Login";
import "./styles.css"; // Import your styles

// Mock authentication service
const account = {
    get: async () => {
        // Simulate fetching user data
        return { name: "John Doe", email: "john.doe@example.com" }; // Replace with actual logic
    },
    deleteSession: async () => {
        // Mock logout functionality
    },
};

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await account.get();
                console.log('User : ', userData);
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        }
        fetchUser();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/"
                    element={user ? <MainLayout /> : <Navigate to="/login" />}
                >
                    <Route index element={<HomePage />} />
                    <Route path="/send-delivery" element={<SendDelivery />} />
                    <Route
                        path="/current-deliveries"
                        element={<CurrentDeliveries />}
                    />
                    <Route
                        path="/receive-delivery"
                        element={<ReceiveDelivery />}
                    />
                    <Route path="/qr-scanner" element={<QRScanner />} />
                </Route>
            </Routes>
        </Router>
    );
};

// Main layout with Navbar and Footer
const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="p-6">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

// Login page layout
const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Login />
        </div>
    );
};

export default App;
