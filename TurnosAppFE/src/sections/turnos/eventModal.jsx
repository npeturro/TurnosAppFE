import React from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalDialog, Typography, Button, Input, Select, Option, Box } from "@mui/joy";

const EventModal = ({ open, setOpen, selectedEvent }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
        reset(); // Limpiar formulario después de enviar
        setOpen(false); // Cierra el modal
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
                            Dirección: Calle 1234 (Rosario)
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
                                    <Button type="submit" sx={{ minWidth: "120px" }}>Reservar</Button>
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
