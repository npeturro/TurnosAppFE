import React from "react";
import { Box, CircularProgress, Typography, Card } from "@mui/joy";
import AgendaVista from "../sections/agenda/agendaVista";
import { useParams } from "react-router-dom";
import { useGET } from "../hooks/useGET";
import ErrorCard from "../components/errorCard";
import LoadingCard from "../components/loadingCard";

const Agenda = () => {

    const { doctor } = useParams();
    const [turnos, loading, error] = useGET(`turnos`);


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
                <AgendaVista turnos={turnos} />
            </Box>
        </Box>
    );
};

export default Agenda;
