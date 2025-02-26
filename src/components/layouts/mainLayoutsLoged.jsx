import { Box } from "@mui/joy";
import TopNavLoged from "./topNavLoged.jsx";

const MainLayoutLoged = ({ children }) => {
    return (
        <Box>
            <TopNavLoged />
            <Box>
                {children}
            </Box>
        </Box>
    );
};

export default MainLayoutLoged;
