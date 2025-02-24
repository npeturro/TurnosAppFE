import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/joy";
import LoginForm from "../sections/login/loginForm";

const Login = () => {
    const { establecimiento } = useParams();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
               
                width: '100%',
                minHeight: '100vh',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 360 }}>
                <LoginForm establecimiento={establecimiento} />
            </Box>
        </Box>
    );
};

export default Login;
