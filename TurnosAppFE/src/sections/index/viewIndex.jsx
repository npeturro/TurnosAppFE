import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Autocomplete from '@mui/joy/Autocomplete';
import Chip from '@mui/joy/Chip';
import Close from '@mui/icons-material/Close';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';


export default function ViewIndex() {
    const { control, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();

    const doctors = [
        { name: 'Nicolas Peturro', id: 'nicolas-peturro' },
        { name: 'Lionel Messi', id: 'lionel-messi' },
    ];

    const social = [
        { name: 'IAPOS', id: 'iapos' },
        { name: 'MUTUALYF', id: 'mutualyf' },
    ];

    // Función de búsqueda, solo muestra los valores seleccionados
    const onSubmit = (data) => {
        navigate(`${data.doctor}/turnos`)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller
                    name="doctor"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            placeholder="Doctor"
                            options={doctors}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                            onChange={(_, newValue) => setValue('doctor', newValue.id)}
                            renderTags={(tags, getTagProps) =>
                                tags.map((item, index) => (
                                    <Chip
                                        variant="solid"
                                        color="primary"
                                        endDecorator={<Close fontSize="sm" />}
                                        sx={{ width: 100 }}
                                        {...getTagProps({ index })}
                                    >
                                        {item.name}
                                    </Chip>
                                ))
                            }
                        />
                    )}
                />
            </div>

            <div>
                <Controller
                    name="social"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            placeholder="Obra social"
                            options={social}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                            onChange={(_, newValue) => setValue('social', newValue.id)}
                            renderTags={(tags, getTagProps) =>
                                tags.map((item, index) => (
                                    <Chip
                                        variant="solid"
                                        color="primary"
                                        endDecorator={<Close fontSize="sm" />}
                                        sx={{ width: 100 }}
                                        {...getTagProps({ index })}
                                    >
                                        {item.name}
                                    </Chip>
                                ))
                            }
                        />
                    )}
                />
            </div>

            <Button type="submit" variant="solid" color="primary">Buscar</Button>
        </form>
    );
}
