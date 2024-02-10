import React from 'react'
import { Grid, Button } from '@mui/material';
import Item from './Item';
import axios from 'axios';
import { StyledTableCell, StyledTableRow } from './Table';





export default function Transaction({ transaction, update, changeBalance }) {
  function deleteTransaction(transactionID) {
    axios.delete('/api/transactions/' + transactionID,  {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then(res => {
      update();
      changeBalance(res.data.balance)
    })

  }

  return (
    <>
        <StyledTableRow>
          <StyledTableCell >{transaction.vendor}</StyledTableCell>
          <StyledTableCell  className={transaction.amount >= 0 ? "green" : "red"}>{transaction.amount.toLocaleString()}$</StyledTableCell>
          <StyledTableCell >{transaction.category}</StyledTableCell>
          <StyledTableCell >{new Date(transaction.date).toLocaleDateString('en-DE')}</StyledTableCell>
          <StyledTableCell > <Button color="error" variant="contained" disableElevation onClick={() => deleteTransaction(transaction._id)}>
            Delete
          </Button></StyledTableCell>
        </StyledTableRow>

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
