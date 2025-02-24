import { Box } from "@mui/joy";
import TopNavLoged from "./topNavLoged.jsx";

const MainLayoutLoged = ({ children }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflowX: "hidden" }}>
            <TopNavLoged />
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", flexGrow: 1, width: "100%", p: 2 }}>
                {children}
            </Box>
        </Box>
    );
};

export default MainLayoutLoged;
