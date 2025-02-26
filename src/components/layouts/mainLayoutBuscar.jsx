import { Box } from "@mui/joy";
import TopNavBuscar from "./topNavBuscar.jsx";

const MainLayoutBuscar = ({ children }) => {
    return (
        <Box>
            <TopNavBuscar />
            <Box>
                {children}
            </Box>
        </Box>
    );
};

export default MainLayoutBuscar;
