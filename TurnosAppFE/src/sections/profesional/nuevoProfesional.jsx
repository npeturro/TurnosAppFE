import React from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalDialog, Typography, Button, Input, CircularProgress, Option, Box, Card } from "@mui/joy";
import { toast } from "sonner";
import axios from "axios";

const NuevoProfesional = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {

        setLoading(true);

        try {

            console.log("Datos actualizados:", response.data);
            toast.success("Turno reservado con éxito!");

            reset(); // Limpia el formulario

        } catch (error) {
            if (error.response) {
                // Respuesta con error del servidor (4xx, 5xx)
                console.error("Error del servidor:", error.response.data);
                toast.error(`Error: ${error.response.data.message || "No se pudo reservar el turno."}`);
            } else if (error.request) {
                // No hubo respuesta del servidor
                console.error("No se recibió respuesta del servidor.");
                toast.error("No se pudo conectar con el servidor.");
            } else {
                // Otro tipo de error
                console.error("Error desconocido:", error.message);
                toast.error("Ocurrió un error inesperado.");
            }
        } finally {
            setLoading(false);
        }
    };


    return (

        <Box >
            <Card sx={{ boxShadow: "lg" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            <Input
                                fullWidth
                                placeholder="Nombre y apellido"
                                {...register("nombre", { required: "El nombre y apellido es obligatorio" })}
                            />
                            {errors.nombre && <Typography color="danger">{errors.nombre.message}</Typography>}

                            <Input
                                fullWidth
                                placeholder="Email"
                                type="email"
                                {...register("email", { required: "El email es obligatorio" })}
                            />
                            {errors.email && <Typography color="danger">{errors.email.message}</Typography>}

                            <Input
                                fullWidth
                                placeholder="Clínica"
                                {...register("clinica", { required: "La clínica es obligatorio" })}
                            />
                            {errors.clinica && <Typography color="danger">{errors.clinica.message}</Typography>}

                            <Input
                                fullWidth
                                type="number"
                                placeholder="Celular"
                                {...register("celular", { required: "El celular es obligatorio" })}
                            />
                            {errors.celular && <Typography color="danger">{errors.celular.message}</Typography>}
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
                            <Button
                                type="submit"
                                sx={{ minWidth: "120px" }}
                            >
                                Crear
                            </Button>

                        </Box>
                    </Box>
                </form>
            </Card>
        </Box>

    );
};

export default NuevoProfesional;
