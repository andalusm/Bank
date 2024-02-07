import Item from './Item';
import { TextField, Button, InputAdornment, Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import React from 'react'


export default function Operations({ changeBalance, canPay }) {
  const [amount, setAmount] = useState(0);
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("The transaction wasn't added try again later")

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  function addTransaction(alpha) {
   if(category && vendor && amount && canPay(alpha * amount)){
    axios.post('/api', {
      "amount": (alpha * amount),
      "vendor": vendor,
      "category": category
    }).then(res => {
      changeBalance(alpha * amount)
      setSuccess(true)
      handleClick()
    })
      .catch(error => {
        setSuccess(false)
        handleClick()
        console.log(error)
      })
    }
    else{
      if(amount){
      setErrorMessage("Insufficient Funds!!! Your balance can't go lower that -500!")
      setSuccess(false)
      handleClick()
      }
      else{
        setErrorMessage("Some Inputs are empty or the amount is 0!")
      setSuccess(false)
      handleClick()
      }
    }
  }

  return (
    <>
      <Item className='operations'>
        <h2 className='title'>Insert Transaction:</h2>
        <div><TextField sx={{
          "width": "50%"
        }} onChange={(e) => { if (e.target.value >= 0) { setAmount(e.target.value) } }} value={amount} type="number" variant="outlined" label="Transaction amount" InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }} color="secondary" /></div>
        <div><TextField sx={{
          "width": "50%"
        }} size="200px" onChange={(e) => setVendor(e.target.value)} value={vendor} variant="outlined" label="Transaction vendor" color="secondary" /></div>
        <div><TextField sx={{
          "width": "50%"
        }} onChange={(e) => setCategory(e.target.value)} value={category} variant="outlined" label="Transaction category" color="secondary" /></div>
        <div>
          <Button onClick={() => addTransaction(-1)} color="error" variant="contained" disableElevation>
            Withdraw
          </Button>

          <Button onClick={() => addTransaction(1)} sx={{ "margin": "10px" }} color="success" variant="contained" disableElevation>
            Deposit
          </Button>
        </div>
      </Item>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {!success ?
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {errorMessage}
          </Alert> :
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            The transaction was successfully added!
          </Alert>
        }
      </Snackbar>
    </>
  )
}
