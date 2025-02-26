import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Typography, Link, Card } from "@mui/joy";


const LoginForm = ({ establecimiento }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        navigate(`/${establecimiento}/dashboard`);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Card sx={{ width: 360, p: 3, boxShadow: "lg" }}>
                <Typography level="h4" textAlign="center" fontWeight="lg">
                    Inicia sesión en tu cuenta
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    <FormControl error={!!errors.email}>
                        <FormLabel>Correo electrónico</FormLabel>
                        <Input
                            type="email"
                            placeholder="Correo electrónico"
                            {...register("email", { required: "El correo es obligatorio" })}
                        />
                        {errors.email && <Typography color="danger" level="body-sm">{errors.email.message}</Typography>}
                    </FormControl>
                    <FormControl error={!!errors.password}>
                        <FormLabel>Contraseña</FormLabel>
                        <Input
                            type="password"
                            placeholder="Contraseña"
                            {...register("password", { required: "La contraseña es obligatoria" })}
                        />
                        {errors.password && <Typography color="danger" level="body-sm">{errors.password.message}</Typography>}
                    </FormControl>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Checkbox {...register("rememberMe")} label="Recordarme" />
                        <Link href="#" level="body-sm">Olvidaste tu contraseña?</Link>
                    </Box>
                    <Button fullWidth type="submit">Ingresar</Button>
                </Box>
            </Card>
        </Box>
    );
};

export default LoginForm;
