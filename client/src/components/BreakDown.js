import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Category from './Category';
import Item from './Item';
import { Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material';



export default function BreakDown() {

  const [breakdown, setBreakdown] = useState([])
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const [month, setMonth] = useState(-1)
  const handleChange = (event) => {
    setMonth(event.target.value);
    axios.get("/api/transactions/categories/"+(event.target.value+1)+"/"+localStorage.id, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then((res) => {
      setBreakdown(res.data)
    });

  };


  function getBreakDown() {
    axios.get("/api/transactions/categories/"+localStorage.id, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then((res) => {
      setBreakdown(res.data)
    });
  }
  useEffect(() => {
    getBreakDown()
  }
    , []);
  return (
    <Item className='breakdown'>
      <h2 className='title'>BreakDown:</h2>

      <Grid item xs={6}>
        <FormControl color='secondary' sx={{ width: 300 }} style={{ textAlign: "left" }}>
          <InputLabel id="demo-simple-select-label">Filter Transaction via months</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            onChange={handleChange}
            label="Filter Transactions via months"
          >
            <MenuItem value={-1}>
             ALL
            </MenuItem>
            {months.map((m, index) => <MenuItem key={index} value={index}>{m}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      {breakdown.map((b, index) => <Category category={b} month={month} key={index} />)}
    </Item>
  )
}
