import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Turnos from "../pages/turnos";
import Index from "../pages";
import MainLayoutPaciente from "../components/layouts/mainLayoutPaciente";
import MainLayoutBuscar from "../components/layouts/mainLayoutBuscar";
import Login from "../pages/login";
import Administrador from "../pages/admin";
import MainLayoutLoged from "../components/layouts/mainLayoutsLoged";

const AppRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/:establecimiento",
            element: (
                <MainLayoutBuscar>
                    <Index />
                </MainLayoutBuscar>
            )
        },
        {
            path: "/:establecimiento/inicio",
            element: (
                <MainLayoutLoged>
                    <Administrador />
                </MainLayoutLoged>

            )
        },
        {
            path: "/:establecimiento/login",
            element: (
                <MainLayoutPaciente>
                    <Login />
                </MainLayoutPaciente>
            )
        },
        {
            path: "/:clinica/:doctor/turnos",
            element: (
                <MainLayoutPaciente>
                    <Turnos />
                </MainLayoutPaciente>
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