import * as React from "react";
import { Box, Button, IconButton, Drawer, List, ListItem } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/joy";
import themeColors from "../../../public/theme/themeColors";
const TopNavBuscar = () => {
    const { establecimiento } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Función para manejar la navegación y cerrar el drawer
    const handleNavigate = (path) => {
        navigate(path);
        setOpen(false); // Cierra el drawer después de navegar
    };

    return (
        <Box
            component="nav"
            sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                boxShadow: "sm",
                backgroundColor: themeColors.neutral
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
                        <ListItem>
                            <Button variant="plain" onClick={() => handleNavigate(`/${establecimiento}/dashboard`)}>
                                Dashboard
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button variant="plain" onClick={() => handleNavigate(`/${establecimiento}/agenda`)}>
                                Calendario
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button variant="plain" onClick={() => handleNavigate(`/${establecimiento}/profesionales`)}>
                                Profesionales
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button variant="plain" onClick={() => handleNavigate(`/${establecimiento}/profesional`)}>
                                Agregar profesional
                            </Button>
                        </ListItem>
                    </List>
                </Drawer>
            ) : (
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="plain" onClick={() => handleNavigate(`/${establecimiento}/dashboard`)}>Dashboard</Button>
                    <Button variant="plain" onClick={() => handleNavigate(`/${establecimiento}/agenda`)}>Calendario</Button>
                    <Button variant="plain" onClick={() => handleNavigate(`/${establecimiento}/profesionales`)}>Profesionales</Button>
                    <Button variant="plain" onClick={() => handleNavigate(`/${establecimiento}/profesional`)}>Agregar profesional</Button>
                </Box>
            )}

            <Box sx={{ marginLeft: "auto" }}>
                <Button variant="plain" onClick={() => handleNavigate(`/${establecimiento}`)}>
                    Cerrar sesión
                </Button>
            </Box>
        </Box>
    );
};

export default TopNavBuscar;
