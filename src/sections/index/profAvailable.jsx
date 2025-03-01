import * as React from 'react';
import { Typography, Card, List, ListItem, Box, Avatar, Divider, Input } from '@mui/joy';
import themeColors from '../../../public/theme/themeColors';

export default function ProfAvailable({ filteredProfesionales, handleSubmit, onSubmit }) {
    const [search, setSearch] = React.useState('');

    const filteredList = filteredProfesionales.filter(prof =>
        prof.profesional.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Card sx={{ mt: 2, boxShadow: 'md', p: 2 }}>
            <Typography level="h5" textAlign="center" fontWeight="bold" mb={2}>
                Profesionales disponibles
            </Typography>
            <Input
                placeholder="Buscar profesional..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 2 }}
            />

            <List>
                {filteredList.length > 0 ? (
                    filteredList.map((prof, index) => (
                        <Box key={prof.id}>
                            <ListItem
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    cursor: 'pointer',
                                    p: 2,
                                    borderRadius: '8px',
                                    transition: 'background 0.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: themeColors.neutral,
                                    },
                                }}
                                onClick={() => handleSubmit(() => onSubmit({ doctor: prof.id }))()}
                            >
                                <Avatar sx={{ width: 56, height: 56 }}>{prof.profesional[0]}</Avatar>
                                <Box>
                                    <Typography fontWeight="bold">{prof.profesional}</Typography>
                                    <Typography level="body2" color="text.secondary">{prof.especialidad}</Typography>
                                </Box>
                            </ListItem>

                            {index < filteredList.length - 1 && <Divider />}
                        </Box>
                    ))
                ) : (
                    <Typography textAlign="center">No hay profesionales disponibles con esta descripción.</Typography>
                )}
            </List>
        </Card>
    );
}
