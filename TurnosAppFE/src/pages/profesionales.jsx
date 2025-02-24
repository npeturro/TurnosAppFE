import React from "react";
import { Box } from "@mui/joy";
import AgendaVista from "../sections/agenda/agendaVista";
import ProfesionalesVista from "../sections/profesionales/profesionalesVista";

const Profesionales = () => {

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
                <ProfesionalesVista />
            </Box>
        </Box>
    );
};

export default Profesionales;
