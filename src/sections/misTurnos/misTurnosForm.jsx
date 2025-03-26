import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, Input, Typography, Card } from "@mui/joy";

const MisTurnosForm = ({ establecimiento }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [turnos, setTurnos] = useState(null);

    const onSubmit = async (data) => {
        try {
            // // Simulación de fetch a una API para obtener turnos por correo
            // const response = await fetch(`/api/turnos?email=${data.email}`);
            // const result = await response.json();
            setTurnos(data);
        } catch (error) {
            console.error("Error obteniendo turnos", error);
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card sx={{ width: 360, p: 3, boxShadow: "lg" }}>
                <Typography level="h4" textAlign="center" fontWeight="lg">
                    Ingresa tu correo
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    <FormControl error={!!errors.email}>
                        <Input
                            type="email"
                            placeholder="Correo electrónico"
                            {...register("email", { required: "El correo es obligatorio" })}
                        />
                        {errors.email && <Typography color="danger" level="body-sm">{errors.email.message}</Typography>}
                    </FormControl>
                    <Button fullWidth type="submit">Consultar</Button>
                </Box>
            </Card>
        </Box>
    );
};

export default MisTurnosForm;
