import React from "react";
import { Box, CircularProgress, Typography, Card } from "@mui/joy";
import AgendaVista from "../sections/agenda/agendaVista";
import { useParams } from "react-router-dom";
import { useGET } from "../hooks/useGET";

const Agenda = () => {

    const { doctor } = useParams();
    const [turnos, loading, error] = useGET(`turnos`);


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
                <Typography marginLeft={2}>Cargando datos del profesional...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography color="error">Error al cargar los datos</Typography>
            </Box>
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
