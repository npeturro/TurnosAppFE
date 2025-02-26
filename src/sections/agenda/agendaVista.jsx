import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { Box, CircularProgress, Typography, Card } from "@mui/joy";
import EventModal from "../turnos/eventModal";
import DetallesModal from "./detallesModal";
import AlertDeleteModal from "../../components/modals/alertDeleteModal";
import AlertCancelModal from "../../components/modals/alertCancelTurno";

const AgendaVista = ({ turnos }) => {
    const [open, setOpen] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [calendarView, setCalendarView] = useState(
        window.innerWidth < 768 ? "timeGridDay" : "timeGridWeek"
    );

    useEffect(() => {
        const handleResize = () => {
            setCalendarView(window.innerWidth < 768 ? "timeGridDay" : "timeGridWeek");
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCancelar = () => {
        setOpenCancelar(true);
    };

    const handleEventClick = (clickInfo) => {
        setSelectedEvent({
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            date: clickInfo.event.start.toLocaleDateString("es-ES"),
            time: clickInfo.event.start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
            especialidad: clickInfo.event.extendedProps.especialidad,
            disponible: clickInfo.event.extendedProps.disponible,
            pacienteNombre: clickInfo.event.extendedProps.pacienteNombre,
            pacienteCorreo: clickInfo.event.extendedProps.pacienteCorreo,
        });
        setOpen(true);
    };

    if (!turnos) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
                <Typography marginLeft={2}>Cargando turnos...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Card sx={{ boxShadow: "lg" }}>
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    locale={esLocale}
                    events={turnos.map(turno => ({
                        id: turno.id,
                        title: turno.title,
                        start: turno.start,
                        end: turno.end,
                        especialidad: turno.especialidad,
                        disponible: turno.disponible,
                        pacienteNombre: turno.pacienteNombre,
                        pacienteCorreo: turno.pacienteCorreo,
                        backgroundColor: turno.color || "#3788d8",
                    }))}
                    weekends={false}
                    height="auto"
                    initialView={calendarView}
                    slotMinTime="08:00:00"
                    slotMaxTime="20:00:00"
                    slotLabelFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }}
                    headerToolbar={{ left: "prev,next today", center: "title", right: "timeGridWeek,timeGridDay" }}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                />
                <DetallesModal open={open} setOpen={setOpen} selectedEvent={selectedEvent} handleCancelar={handleCancelar}/>
                <AlertCancelModal open={openCancelar} setOpen={setOpenCancelar}/>
            </Card>
        </Box>
    );
};

function renderEventContent(eventInfo) {
    return (
        <div>
            {eventInfo.timeText} - {eventInfo.event.title}
        </div>
    );
}

export default AgendaVista;
