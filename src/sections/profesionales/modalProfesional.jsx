import React from "react";
import {
    Modal, ModalDialog, Typography, Button, Box, Chip, IconButton, Stack, Divider
} from "@mui/joy";
import { Close as CloseIcon } from "@mui/icons-material";
import DeleteForever from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';

const daysMap = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const ModalProfesional = ({ open, setOpen, handleDelete, handleDesHab, selectedProfesional }) => {


    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{ backdropFilter: "blur(4px)" }}>
            <ModalDialog
                sx={{
                    maxWidth: "500px",
                    width: "90%",
                    borderRadius: "md",
                    overflowY: "auto",
                    position: "relative",
                    p: 3
                }}
            >
                {selectedProfesional && (
                    <Box>
                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{ position: "absolute", top: 8, right: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography level="h4" textAlign="center" mb={2} sx={{ fontWeight: "bold" }}>
                            {selectedProfesional.profesional}
                        </Typography>

                        {/* Estado (Activo/Inactivo) */}
                        <Box mb={2} textAlign="center">
                            <Chip
                                variant="solid"
                                color={selectedProfesional.activo ? "success" : "danger"}
                                size="lg"
                            >
                                {selectedProfesional.activo ? "Activo" : "Inactivo"}
                            </Chip>
                        </Box>

                        {/* VER DSP si es establecimiento y profesion quizas */}
                        <Stack spacing={1} mb={2}>
                            <Typography level="body-sm">
                                <b>Especialidad:</b> {selectedProfesional.especialidad}
                            </Typography>
                            <Typography level="body-sm">
                                <b>Clínica:</b> {selectedProfesional.clinica}
                            </Typography>
                        </Stack>

                        {/* Horarios de at */}
                        <Typography level="title-sm" mb={1} sx={{ fontWeight: "bold" }}>
                            Horarios de Atención:
                        </Typography>
                        <Box sx={{ maxHeight: "150px", overflowY: "auto" }}>
                            {Object.entries(
                                selectedProfesional.businessHours.reduce((acc, schedule) => {
                                    const day = daysMap[schedule.daysOfWeek[0]];
                                    if (!acc[day]) acc[day] = [];
                                    acc[day].push(`${schedule.startTime} - ${schedule.endTime}`);
                                    return acc;
                                }, {})
                            ).map(([day, hours], index, array) => (
                                <Box key={index} sx={{ mb: 1 }}>
                                    <Typography level="body-sm">
                                        <b>{day}:</b> {hours.join(" | ")}
                                    </Typography>
                                    {index !== array.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Box>


                        {/* Botón de eliminar */}
                        <Box mt={3}>
                            {selectedProfesional.activo ?
                                <Button
                                    variant='soft'
                                    fullWidth
                                    color='primary'
                                    onClick={() => handleDesHab(false)}
                                    startDecorator={<BlockIcon />}
                                    sx={{ mb: 2 }}>
                                    Deshabilitar
                                </Button>

                                :

                                <Button
                                    variant='soft'
                                    fullWidth
                                    color='primary'
                                    startDecorator={<CheckIcon />}
                                    onClick={() => handleDesHab(true)}
                                    sx={{ mb: 2 }}>

                                    Habilitar
                                </Button>

                            }


                            <Button
                                variant="outlined"
                                fullWidth
                                color="danger"
                                startDecorator={<DeleteForever />}
                                onClick={() => handleDelete()}
                            >
                                Eliminar
                            </Button>
                        </Box>
                    </Box>
                )}
            </ModalDialog>
        </Modal>
    );
};

export default ModalProfesional;
