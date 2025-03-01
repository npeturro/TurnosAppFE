import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Button, IconButton } from '@mui/joy';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { startOfWeek, addDays, format, addWeeks, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTheme } from '@mui/joy';
import useMediaQuery from '@mui/material/useMediaQuery';
import EventModal from './eventModal';
import themeColors from '../../../public/theme/themeColors';

export default function SelecTurnos({ turnos }) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const eventos = (turnos);
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })); // Lunes como inicio de semana
    const [selectedDay, setSelectedDay] = useState(null);
    const [days, setDays] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        generateWeekDays(currentWeek);
    }, [currentWeek]);

    function generateWeekDays(startDate) {
        let generatedDays = [];
        for (let i = 0; i < 5; i++) {
            const date = addDays(startDate, i);
            const dateString = format(date, 'yyyy-MM-dd');
            const filteredEvents = eventos
                .filter(event => event.start.startsWith(dateString) && event.disponible)
                .map(event => event.start.split(" ")[1]);

            generatedDays.push({
                day: format(date, 'EEEE', { locale: es }),
                date: format(date, 'd'),
                fullDate: dateString,
                isToday: isToday(date),
                options: filteredEvents,
            });
        }

        setDays(generatedDays);
        setSelectedDay(generatedDays.find(day => day.isToday) || generatedDays[0]);
    }

    const changeWeek = (step) => {
        setCurrentWeek(addWeeks(currentWeek, step));
    };

    const handleEventClick = (clickInfo) => {
        const startDate = new Date(clickInfo.start); // Convertir a Date

        setSelectedEvent({
            id: clickInfo.id,
            title: clickInfo.title,
            date: startDate.toLocaleDateString("es-ES"),
            time: startDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
            especialidad: clickInfo.especialidad
        });
        setOpen(true);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography level="title-lg" textAlign={'center'} fontSize={'37px'}>Reserva tu turno</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <IconButton onClick={() => changeWeek(-1)}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Typography level={'body-lg'}>
                    Semana del {format(currentWeek, 'd MMMM Y', { locale: es })}
                </Typography>
                <IconButton onClick={() => changeWeek(1)}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Card sx={{ width: '100%', boxShadow: 'lg' }}>
                <Box display="flex" gap={1} pb={1} justifyContent="space-between">
                    {days.map((day) => (
                        <Card
                            key={day.fullDate}
                            variant={selectedDay?.fullDate === day.fullDate ? 'solid' : 'outlined'}
                            sx={{
                                flex: 1,
                                boxShadow: 'lg',
                                cursor: 'pointer',
                                textAlign: 'center',
                                p: 1,
                                height: '140px',
                                borderRadius: 'md',
                                bgcolor: selectedDay?.fullDate === day.fullDate ? `${themeColors.select}` : 'transparent',
                                color: selectedDay?.fullDate === day.fullDate ? '#fff' : 'inherit',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 'xl',
                                }
                            }}
                            onClick={() => setSelectedDay(day)}
                        >
                            <Typography level={isMobile ? 'body-xs' : 'body-lg'} color={'white'} textTransform="uppercase">
                                {isMobile ? day.day.slice(0, 4) + '.' : day.day}
                            </Typography>
                            <Typography level="h1" color='white'>{day.date}</Typography>
                            {(day.options.length > 0 && isMobile) && (
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        bgcolor: 'success.500'
                                    }}
                                />
                            )}

                            {!isMobile && (
                                <Typography level="body-xs" color="white">
                                    {day.options.length > 0 ? 'Disponible' : 'No disponible'}
                                </Typography>
                            )}
                        </Card>
                    ))}
                </Box>



                <Box mt={2}>
                    {selectedDay?.options.map((option) => (
                        <Button
                            key={option}
                            color="success"
                            sx={{
                                m: 0.5,
                                minWidth: '80px',
                                bgcolor: themeColors.select,
                                color: '#fff',
                                '&:hover': { bgcolor: themeColors.selectHover }
                            }}
                            onClick={() => {
                                const evento = eventos.find(event =>
                                    event.start === `${selectedDay.fullDate} ${option}` && event.disponible
                                );
                                if (evento) {
                                    handleEventClick(evento);
                                }
                            }}
                        >
                            {option.slice(0, -3)}
                        </Button>
                    ))}
                </Box>
            </Card>
            <EventModal open={open} setOpen={setOpen} selectedEvent={selectedEvent} />
        </Box>

    );
}
