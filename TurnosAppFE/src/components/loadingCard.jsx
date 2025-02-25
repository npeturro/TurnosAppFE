import React from "react";
import { Box, CircularProgress, Typography } from "@mui/joy";
import themeColors from "../../public/theme/themeColors";

const LoadingCard = () => {

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
            <Typography marginLeft={2}>Cargando datos...</Typography>
        </Box>
    );

};

export default LoadingCard;
