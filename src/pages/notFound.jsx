import { Box, Typography, Button } from "@mui/joy";
import themeColors from "../../public/theme/themeColors";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()

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
            <Typography level="h1" color="danger" sx={{ fontSize: "3rem", fontWeight: "bold" }}>
                404
            </Typography>
            <Typography level="h4" sx={{ mt: 1 }}>
                La ruta ingresada es incorrecta
            </Typography>
            <Button
                onClick={() => navigate(-1)}
                variant="solid"
                color="primary"
                sx={{ mt: 2 }}
            >
                Volver atrás
            </Button>
        </Box>
    );
};

export default NotFound;
