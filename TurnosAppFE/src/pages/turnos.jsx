import React from "react";
import { Box } from "@mui/joy";
import { useParams } from "react-router-dom";
import BioCard from "../sections/turnos/bioCard";
import { Calendar } from "../sections/turnos/calendar";

const Turnos = () => {
    const { doctor } = useParams();

    return (
        <Box display="flex" gap={2} height="100vh">
            {/* BioCard fijo a la izquierda */}
            <Box >
                <BioCard doctor={doctor} />
            </Box>

            {/* Calendar ocupa todo el espacio restante */}
            <Box flex="1">
                <Calendar />
            </Box>
        </Box>
    );
};

export default Turnos;
