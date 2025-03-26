import React from 'react';
import { Sheet, Typography, Card, CardContent, Avatar, Box, Divider } from '@mui/joy';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const daysMap = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
export default function BioCard({ profesional }) {
  return (
    <Sheet variant="soft" sx={{ borderRadius: 'md', p: 2, mb: 2, width: '100%' }}>
      <Card sx={{ width: '100%', boxShadow: 'lg' }}>
        <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Avatar sx={{ '--Avatar-size': '4rem' }}>{profesional.profesional[0]}</Avatar>
          <Typography level="h2">{profesional.profesional}</Typography>
          <Divider />
          <Typography level="body-sm">
            Soy un profesional comprometido con brindar atención de calidad, con años de experiencia en la medicina. Mi enfoque se basa en la empatía, la precisión y el uso de las mejores prácticas para garantizar el bienestar de mis pacientes.
          </Typography>
          <Typography level="body-sm" sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnOutlinedIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            Crespo 4427
          </Typography>
          <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
            <b>{profesional.clinica}</b>
          </Typography>
          <Typography level="title-sm" mb={1} sx={{ fontWeight: "bold" }}>
            Horarios de Atención:
          </Typography>
          <Box sx={{ maxHeight: "150px", overflowY: "auto" }}> 
            {/* Lo arme asi x si tiene horarios cortados  */}
            {Object.entries(
              profesional.businessHours.reduce((acc, schedule) => {
                const day = daysMap[schedule.daysOfWeek[0]];
                if (!acc[day]) acc[day] = [];
                acc[day].push(`${schedule.startTime} - ${schedule.endTime}`);
                return acc;
              }, {})
            ).map(([day, hours], index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography level="body-sm">
                  <b>{day}:</b> {hours.join(" | ")}
                </Typography>
              </Box>
            ))}
          </Box>

        </CardContent>
      </Card>
    </Sheet>
  );
}
