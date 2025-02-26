import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { Box, CircularProgress, Typography } from "@mui/joy";
import EventModal from "./eventModal";

export function Calendar({ turnos, businessHours }) {
    const [open, setOpen] = useState(false);
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

    const handleEventClick = (clickInfo) => {
        setSelectedEvent({
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            date: clickInfo.event.start.toLocaleDateString("es-ES"),
            time: clickInfo.event.start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
            especialidad: clickInfo.event.extendedProps.especialidad
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
        <div style={{ width: "100%", height: "100%", paddingBottom: "15px" }}>
            <FullCalendar
                plugins={[timeGridPlugin]}
                locale={esLocale}
                events={turnos.map(turno => ({
                    id: turno.id,
                    title: turno.title,
                    start: turno.start,
                    end: turno.end,
                    especialidad: turno.especialidad
                }))}
                weekends={false}
                height="auto"
                initialView={calendarView}
                slotMinTime="08:00:00"
                slotMaxTime="20:00:00"
                slotLabelFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }}
                headerToolbar={{ left: "prev,next today", center: "title", right: "timeGridWeek,timeGridDay" }}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                businessHours={businessHours}
            />
            <EventModal open={open} setOpen={setOpen} selectedEvent={selectedEvent} />
        </div>
    );
}

function renderEventContent(eventInfo) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100%",
                fontSize: "0.65rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                padding: "2px",
            }}
        >
            {eventInfo.timeText} - {eventInfo.event.title}
        </div>
    );
}
