import React from "react";
import { Box } from "@mui/joy";
import DashboardItem from "../sections/dashboard/dashboardItem";

const Dashboard = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                width: '100%',
                minHeight: '100vh',
                p:2
            }}
        >
            <Box sx={{ width: '100%' }}>
                <DashboardItem />
            </Box>
        </Box>
    );
};

export default Dashboard;
