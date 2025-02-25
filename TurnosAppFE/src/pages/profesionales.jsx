import React from "react";
import { Box, CircularProgress, Typography } from "@mui/joy";
import AgendaVista from "../sections/agenda/agendaVista";
import ProfesionalesVista from "../sections/profesionales/profesionalesVista";
import { useGET } from "../hooks/useGET";
import LoadingCard from "../components/loadingCard";
import ErrorCard from "../components/errorCard";

const Profesionales = () => {

    const [profesionales, loading, error] = useGET(`profesionales`);

    if (loading) {
        return (
            <LoadingCard />
        );
    }

    if (error) {
        return (
            <ErrorCard />
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                width: '100%',
                minHeight: '100vh',
                p: 2
            }}
        >
            <Box sx={{ width: '100%' }}>
                <ProfesionalesVista profesionales={profesionales} />
            </Box>
        </Box>
    );
};

export default Profesionales;
