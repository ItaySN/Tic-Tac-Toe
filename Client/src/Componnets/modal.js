import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function WriteRecord(props) {
  
  const [Name,setName] = useState();
  

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setWinner(false);
    props.setOpen(false);
    props.newGame();
  };

  useEffect(()=>{
    if(props.isWinner){
      props.setOpen(true);
    }
  },[props.isWinner])

  return (
    
    <div>
       {props.isWinner && (
        
      <Dialog open = {props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
          <Button onClick = {() => props.handleCloseWinner(Name)} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
       )}
    </div> 
  );
}
