import React from "react";
import ViewIndex from "../sections/index/viewIndex";
import { Box, CircularProgress, Typography } from "@mui/joy";
import MapCard from "../sections/index/mapCard";
import { useGET } from "../hooks/useGET";

const Index = () => {

    const [profesionales, loading, error] = useGET(`profesionales`);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
                <Typography marginLeft={2}>Cargando datos...</Typography>
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
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                p: 2,
                width: '100%',
            }}
        >
            <Box sx={{ flex: 1 }}>
                <MapCard profesionales={profesionales} />
            </Box>
            <Box sx={{ flex: 2 }}>
                <ViewIndex profesionales={profesionales} />
            </Box>
        </Box>


    );
};

export default Index;
