import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import { Modal, ModalDialog, Typography, Button } from "@mui/joy";
import EventModal from "./eventModal";

export function Calendar() {
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const events = [
        { title: "Evento", start: "2025-02-22 08:00", end: "2025-02-22 09:00" },
        { title: "Evento", start: "2025-02-22 10:00", end: "2025-02-22 10:30" },
        { title: "Evento", start: "2025-02-23 09:00", end: "2025-02-23 10:00" },
        { title: "Evento", start: "2025-02-23 11:00", end: "2025-02-23 11:30" },
        { title: "Evento", start: "2025-02-24 14:00", end: "2025-02-24 15:00" },
        { title: "Evento", start: "2025-02-24 16:00", end: "2025-02-24 17:30" },
        { title: "Evento", start: "2025-02-25 08:30", end: "2025-02-25 09:30" },
        { title: "Evento", start: "2025-02-25 10:30", end: "2025-02-25 11:00" },
        { title: "Evento", start: "2025-02-26 13:00", end: "2025-02-26 14:30" },
        { title: "Evento", start: "2025-02-26 17:00", end: "2025-02-26 18:00" }
    ];

    const handleEventClick = (clickInfo) => {
        setSelectedEvent({
            title: clickInfo.event.title,
            date: clickInfo.event.start.toLocaleDateString("es-ES"),
            time: clickInfo.event.start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
        });
        setOpen(true);
    };

    return (
        <div style={{ width: "100%", height: "100%", paddingBottom: '15px'}}>
            <FullCalendar
                plugins={[timeGridPlugin]}
                locale={esLocale}
                events={events}
                weekends={false}
                height="auto"
                initialView="timeGridWeek"
                slotMinTime="08:00:00"
                slotMaxTime="18:00:00"
                slotLabelFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }}                
                headerToolbar={{ left: "prev,next today", center: "title", right: "timeGridWeek,timeGridDay" }}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                businessHours={{
                    // Configura las horas laborales (business hours)
                    daysOfWeek: [1, 2, 4, 5], // Lunes a Viernes
                    startTime: "08:00", // Hora de inicio
                    endTime: "18:00" // Hora de fin
                }}
            />
            <EventModal open={open} setOpen={setOpen} selectedEvent={selectedEvent} />
        </div>
    );
}

function renderEventContent(eventInfo) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            fontSize: "0.75rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        }}>
            {eventInfo.timeText} - {eventInfo.event.title}
        </div>
    );
}
