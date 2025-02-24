import React from "react";
import ViewIndex from "../sections/index/viewIndex";
import { Box, CircularProgress, Typography } from "@mui/joy";
import MapCard from "../sections/index/mapCard";
import { useGET } from "../hooks/useGET";
import NuevoProfesional from "../sections/admin/nuevoProfesional";

const Administrador = () => {

    return (

        <Box display="flex" gap={2} height="100vh" maxWidth={'100%'}>
            <Box>
                <NuevoProfesional />
            </Box>
        </Box>

    );
};

export default Administrador;
