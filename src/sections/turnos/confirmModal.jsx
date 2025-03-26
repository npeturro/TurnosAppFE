import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ConfirmModal({ open, setOpen }) {
    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setOpen(inOpen);
    };

    return (
        <Drawer open={open} anchor="bottom" onClose={toggleDrawer(false)}>
            <Box sx={{p:3, textAlign: "center" }}>
                <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
                <Typography level="h4" sx={{ mt: 1 }}>
                    ¡Gracias!
                </Typography>
                <Typography level="body1" sx={{ mb: 2 }}>
                    Tu turno ha sido confirmado.
                </Typography>
                <Divider sx={{p:0}}/>

                <Typography level="body1">
                    <b>Revisa tu correo, te enviaremos los detalles de tu turno.</b>
                </Typography>


                <Typography level="body2" sx={{ color: "gray", mt: 1 }}>
                    Si no encuentras el correo, revisa tu carpeta de spam.
                </Typography>
            </Box>
        </Drawer>
    );
}
