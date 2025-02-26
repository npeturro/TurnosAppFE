import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function AlertDeleteModal({ open, setOpen, selectedProfesional }) {
    return (

        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
                {selectedProfesional && (
                    <div>
                        <DialogTitle>
                            <WarningRoundedIcon />
                            Confirmación
                        </DialogTitle>
                        <Divider sx={{mt:1,mb:1}}/>
                        <DialogContent>
                            Estas seguro que deseas eliminar al usuario {selectedProfesional.profesional}?
                        </DialogContent>
                        <DialogActions>
                            <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
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