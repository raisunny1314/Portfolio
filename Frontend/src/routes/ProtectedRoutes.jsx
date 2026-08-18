import React from 'react'
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import api from "../services/api"

const ProtectedRoutes = ({children}) => {
    const [authState, setAuthState] = useState("loading");

    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                await api.get("/admin/verify");
                setAuthState("Authenticated");
            } catch (err) {
                setAuthState("unAuthenticated")
            }
        }

        verifyAdmin();
    }, []);

    if (authState === "loading") {
        return (
            <div className='min-h-screen flex items-center justify-center bg-[#050505] text-white'>
                Loading...
            </div>
        );
    }
    if (authState === "unAuthenticated") {
        return <Navigate to='/admin/login' replace />
    }

    return children;
};

export default ProtectedRoutes
