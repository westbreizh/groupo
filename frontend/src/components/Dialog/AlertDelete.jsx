import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDelete(props) {
  const openAlert = props.openAlert
  const setOpenAlert = props.setOpenAlert
  const setSupr = props.setSupr
  
  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
    <div>

      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Archtung !!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Souhaitez vous vraiment supprimer la publication ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>

          <Button onClick={() => {setOpenAlert(false); setSupr(true)}} autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}