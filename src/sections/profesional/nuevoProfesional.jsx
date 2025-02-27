import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Card, Input, Typography, Button, Checkbox, Select, Option } from "@mui/joy";
import { toast } from "sonner";
import PreviewCalendar from "./previewCalendar";

const diasSemana = [
    { id: 1, nombre: "Lunes" },
    { id: 2, nombre: "Martes" },
    { id: 3, nombre: "Miércoles" },
    { id: 4, nombre: "Jueves" },
    { id: 5, nombre: "Viernes" },
    { id: 6, nombre: "Sábado" },
    { id: 7, nombre: "Domingo" },
];

const duracionesTurno = [15, 30, 45, 60, 120]

const NuevoProfesional = () => {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [duracionTurno, setDuracionTurno] = useState(30);
    const [formData, setFormData] = useState(null);
    const [horarios, setHorarios] = useState(
        diasSemana.map(dia => ({
            daysOfWeek: [dia.id],
            startTime1: "",
            endTime1: "",
            startTime2: "",
            endTime2: "",
        }))
    );

    const actualizarHorario = (index, field, value) => {
        const nuevosHorarios = [...horarios];
        nuevosHorarios[index][field] = value;
        setHorarios(nuevosHorarios);
    };

    const handleCreate = (data) => {
        const horariosFiltrados = horarios.flatMap(h => {
            const horariosDelDia = [];
            if (h.startTime1 && h.endTime1) {
                horariosDelDia.push({ daysOfWeek: h.daysOfWeek, startTime: h.startTime1, endTime: h.endTime1 });
            }
            if (h.startTime2 && h.endTime2 && h.startTime2 > h.endTime1) {
                horariosDelDia.push({ daysOfWeek: h.daysOfWeek, startTime: h.startTime2, endTime: h.endTime2 });
            } else if (h.startTime2 && h.endTime2 && h.startTime2 <= h.endTime1) {
                toast.error(`El segundo horario de ${diasSemana[h.daysOfWeek[0] - 1].nombre} debe ser mayor al primero.`);
                return [];
            }
            return horariosDelDia;
        }).filter(h => h.startTime && h.endTime);

        if (!horariosFiltrados.length) {
            toast.error("Debe ingresar al menos un horario válido.");
            return;
        }

        setFormData({
            profesional: data.nombre,
            especialidad: data.especialidad,
            clinica: data.clinica,
            activo: data.activo,
            duracionTurno,
            businessHours: horariosFiltrados
        });

        setOpen(true);
    };

    const handleConfirmSubmit = async () => {
        setLoading(true);

        try {
            console.log("Datos a enviar:", formData);
            toast.success("Profesional creado con éxito!");
            reset();
            setHorarios(diasSemana.map(dia => ({
                daysOfWeek: [dia.id],
                startTime1: "",
                endTime1: "",
                startTime2: "",
                endTime2: "",
            })));
            setOpenModal(false);
        } catch (error) {
            toast.error("Error al crear el profesional.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <Box>
            <Card sx={{ boxShadow: "lg", p: 3 }}>
                <form onSubmit={handleSubmit(handleCreate)}>
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
                        <Select value={duracionTurno} onChange={(event, newValue) => setDuracionTurno(newValue)}>
                            {duracionesTurno.map(duracion => (
                                <Option key={duracion} value={duracion}>{`${duracion} minutos`}</Option>
                            ))}
                        </Select>
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                            gap: 2
                        }}>
                            {horarios.map((horario, index) => (
                                <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Typography>{diasSemana[index].nombre}</Typography>

                                    {/* Primer Horario */}
                                    <Typography variant="body2">Horario 1:</Typography>
                                    <Input type="time" value={horario.startTime1} onChange={(e) => actualizarHorario(index, "startTime1", e.target.value)} />
                                    <Input type="time" value={horario.endTime1} onChange={(e) => actualizarHorario(index, "endTime1", e.target.value)} />

                                    {/* Segundo Horario */}
                                    <Typography variant="body2" sx={{ mt: 1 }}>Horario 2 (opcional):</Typography>
                                    <Input type="time" value={horario.startTime2} onChange={(e) => actualizarHorario(index, "startTime2", e.target.value)} />
                                    <Input type="time" value={horario.endTime2} onChange={(e) => actualizarHorario(index, "endTime2", e.target.value)} />
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                            <Button type="submit" sx={{ minWidth: "120px" }}>
                                Crear
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Card>

            <PreviewCalendar open={open} setOpen={setOpen} bussinesHours={formData?.businessHours} handleConfirmSubmit={handleConfirmSubmit} />

        </Box>
    );
};

export default NuevoProfesional;
