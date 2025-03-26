import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import themeColors from "../../../public/theme/themeColors";

const TopNavBuscar = () => {
    const navigate = useNavigate();

    return (
        <Box
            component="nav"
            sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                backgroundColor: themeColors.neutral,
                boxShadow: "sm",
            }}
        >
            {/* Menú para mobile 
            <IconButton sx={{ display: { xs: "flex", md: "none" } }}>
                <MenuIcon />
            </IconButton>*/}

            <Box sx={{ marginLeft: "auto" }}>
                <Button variant="plain" onClick={() => navigate("turnos")}>
                    Mis turnos
                </Button>
                <Button variant="plain" onClick={() => navigate("login")}>
                    Iniciar sesión
                </Button>
            </Box>
        </Box>
    );
};

export default TopNavBuscar;
