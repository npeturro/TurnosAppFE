import React from "react";
import { Box, Card, Typography } from "@mui/joy";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function DoughnutDashboard({ turnos }) {
    // Agrupar los turnos por color y contar la cantidad por cada profesionalId
    const turnosPorColor = turnos.reduce((acc, turno) => {
        const key = `${turno.color}-${turno.profesionalId}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const colores = Object.keys(turnosPorColor);
    const cantidades = Object.values(turnosPorColor);
    const etiquetas = colores.map((color) => {
        const [hex, profesionalId] = color.split("-");
        return `Profesional ${profesionalId}`;
    });

    const data = {
        labels: etiquetas,
        datasets: [
            {
                data: cantidades,
                backgroundColor: colores.map((color) => color.split("-")[0]),
                borderColor: "#fff",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    return (
        <Box>
            <Card sx={{ boxShadow: "lg", padding: 2 }}>
                <Typography level="title-lg" textAlign={'center'}>Total de turnos realizados por profesional</Typography>
                <div style={{ width: "100%", height: "100%" }}>
                    <Doughnut data={data} options={options} />
                </div>
            </Card>
        </Box>
    );
}
