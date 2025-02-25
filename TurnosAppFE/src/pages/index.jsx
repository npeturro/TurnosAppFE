import React from "react";
import ViewIndex from "../sections/index/viewIndex";
import { Box, CircularProgress, Typography } from "@mui/joy";
import MapCard from "../sections/index/mapCard";
import { useGET } from "../hooks/useGET";
import LoadingCard from "../components/loadingCard";
import ErrorCard from "../components/errorCard";

const Index = () => {

    const [profesionales, loading, error] = useGET(`profesionales`);

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
            <Box sx={{ flex: 1 }}>
                <MapCard profesionales={profesionales} />
            </Box>
            <Box sx={{ flex: 2 }}>
                <ViewIndex profesionales={profesionales} />
            </Box>
        </Box>


    );
};

export default Index;
