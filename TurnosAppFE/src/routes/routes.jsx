import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Turnos from "../pages/turnos";
import Index from "../pages";
import MainLayoutPaciente from "../components/layouts/mainLayoutPaciente";
import MainLayoutBuscar from "../components/layouts/mainLayoutBuscar";
import Login from "../pages/login";
import MainLayoutLoged from "../components/layouts/mainLayoutsLoged";
import Profesional from "../pages/profesional";
import Dashboard from "../pages/dashboard";
import Agenda from "../pages/agenda";
import Profesionales from "../pages/profesionales";

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
            path: "/:establecimiento/dashboard",
            element: (
                <MainLayoutLoged>
                    <Dashboard />
                </MainLayoutLoged>

            )
        },
        {
            path: "/:establecimiento/profesional",
            element: (
                <MainLayoutLoged>
                    <Profesional />
                </MainLayoutLoged>

            )
        },
        {
            path: "/:establecimiento/profesionales",
            element: (
                <MainLayoutLoged>
                    <Profesionales />
                </MainLayoutLoged>

            )
        },
        {
            path: "/:establecimiento/agenda",
            element: (
                <MainLayoutLoged>
                    <Agenda />
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