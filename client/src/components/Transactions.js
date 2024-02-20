import React, { useState, useEffect } from 'react'
import Transaction from './Transaction'
import Item from './Item';
import { StyledTableCell } from './Table';
import { TableBody, TableHead, TableRow, Table, Select, MenuItem, InputLabel, FormControl, Autocomplete, TextField, Grid, Box } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Transactions({ changeBalance }) {
  const [month, setMonth] = useState(-1)
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([])
  function update() {
    axios.get("/api/transactions/" + localStorage.id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      setTransactions(res.data)
    });
  };

  useEffect(() => {
    if (localStorage.token) {
      update()
    }
    else{
      navigate('/signIn')
    }
  }
    , []);
  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  const sameMonth = function (date) {
    if (month >= 0 && (new Date(date)).getMonth() !== month) {
      return false
    }
    return true;
  }
  const sameVendor = function (vendorTransaction) {
    if (vendor  && !vendorTransaction.toLowerCase().includes(vendor.toLowerCase())) {
      return false
    }
    return true;
  }
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const vendors = Array.from(new Set(transactions.map(t => t.vendor)))
  const [vendor, setVendor] = useState("")
  return (
    <>

      <Item className='transactions'>
        <h2 className='title'>All Transaction:</h2>
        <Box sx={{ flexGrow: 1, margin: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Autocomplete
                color='secondary'
                disablePortal
                id="combo-box-demo"
                onChange={(event, newValue) => {
                  setVendor(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  setVendor(newInputValue);
                }}
                options={vendors}
                value={vendor}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField color='secondary' {...params} label="Search vendor" />}
              ></Autocomplete>
            </Grid>
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

                  <MenuItem  value={-1}>
                    ALL
                  </MenuItem>
                  {months.map((m, index) => <MenuItem key={index} value={index}>{m}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

          </Grid>

        </Box>


        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >Vendor</StyledTableCell>
              <StyledTableCell >Amount</StyledTableCell>
              <StyledTableCell >Category</StyledTableCell>
              <StyledTableCell >Date of transaction</StyledTableCell>
              <StyledTableCell ></StyledTableCell>
              <StyledTableCell ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.filter(t => sameVendor(t.vendor) && sameMonth(t.date)).map((t, index) => <Transaction changeBalance={changeBalance} transaction={t} update={update} key={index}></Transaction>)}
          </TableBody>
        </Table>
      </Item >
    </>
  )
}
