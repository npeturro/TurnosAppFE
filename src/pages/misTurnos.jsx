import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/joy";
import LoginForm from "../sections/login/loginForm";
import themeColors from "../../public/theme/themeColors";
import MisTurnosForm from "../sections/misTurnos/misTurnosForm";

const MisTurnos = () => {
    const { establecimiento } = useParams();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: themeColors.background,
                width: '100%',
                minHeight: '100vh',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 360 }}>
                <MisTurnosForm establecimiento={establecimiento} />
            </Box>
        </Box>
    );
};

export default MisTurnos;
