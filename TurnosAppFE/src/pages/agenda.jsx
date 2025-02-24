import React from "react";
import { Box } from "@mui/joy";
import AgendaVista from "../sections/agenda/agendaVista";

const Agenda = () => {

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
                <AgendaVista />
            </Box>
        </Box>
    );
};

export default Agenda;
