import React from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import { StyledTableCell, StyledTableRow } from './Table';
import { useSnackbar } from 'notistack';


export default function Transaction({ transaction, update, changeBalance }) {
  const { enqueueSnackbar } = useSnackbar();



  const handleClickVariant = function(text, typeMessage) {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(text ,  { variant: typeMessage } );
  };
  function addTransaction(date, category, amount, vendor) {
    if (date && category && vendor && amount ) {
      axios.post('/api/transactions/' + localStorage.id, {
        "amount": (amount),
        "vendor": vendor,
        "category": category,
        "date": date
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }).then(res => {
        changeBalance(res.data.balance)
        update()
        
      })
        .catch(error => {
          alert(error.message)
        })
    }
    
  }



  function deleteTransaction(transactionID) {
    axios.delete('/api/transactions/' + transactionID, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then(res => {
      update();
      changeBalance(res.data.balance)
      handleClickVariant(res.data.message, 'success')
      
    }).catch(error => {
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
        <StyledTableCell > <Button color="success" variant="contained" disableElevation onClick={() => addTransaction(transaction.date, transaction.category, transaction.amount, transaction.vendor)}>
          Repeat
        </Button></StyledTableCell>
      </StyledTableRow>
    </>
  )
}
