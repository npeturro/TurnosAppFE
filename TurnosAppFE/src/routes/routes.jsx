import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Turnos from "../pages/turnos";
import MainLayout from "../components/layouts/mainLayouts";
import Index from "../pages";

const AppRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <MainLayout>
                    <Index />
                </MainLayout>
            )
        },
        {
            path: "/:doctor/turnos",
            element: (
                <MainLayout>
                    <Turnos />
                </MainLayout>
            )
        },
    ]);

    return (
        <div>
            {<RouterProvider router={router} />}
        </div>
    )
};

export default AppRoutes;