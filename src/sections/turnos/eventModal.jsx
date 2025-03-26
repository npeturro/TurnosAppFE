import React from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalDialog, Typography, Button, Input, CircularProgress, Option, Box } from "@mui/joy";
import { toast } from "sonner";
import axios from "axios";
import ConfirmModal from "./confirmModal";

const EventModal = ({ open, setOpen, openConfirm, setOpenConfirm, setOpenDetalles, selectedEvent }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        if (!selectedEvent?.id) {
            toast.error("No se encontró el ID del turno.");
            return;
        }

        setLoading(true);

        try {
            // const response = await axios.put(
            //     `https://67ba591efbe0387ca1372908.mockapi.io/turnos/turnos`,
            //     {
            //         id: selectedEvent.id,
            //         disponible: false,
            //         pacienteNombre: data.nombre,
            //         pacienteCorreo: data.email,
            //         pacienteDni: data.dni,
            //         pacienteNac: data.nacimiento,
            //         pacienteObs: data.observaciones
            //     },
            //     {
            //         headers: {
            //             "Content-Type": "application/json"
            //         }
            //     }
            // );

            // console.log("Datos actualizados:", response.data);
            // toast.success("Turno reservado con éxito!");
            setOpenConfirm(true)
            reset();
            setOpen(false); 
        } catch (error) {
            if (error.response) {
                // Respuesta con error del servidor (4xx, 5xx)
                console.error("Error del servidor:", error.response.data);
                toast.error(`Error: ${error.response.data.message || "No se pudo reservar el turno."}`);
            } else if (error.request) {
                // No hubo respuesta del servidor
                console.error("No se recibió respuesta del servidor.");
                toast.error("No se pudo conectar con el servidor.");
            } else {
                // Otro tipo de error
                console.error("Error desconocido:", error.message);
                toast.error("Ocurrió un error inesperado.");
            }
        } finally {
            setLoading(false);
        }
    };



    const handleClose = () => {
        reset(); // Limpiar formulario al cerrar
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)} sx={{ backdropFilter: "blur(2px)" }}>
            <ModalDialog sx={{ maxWidth: "500px", width: "90%", overflow: 'auto' }}>
                <Typography level="h4" textAlign="center">Reserva tu turno</Typography>

                {selectedEvent && (
                    <Box>
                        <Typography textAlign="center">
                            Usted está reservando un turno para el día <b>{selectedEvent.date}</b> a las <b>{selectedEvent.time} hs.</b>
                        </Typography>
                        <Typography textAlign="center">
                            Dirección: {selectedEvent.title}
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    <Input
                                        fullWidth
                                        placeholder="Nombre y apellido"
                                        {...register("nombre", { required: "El nombre y apellido es obligatorio" })}
                                    />
                                    {errors.nombre && <Typography color="danger">{errors.nombre.message}</Typography>}

                                    <Input
                                        fullWidth
                                        placeholder="Email"
                                        type="email"
                                        {...register("email", { required: "El email es obligatorio" })}
                                    />
                                    {errors.email && <Typography color="danger">{errors.email.message}</Typography>}

                                    <Input
                                        fullWidth
                                        placeholder="N° de documento"
                                        type="number"
                                        {...register("documento", { required: "El documento es obligatorio" })}
                                    />
                                    {errors.documento && <Typography color="danger">{errors.documento.message}</Typography>}

                                    <Input
                                        fullWidth
                                        type="number"
                                        placeholder="Celular"
                                        {...register("celular", { required: "El celular es obligatorio" })}
                                    />
                                    {errors.celular && <Typography color="danger">{errors.celular.message}</Typography>}
                                </Box>


                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    <Input
                                        fullWidth
                                        placeholder="Fecha de nacimiento"
                                        type="date"
                                        {...register("nacimiento", { required: "La fecha de naciemiento es obligatorio" })} />
                                </Box>
                                {errors.nacimiento && <Typography color="danger">{errors.nacimiento.message}</Typography>}
                                {/* quizas dsp se utiliza
                                <Input
                                    fullWidth
                                    placeholder="N° de Afiliado"
                                    {...register("afiliado", { required: "El número de afiliado es obligatorio" })}
                                />
                                {errors.afiliado && <Typography color="danger">{errors.afiliado.message}</Typography>}
                                */}

                                <Input
                                    fullWidth
                                    placeholder="Observaciones"
                                    {...register("observaciones")}
                                />

                                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
                                    <Button onClick={() => handleClose()} variant="outlined" sx={{ minWidth: "120px" }}>Cerrar</Button>
                                    <Button
                                        type="submit"
                                        sx={{ minWidth: "120px" }}
                                    >
                                        Reservar
                                    </Button>

                                </Box>
                            </Box>
                        </form>
                    </Box>
                )}
            </ModalDialog>
        </Modal>
    );
};

export default EventModal;
