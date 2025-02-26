import React from "react";
import { Modal, ModalDialog, Typography, Button, Box, Chip, IconButton } from "@mui/joy";
import { Close as CloseIcon } from "@mui/icons-material";

const DetallesModal = ({ open, setOpen, selectedEvent, handleCancelar, handleReservar }) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{ backdropFilter: "blur(2px)" }}>
            <ModalDialog sx={{ maxWidth: "500px", width: "90%", overflow: "auto", position: "relative" }}>
                {selectedEvent && (
                    <Box>
                        {/* Botón para cerrar el modal */}
                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{ position: "absolute", top: 8, right: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>



                        {/* Contenedor del título con el chip */}
                        <Box display="flex" alignItems="center" justifyContent={'center'} gap={1} mt={2} mb={2}>
                            <Chip color={selectedEvent.disponible ? "success" : "danger"} size="lg">
                                {selectedEvent.disponible ? "Disponible" : "Reservado"}
                            </Chip>
                            <Typography level="h4" textAlign="center">Detalles del turno</Typography>
                        </Box>
                        <Typography level="h5">{selectedEvent.title}</Typography>

                        <Typography level="body-sm">{selectedEvent.especialidad}</Typography>
                        <Typography level="body-md" sx={{ my: 1 }}>
                            <b>{selectedEvent.date}</b> - <b>{selectedEvent.time} hs.</b>
                        </Typography>

                        {/* Datos del paciente si el turno está reservado */}
                        {!selectedEvent.disponible && selectedEvent.pacienteNombre && (
                            <Box mt={2} p={2} sx={{ border: "1px solid #ccc", borderRadius: "8px", background: "#f9f9f9" }}>
                                <Typography level="body-md"><b>Paciente:</b> {selectedEvent.pacienteNombre}</Typography>
                                <Typography level="body-md"><b>Correo:</b> {selectedEvent.pacienteCorreo}</Typography>
                            </Box>
                        )}

                        {/* Botón para cancelar si el turno está reservado */}
                        {!selectedEvent.disponible ? (
                            <Box mt={2}>
                                <Button color="danger" fullWidth onClick={() => handleCancelar()}>
                                    Cancelar turno
                                </Button>
                            </Box>
                        ) : (
                            <Box mt={2}>
                                <Button color="success" fullWidth onClick={() => handleReservar()}>
                                    Reservar turno
                                </Button>
                            </Box>
                        )
                        }
                    </Box>
                )}
            </ModalDialog>
        </Modal>
    );
};

export default DetallesModal;
