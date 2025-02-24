import * as React from "react";
import { Box, Button, IconButton } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useParams } from "react-router-dom";

const TopNavBuscar = () => {
    const { establecimiento } = useParams();
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
            {/* Menú para mobile */}
            <IconButton sx={{ display: { xs: "flex", md: "none" } }}>
                <MenuIcon />
            </IconButton>

            <Box sx={{ marginLeft: "auto" }}>
                <Button variant="plain">Calendario</Button>
                <Button variant="plain">Profesionales</Button>
                <Button variant="plain">Agregar profesional</Button>
                <Button variant="plain" onClick={() => navigate(`/${establecimiento}`)}>
                    Cerrar sesión
                </Button>
            </Box>
        </Box>
    );
};

export default TopNavBuscar;
