import { Box } from "@mui/joy";

const MainLayout = ({ children }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", height: "100vh", p: 2 }}>
            {children}
        </Box>
    );
};

export default MainLayout;
