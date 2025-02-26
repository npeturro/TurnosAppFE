import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function AlertCancelModal({ open, setOpen }) {
    return (

        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    <WarningRoundedIcon />
                    Confirmación
                </DialogTitle>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <DialogContent>
                    Estas seguro que deseas cancelar el turno?
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
                        Confirmar
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>

    );
}