import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Autocomplete from '@mui/joy/Autocomplete';
import Chip from '@mui/joy/Chip';
import Close from '@mui/icons-material/Close';
import { Button, Card, CardContent, Typography, Stack, Grid, Box } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

export default function ViewIndex({ profesionales }) {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const especialidad = [
        { name: 'Cardiología', id: 'cardiologia' },
        { name: 'Dermatología', id: 'dermatologia' },
    ];

    const onSubmit = (data) => {
        navigate(`${data.doctor}/turnos`);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Card sx={{ mx: 'auto', boxShadow: 'md' }}>
                <CardContent>
                    <Typography level="h4" textAlign="center" fontWeight="bold" mb={2}>
                        Buscar turnos
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            {/* Grid para los campos uno al lado del otro */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="doctor"
                                        control={control}
                                        rules={{ required: "El campo doctor es obligatorio" }}
                                        render={({ field }) => (
                                            <Autocomplete
                                                {...field}
                                                placeholder="Selecciona un doctor"
                                                options={profesionales}
                                                sx={{ width: '100%' }}
                                                getOptionLabel={(option) => option.profesional}
                                                isOptionEqualToValue={(option, value) => option.id === value?.id}
                                                onChange={(_, newValue) => setValue('doctor', newValue?.id || '')}
                                                renderTags={(tags, getTagProps) =>
                                                    tags.map((item, index) => (
                                                        <Chip
                                                            key={index}
                                                            variant="soft"
                                                            color="primary"
                                                            endDecorator={<Close fontSize="sm" />}
                                                            {...getTagProps({ index })}
                                                        >
                                                            {item.profesional}
                                                        </Chip>
                                                    ))
                                                }
                                            />
                                        )}
                                    />
                                    {errors.doctor && <Typography color="error" fontSize="sm">{errors.doctor.message}</Typography>}
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="especialidad"
                                        control={control}
                                        rules={{ required: "El campo especialidad es obligatorio" }}
                                        render={({ field }) => (
                                            <Autocomplete
                                                {...field}
                                                placeholder="Selecciona una especialidad"
                                                options={especialidad}
                                                sx={{ width: '100%' }}
                                                getOptionLabel={(option) => option.name}
                                                isOptionEqualToValue={(option, value) => option.id === value?.id}
                                                onChange={(_, newValue) => setValue('especialidad', newValue?.id || '')}
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
                            </Grid>

                            <Button type="submit" variant="solid" color="primary" size="lg" fullWidth>
                                Buscar
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
