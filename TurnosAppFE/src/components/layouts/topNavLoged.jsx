import * as React from "react";
import { Box, Button, IconButton, Drawer, List, ListItem } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/joy";

const TopNavBuscar = () => {
    const { establecimiento } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
            {isMobile && (
                <IconButton onClick={() => setOpen(true)}>
                    <MenuIcon />
                </IconButton>
            )}

            {isMobile ? (
                <Drawer open={open} onClose={() => setOpen(false)}>
                    <List>
                        <ListItem><Button variant="plain" onClick={() => navigate(`/${establecimiento}/dashboard`)}>Dashboard</Button></ListItem>
                        <ListItem><Button variant="plain" onClick={() => navigate(`/${establecimiento}/agenda`)}>Calendario</Button></ListItem>
                        <ListItem><Button variant="plain" onClick={() => navigate(`/${establecimiento}/profesionales`)}>Profesionales</Button></ListItem>
                        <ListItem><Button variant="plain" onClick={() => navigate(`/${establecimiento}/profesional`)}>Agregar profesional</Button></ListItem>
                    </List>
                </Drawer>
            ) : (
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="plain" onClick={() => navigate(`/${establecimiento}/dashboard`)}>Dashboard</Button>
                    <Button variant="plain" onClick={() => navigate(`/${establecimiento}/agenda`)}>Calendario</Button>
                    <Button variant="plain" onClick={() => navigate(`/${establecimiento}/profesionales`)}>Profesionales</Button>
                    <Button variant="plain" onClick={() => navigate(`/${establecimiento}/profesional`)}>Agregar profesional</Button>
                </Box>
            )}

            <Box sx={{ marginLeft: "auto" }}>
                <Button variant="plain" onClick={() => navigate(`/${establecimiento}`)}>
                    Cerrar sesión
                </Button>
            </Box>
        </Box>
    );
};

export default TopNavBuscar;
