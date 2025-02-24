import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";

const TopNavBuscar = () => {
    const navigate = useNavigate();

    return (
        <Box
            component="nav"
            sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                backgroundColor: "background.surface",
                boxShadow: "sm",
            }}
        >
            {/* Menú para mobile 
            <IconButton sx={{ display: { xs: "flex", md: "none" } }}>
                <MenuIcon />
            </IconButton>*/}

            <Box sx={{ marginLeft: "auto" }}>
                <Button variant="plain" onClick={() => navigate("login")}>
                    Iniciar sesión
                </Button>
            </Box>
        </Box>
    );
};

export default TopNavBuscar;
