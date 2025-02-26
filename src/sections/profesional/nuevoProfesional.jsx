import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Card, Input, Typography, Button, Checkbox } from "@mui/joy";
import { toast } from "sonner";

const diasSemana = [
    { id: 1, nombre: "Lunes" },
    { id: 2, nombre: "Martes" },
    { id: 3, nombre: "Miércoles" },
    { id: 4, nombre: "Jueves" },
    { id: 5, nombre: "Viernes" },
    { id: 6, nombre: "Sábado" },
    { id: 7, nombre: "Domingo" },
];

const NuevoProfesional = () => {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [horarios, setHorarios] = useState(diasSemana.map(dia => ({ daysOfWeek: [dia.id], startTime: "", endTime: "" })));

    const actualizarHorario = (index, field, value) => {
        const nuevosHorarios = [...horarios];
        nuevosHorarios[index][field] = value;
        setHorarios(nuevosHorarios);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const horariosFiltrados = horarios.filter(h => h.startTime && h.endTime);

        const nuevoProfesional = {
            profesional: data.nombre,
            especialidad: data.especialidad,
            clinica: data.clinica,
            activo: data.activo,
            businessHours: horariosFiltrados
        };

        try {
            console.log("Datos a enviar:", nuevoProfesional);
            toast.success("Profesional creado con éxito!");
            reset();
            setHorarios(diasSemana.map(dia => ({ daysOfWeek: [dia.id], startTime: "", endTime: "" })));
        } catch (error) {
            toast.error("Error al crear el profesional.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Card sx={{ boxShadow: "lg", p: 3 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                        <Input fullWidth placeholder="Nombre y apellido" {...register("nombre", { required: "El nombre es obligatorio" })} />
                        {errors.nombre && <Typography color="danger">{errors.nombre.message}</Typography>}

                        <Input fullWidth placeholder="Especialidad" {...register("especialidad", { required: "La especialidad es obligatoria" })} />
                        {errors.especialidad && <Typography color="danger">{errors.especialidad.message}</Typography>}

                        <Input fullWidth placeholder="Clínica" {...register("clinica", { required: "La clínica es obligatoria" })} />
                        {errors.clinica && <Typography color="danger">{errors.clinica.message}</Typography>}

                        <Controller name="activo" control={control} defaultValue={true} render={({ field }) => (
                            <Checkbox {...field} label="Activo" checked={field.value} />
                        )} />

                        <Typography sx={{ mt: 2, fontWeight: "bold" }}>Horarios de atención:</Typography>
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                            gap: 2
                        }}>
                            {horarios.map((horario, index) => (
                                <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography>{diasSemana[index].nombre}</Typography>
                                    <Input type="time" value={horario.startTime} onChange={(e) => actualizarHorario(index, "startTime", e.target.value)} />
                                    <Input type="time" value={horario.endTime} onChange={(e) => actualizarHorario(index, "endTime", e.target.value)} />
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                            <Button type="submit" sx={{ minWidth: "120px" }} disabled={loading}>
                                {loading ? "Guardando..." : "Crear"}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

export default NuevoProfesional;