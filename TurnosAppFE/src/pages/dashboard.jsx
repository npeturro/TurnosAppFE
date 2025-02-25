import React from "react";
import { Box, CircularProgress, Typography } from "@mui/joy";
import { useGET } from "../hooks/useGET";
import DoughnutDashboard from "../sections/dashboard/doughnutDashboard";
import CardTotal from "../sections/dashboard/cardTotal";
import LoadingCard from "../components/loadingCard";
import ErrorCard from "../components/errorCard";

const Dashboard = () => {

    const [turnos, loading, error] = useGET(`turnos`);


    if (loading) {
        return (
            <LoadingCard />
        );
    }

    if (error) {
        return (
            <ErrorCard />
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
                p: 2,
                width: '100%',
            }}
        >
            <Box sx={{ flex: 2 }}>
                <DoughnutDashboard turnos={turnos} />
            </Box>
            <Box sx={{ flex: 1 }}>
                <CardTotal turnos={turnos} />
            </Box>
        </Box>
    );
};

export default Dashboard;
