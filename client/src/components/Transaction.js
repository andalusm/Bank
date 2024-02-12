import React, { Fragment } from 'react'
import { Grid, Button } from '@mui/material';
import Item from './Item';
import axios from 'axios';
import { StyledTableCell, StyledTableRow } from './Table';
import { useState } from 'react';
import { useSnackbar } from 'notistack';


export default function Transaction({ transaction, update, changeBalance }) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickVariant = function(text, typeMessage) {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(text ,  { variant: typeMessage } );
  };


  const handleClick = () => {
    setOpen(true)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  function deleteTransaction(transactionID) {
    axios.delete('/api/transactions/' + transactionID, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then(res => {
      update();
      changeBalance(res.data.balance)
      setSuccess(true)
      handleClick()
      handleClickVariant(res.data.message, 'success')
      
    }).catch(error => {
      setSuccess(false)
      handleClick()
      handleClickVariant(error.message, 'error')
    })


  }

  return (
    <>
      <StyledTableRow>
        <StyledTableCell >{transaction.vendor}</StyledTableCell>
        <StyledTableCell className={transaction.amount >= 0 ? "green" : "red"}>{transaction.amount.toLocaleString()}$</StyledTableCell>
        <StyledTableCell >{transaction.category}</StyledTableCell>
        <StyledTableCell >{new Date(transaction.date).toLocaleDateString('en-DE')}</StyledTableCell>
        <StyledTableCell > <Button color="error" variant="contained" disableElevation onClick={() => deleteTransaction(transaction._id)}>
          Delete
        </Button></StyledTableCell>
      </StyledTableRow>

      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {!success ?
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert> :
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        }
      </Snackbar> */}

      {/* <br></br>
      <Item  sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid  item xs={12}>
      <h3>{new Date(transaction.date).toLocaleDateString('en-DE')}</h3>
        </Grid>
        <Grid  item xs={6}>
        <div style={{backgroundColor:"#F2FEFF"}} >{transaction.vendor}</div>
        </Grid>
        <Grid item xs={6}>
        <div className={transaction.amount>=0?"deposit" :"withdraw"}>{transaction.amount}$</div>               
        </Grid>
        <Grid item xs={6}>
        <div>{transaction.category}</div> 
        </Grid>
        <Grid item xs={6}>
        <Button color="error" variant="contained" disableElevation onClick={()=>deleteTransaction(transaction._id)}>
          Delete
        </Button>
        </Grid>
        </Grid>
      </Item> */}
    </>
  )
}
