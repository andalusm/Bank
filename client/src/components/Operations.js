import Item from './Item';
import { TextField, Button, InputAdornment, Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom'



export default function Operations({ changeBalance, canPay }) {
  const [amount, setAmount] = useState(0);
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState((new Date()).toISOString().split('T')[0]);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("The transaction wasn't added try again later")
  const navigate = useNavigate()

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
    if (date && category && vendor && amount && (alpha > 0 || canPay(alpha * amount))) {
      axios.post('/api/transactions/' + localStorage.id, {
        "amount": (alpha * amount),
        "vendor": vendor,
        "category": category,
        "date": date
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }).then(res => {
        changeBalance(res.data.balance)
        setSuccess(true)
        handleClick()
        setTimeout(() => {
          navigate('/')
        }, 3000)
      })
        .catch(error => {
          setSuccess(false)
          handleClick()
          setErrorMessage(error.message)
        })
    }
    else {
      if (!canPay(alpha * amount)) {
        setErrorMessage("Insufficient Funds!!! Your balance can't go lower that -500!")
        setSuccess(false)
        handleClick()
      }
      else {
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
          <TextField sx={{
            "width": "50%"
          }} color='secondary' variant="outlined" onChange={(e) => {
            setDate(e.target.value)
          }} value={date} label="date" type="date" />
        </div>
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
            sx={{ width: '100%' }}
          >
            {errorMessage}
          </Alert> :
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            The transaction was successfully added!
          </Alert>
        }
      </Snackbar>
    </>
  )
}

