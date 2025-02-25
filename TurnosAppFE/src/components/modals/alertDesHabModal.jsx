import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function AlertDesHabModal({ open, setOpen, selectedProfesional, bool }) {
    return (

        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
                {selectedProfesional && (
                    <div>
                        <DialogTitle>
                            <WarningRoundedIcon />
                            Confimación
                        </DialogTitle>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <DialogContent>
                            Estas seguro que deseas {bool ? 'habilitar' : 'deshabilitar'} al usuario {selectedProfesional.profesional}?
                        </DialogContent>
                        <DialogActions>
                            <Button variant="solid" color="primary" onClick={() => setOpen(false)}>
                                Confirmar
                            </Button>
                            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                        </DialogActions>
                    </div>
                )}
            </ModalDialog>
        </Modal>

    );
}