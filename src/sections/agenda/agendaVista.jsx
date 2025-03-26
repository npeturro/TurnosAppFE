import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { Box, CircularProgress, Typography, Card, Button, Input } from "@mui/joy";
import EventModal from "../turnos/eventModal";
import DetallesModal from "./detallesModal";
import AlertCancelModal from "../../components/modals/alertCancelTurno";
import { toast } from "sonner";
import LoadingCard from "../../components/loadingCard";
import ConfirmModal from "../turnos/confirmModal";

const AgendaVista = ({ turnos, actualizarTurnos }) => {
    const [open, setOpen] = useState(false);
    const [openCancelar, setOpenCancelar] = useState(false);
    const [openReservar, setOpenReservar] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [calendarView, setCalendarView] = useState(window.innerWidth < 768 ? "timeGridDay" : "timeGridWeek");
    const [loadingBloqueo, setLoadingBloqueo] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Estado para la fecha
    const [openConfirm, setOpenConfirm] = useState(false);

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

    const handleReservar = () => {
        setOpenReservar(true);
        setOpen(false);
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

    const handleBloquearDia = async () => {
        setLoadingBloqueo(true);

        const turnosBloqueados = turnos.map(turno =>
            turno.start.split(" ")[0] === selectedDate
                ? { ...turno, disponible: false }
                : turno
        );

        try {
            toast.success(`Todos los turnos del ${selectedDate} han sido cancelados.`);
        } catch (error) {
            toast.error("Error al bloquear los turnos.");
        } finally {
            setLoadingBloqueo(false);
        }
    };

    if (!turnos) {
        return (
            <LoadingCard />
        );
    }

    return (
        <Box>
            <Card sx={{ boxShadow: "lg", padding: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2, alignItems: "center" }}>
                    <Typography level="h4">Agenda</Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        <Button onClick={handleBloquearDia} loading={loadingBloqueo} color="danger">
                            Cancelar día
                        </Button>
                    </Box>
                </Box>
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
                        backgroundColor: turno.disponible ? "#3788d8" : "#d32f2f",
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
                    eventClick={handleEventClick}
                />
                <DetallesModal open={open} setOpen={setOpen} selectedEvent={selectedEvent} handleCancelar={handleCancelar} handleReservar={handleReservar} />
                <AlertCancelModal open={openCancelar} setOpen={setOpenCancelar} />
                <ConfirmModal open={openConfirm} setOpen={setOpenConfirm} />
                <EventModal open={openReservar} setOpen={setOpenReservar} setOpenDetalles={setOpen} openConfirm={openConfirm} setOpenConfirm={setOpenConfirm} selectedEvent={selectedEvent} />
            </Card>
        </Box>
    );
};

export default AgendaVista;
