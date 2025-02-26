import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import Stack from '@mui/joy/Stack';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function MapCard({ profesionales }) {
    return (
        <Card>
            <div>
                <Typography level="h3">{profesionales[0].clinica}</Typography>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
                <iframe
                    width="100%"
                    height="500px"
                    style={{ border: 0, borderRadius: "8px" }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13611.62691508886!2d-60.6797269!3d-32.96375585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab1aebf2e9d1%3A0x3aaf915b58c0154c!2sCrespo%204427%2C%20S2003JFA%20Rosario%2C%20Santa%20Fe%2C%20Argentina!5e0!3m2!1ses!2ses!4v1708710000000"
                ></iframe>
            </AspectRatio>
            <CardContent>
                <Typography level="body-sm" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnOutlinedIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                    Crespo 4427
                </Typography>
                <Typography level="body-sm" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalPhoneIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                    341 - 5478407
                </Typography>

                <Typography level="body-sm"><b>Profesionales</b></Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {profesionales.map((prof, index) => (
                        <Stack key={index} alignItems="center" spacing={0.5}>
                            <Avatar sx={{ width: 56, height: 56 }}>{prof.profesional[0]}</Avatar>
                            <Typography level="body-sm">{prof.profesional}</Typography>
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
        </Card >
    );
}
