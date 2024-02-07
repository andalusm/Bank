import React from 'react'
import { Grid, Button } from '@mui/material';
import Item from './Item';
import axios from 'axios';





export default function Transaction({ transaction , update}) {
  function deleteTransaction(transactionID){
    axios.delete('/api/'+transactionID).then(res => {
      console.log(res.data);
      update();
    })
    
  }

  return (
    <>
    <br></br>
      <Item  sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid  item xs={6}>
        <div style={{backgroundColor:"#F2FEFF"}} >{transaction.vendor}</div>
        </Grid>
        <Grid item xs={6}>
        <div className={transaction.amount>=0?"deposit" :"withdraw"}>{transaction.amount}</div>               
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
      </Item>
    </>
  )
}
