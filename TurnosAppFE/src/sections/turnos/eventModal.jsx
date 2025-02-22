import React from "react";
import { Modal, ModalDialog, Typography, Button } from "@mui/joy";

function EventModal({ open, setOpen, selectedEvent }) {
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{ backdropFilter: "blur(2px)" }}>
            <ModalDialog>
                <Typography level="h4">Detalles del Evento</Typography>
                {selectedEvent && (
                    <>
                        <Typography><strong>Evento:</strong> {selectedEvent.title}</Typography>
                        <Typography><strong>Fecha:</strong> {selectedEvent.date}</Typography>
                        <Typography><strong>Hora:</strong> {selectedEvent.time}</Typography>
                    </>
                )}
                <Button onClick={() => setOpen(false)}>Cerrar</Button>
            </ModalDialog>
        </Modal>
    );
}

export default EventModal;
