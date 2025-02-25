import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Table, Sheet, Typography, Box, Card, Chip, IconButton } from "@mui/joy";
import ModalProfesional from "./modalProfesional";
import AlertDeleteModal from "../../components/modals/alertDeleteModal";
import AlertDesHabModal from "../../components/modals/alertDesHabModal";

const ProfesionalesVista = ({ profesionales }) => {

    const [open, setOpen] = React.useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
    const [openDesHabConfirm, setOpenDesHabConfirm] = React.useState(false);
    const [bool, setBool] = React.useState(false);
    const [selectedProfesional, setSelectedProfesional] = React.useState(null);
    const handleEventClick = (data) => {
        setSelectedProfesional(data)
        setOpen(true);
    };

    const handleDelete = () => {
        setOpenDeleteConfirm(true);
    };

    const handleDesHab = (estado) => {
        setBool(estado);
        setOpenDesHabConfirm(true);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, px: 2 }}>


            <Sheet
                variant="outlined"
                sx={{
                    borderRadius: "md",
                    overflow: "hidden",
                    overflowX: "auto",
                }}
            >
                <Table variant="soft" borderAxis="bothBetween" stickyHeader>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left", padding: "12px" }}>Nombre</th>
                            <th style={{ textAlign: "center", padding: "12px" }}>Estado</th>
                            <th style={{ textAlign: "center", padding: "12px" }}>Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profesionales.map((profesional) => (
                            <tr key={profesional.id}>
                                <td style={{ padding: "12px", fontWeight: 500 }}>
                                    {profesional.profesional}
                                </td>
                                <td style={{ textAlign: "center", padding: "12px" }}>
                                    <Chip
                                        variant="soft"
                                        color={profesional.activo ? "success" : "neutral"}
                                        size="md"
                                    >
                                        {profesional.activo ? "Activo" : "Inactivo"}
                                    </Chip>
                                </td>
                                <td style={{ textAlign: "center", padding: "12px" }}>
                                    <IconButton
                                        variant="soft"
                                        color="neutral"
                                        size="sm"
                                        onClick={() => handleEventClick(profesional)}
                                        sx={{
                                            transition: "0.3s",
                                            "&:hover": {
                                                transform: "scale(1.1)",
                                                color: "primary.solidBg",
                                            },
                                        }}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
            <ModalProfesional open={open} setOpen={setOpen} handleDelete={handleDelete} handleDesHab={handleDesHab} selectedProfesional={selectedProfesional} />
            <AlertDeleteModal open={openDeleteConfirm} setOpen={setOpenDeleteConfirm} selectedProfesional={selectedProfesional} />
            <AlertDesHabModal open={openDesHabConfirm} setOpen={setOpenDesHabConfirm} selectedProfesional={selectedProfesional} bool={bool} />
        </Box>
    );
};

export default ProfesionalesVista;
