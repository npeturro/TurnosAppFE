import React from "react";
import ViewIndex from "../sections/index/viewIndex";
import { Box, CircularProgress, Typography } from "@mui/joy";
import MapCard from "../sections/index/mapCard";
import { useGET } from "../hooks/useGET";
import NuevoProfesional from "../sections/profesional/nuevoProfesional";
import themeColors from "../../public/theme/themeColors";

const Profesional = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                width: '100%',
                minHeight: '100vh',
                p:2,
                backgroundColor: themeColors.background
            }}
        >
            <Box sx={{ width: '100%' }}>
                <NuevoProfesional />
            </Box>
        </Box>
    );
};

export default Profesional;
