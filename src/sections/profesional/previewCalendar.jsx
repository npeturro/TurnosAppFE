import React from "react";
import { Modal, ModalDialog, Typography, Box, Button } from "@mui/joy";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";

const PreviewCalendar = ({ open, setOpen, bussinesHours, handleConfirmSubmit }) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{ backdropFilter: "blur(2px)" }}>
            <ModalDialog sx={{ maxWidth: "800px", width: "90%", overflow: "auto", position: "relative" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2, alignItems: "center" }}>
                    <Typography level="h4">Viste previa de los horarios de trabajo</Typography>
                    <Button onClick={handleConfirmSubmit} color="success">
                        Aceptar
                    </Button>
                </Box>
                {
                    bussinesHours && (


                        <FullCalendar
                            plugins={[timeGridPlugin]}
                            locale={esLocale}
                            initialView="timeGridWeek"
                            allDaySlot={false}
                            slotMinTime="07:00:00"
                            slotMaxTime="22:00:00"
                            events={bussinesHours.map(horario => ({
                                daysOfWeek: horario.daysOfWeek,
                                startTime: horario.startTime,
                                endTime: horario.endTime,
                                title: "Disponible",
                                backgroundColor: "#28a745", // Verde para indicar disponibilidad
                                display: "block"
                            }))}
                            headerToolbar={false}
                            dayHeaderFormat={{ weekday: "long" }}
                        />
                    )
                }
            </ModalDialog>
        </Modal>
    );
};

export default PreviewCalendar;