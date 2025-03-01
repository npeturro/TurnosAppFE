import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Autocomplete from '@mui/joy/Autocomplete';
import Chip from '@mui/joy/Chip';
import Close from '@mui/icons-material/Close';
import { Button, Card, CardContent, Typography, Stack, Grid, Box, List, ListItem, Avatar, Divider } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import ProfAvailable from './profAvailable';

export default function ViewIndex({ profesionales }) {
    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const especialidades = [
        { name: 'Cardiología', id: 'cardiologia' },
        { name: 'Dermatología', id: 'dermatologia' },
        { name: 'Neurología', id: 'neurologia' },
        { name: 'Clínica infantil', id: 'pediatria' },
        { name: 'Ortopedia avanzada', id: 'traumatologia' },
    ];

    const [mostrarProfesionales, setMostrarProfesionales] = React.useState(false);

    const selectedEspecialidad = watch('especialidad', null);

    const filteredProfesionales = selectedEspecialidad
        ? profesionales.filter(prof => prof.especialidad.toLowerCase() === selectedEspecialidad)
        : [];
    const onSubmit = (data) => {
        if (data.doctor) {
            navigate(`${data.doctor}/turnos`);
        } else {
            setMostrarProfesionales(true);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Card sx={{ mx: 'auto', boxShadow: 'md', p: 2 }}>
                <CardContent>
                    <Typography level="h4" textAlign="center" fontWeight="bold" mb={2}>
                        Buscar turnos
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid xs={8}>
                                    <Controller
                                        name="especialidad"
                                        control={control}
                                        defaultValue={null}
                                        rules={{ required: "El campo especialidad es obligatorio" }}
                                        render={({ field }) => (
                                            <Autocomplete
                                                {...field}
                                                value={especialidades.find(e => e.id === field.value) || null}
                                                placeholder="Selecciona una especialidad"
                                                options={especialidades}
                                                sx={{ width: '100%' }}
                                                getOptionLabel={(option) => option.name}
                                                isOptionEqualToValue={(option, value) => option.id === value?.id}
                                                onChange={(_, newValue) => {
                                                    field.onChange(newValue?.id || null);
                                                    setMostrarProfesionales(false);
                                                }}
                                                renderTags={(tags, getTagProps) =>
                                                    tags.map((item, index) => (
                                                        <Chip
                                                            key={index}
                                                            variant="soft"
                                                            color="primary"
                                                            endDecorator={<Close fontSize="sm" />}
                                                            {...getTagProps({ index })}
                                                        >
                                                            {item.name}
                                                        </Chip>
                                                    ))
                                                }
                                            />
                                        )}
                                    />
                                    {errors.especialidad && <Typography color="error" fontSize="sm">{errors.especialidad.message}</Typography>}
                                </Grid>

                                <Grid xs={4}>
                                    <Button type="submit" variant="solid" color="primary" fullWidth>
                                        Buscar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </form>
                </CardContent>
            </Card>

            {/* listado de prof */}
            {mostrarProfesionales && selectedEspecialidad && (
                <ProfAvailable filteredProfesionales={filteredProfesionales} handleSubmit={handleSubmit} onSubmit={onSubmit} />
            )}
        </Box>
    );
}




