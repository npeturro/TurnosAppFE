import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate, useParams } from "react-router-dom";
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
import { useGET } from "../hooks/useGET";
import NotFound from "../pages/notFound";
import MisTurnos from "../pages/misTurnos";

////////////////////// POR EL MOMENTO ESTO NO LO USO PORQUE NO TENGO MAS API FREE. PERO ESTA FUNCIONANDO, VALIDA POR DB QUE EXISTA EL ESTABLECIMIENTO
// const VerificarDatabase = ({ children }) => {
//     const { establecimiento } = useParams();
//     const [existe, loading, error] = useGET(`establecimiento/${establecimiento}`);

//     if (loading) return <p>Cargando...</p>;
//     if (error || !existe) return <Navigate to="*" replace />;

//     return children;
// };
const establecimientosValidos = ["clinica", "hospital", "centro-medico"];

const VerificarDatabase = ({ children }) => {
    const { establecimiento } = useParams();
    const existe = establecimientosValidos.includes(establecimiento);

    if (!existe) return <Navigate to="*" replace />;
    
    return children;
};


const AppRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/:establecimiento",
            element: (
                <VerificarDatabase>
                    <MainLayoutBuscar>
                        <Index />
                    </MainLayoutBuscar>
                </VerificarDatabase>
            )
        },
        {
            path: "/:establecimiento/dashboard",
            element: (
                <VerificarDatabase>
                    <MainLayoutLoged>
                        <Dashboard />
                    </MainLayoutLoged>
                </VerificarDatabase>
            )
        },
        {
            path: "/:establecimiento/profesional",
            element: (
                <VerificarDatabase>
                    <MainLayoutLoged>
                        <Profesional />
                    </MainLayoutLoged>
                </VerificarDatabase>
            )
        },
        {
            path: "/:establecimiento/profesionales",
            element: (
                <VerificarDatabase>
                    <MainLayoutLoged>
                        <Profesionales />
                    </MainLayoutLoged>
                </VerificarDatabase>
            )
        },
        {
            path: "/:establecimiento/agenda",
            element: (
                <VerificarDatabase>
                    <MainLayoutLoged>
                        <Agenda />
                    </MainLayoutLoged>
                </VerificarDatabase>
            )
        },
        {
            path: "/:establecimiento/login",
            element: (
                <VerificarDatabase>
                    <MainLayoutPaciente>
                        <Login />
                    </MainLayoutPaciente>
                </VerificarDatabase>
            )
        },
        {
            path: "/:establecimiento/turnos",
            element: (
                <VerificarDatabase>
                    <MainLayoutPaciente>
                        <MisTurnos />
                    </MainLayoutPaciente>
                </VerificarDatabase>
            )
        },
        {
            path: "/:establecimiento/:doctor/turnos",
            element: (
                <VerificarDatabase>
                    <MainLayoutPaciente>
                        <Turnos />
                    </MainLayoutPaciente>
                </VerificarDatabase>
            )
        },
        {
            path: "*",
            element: (
                <NotFound />
            ),
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRoutes;
