{/*import React from "react";
import { Box, CircularProgress, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";
import BioCard from "../sections/turnos/bioCard";
import { Calendar } from "../sections/turnos/calendar";
import { useGET } from "../hooks/useGET";
import SelecTurnos from "../sections/turnos/selecTurnos";

const Turnos = () => {
    const { doctor } = useParams();
    const [profesional, loading, error] = useGET(`profesionales/${doctor}`);
    const [turnos, loadingTurnos, errorTurnos] = useGET(`turnos`);

    if (loading || loadingTurnos) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
                <Typography marginLeft={2}>Cargando datos del profesional...</Typography>
            </Box>
        );
    }

    if (error || errorTurnos) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography color="error">Error al cargar los datos</Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" gap={2} height="100vh" p={2} mt={2}>
            <Box>
                <BioCard profesional={profesional} />
            </Box>
            <Box flex="1">
                <Calendar turnos={turnos} businessHours={profesional.businessHours}/>
            </Box>
        </Box>
    );
    return (
        <Box
            display="flex"
            gap={2}
            height="100vh"
            p={2}
            mt={2}
            flexDirection={{ xs: 'column', sm: 'row' }} // En pantallas pequeñas en columna, en grandes en fila
            width="100%" // Asegura que el contenedor ocupe todo el ancho
        >
            <Box flex={{ xs: 'none', sm: '0.4' }} width="100%">
                <BioCard profesional={profesional} />
            </Box>
            <Box flex={{ xs: 'none', sm: '0.6' }} width="100%">
            <Calendar turnos={turnos} businessHours={profesional.businessHours}/>
            </Box>
        </Box>


    );
};

export default Turnos;

*/}

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/joy';
import BioCard from '../sections/turnos/bioCard';
import SelecTurnos from '../sections/turnos/selecTurnos';
import { useParams } from "react-router-dom";
import { useGET } from "../hooks/useGET";
import LoadingCard from '../components/loadingCard';
import ErrorCard from '../components/errorCard';

export default function AgendaDemo() {
    const { doctor } = useParams();
    const [profesional, loading, error] = useGET(`profesionales/${doctor}`);
    const [turnos, loadingTurnos, errorTurnos] = useGET(`turnos`);

    if (loading || loadingTurnos) {
        return (
            <LoadingCard />
        );
    }

    if (error || errorTurnos) {
        return (
            <ErrorCard />
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                p: 2,
                width: '100%',
            }}
        >
            <Box sx={{ flex: 1 }}>
                <BioCard profesional={profesional} />
            </Box>
            <Box sx={{ flex: 2 }}>
                <SelecTurnos turnos={turnos} />
            </Box>
        </Box>
    );
}
