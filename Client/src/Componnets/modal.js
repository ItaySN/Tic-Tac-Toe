import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function WriteRecord(props) {
  const [open, setOpen] = React.useState(false);
  const [name,setName] = useState();
  

  const handleClickOpen = () => {
    debugger;
    setOpen(true);
  };

  const handleClose = () => {


  }

  const handleClose = () => {
    props.setWinner(false);
    setOpen(false);
  };

  useEffect(()=>{
    if(props.isWinner){
      setOpen(true);
    }
  },)

  return (
    
    <div>
       {props.isWinner && (
        
      <Dialog open = {open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Write Your Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To get into our records , you need to write your name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="userName"
            type="text"
            fullWidth
            onChange={(e) => {setName(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
       )}
    </div> 
  );
}
