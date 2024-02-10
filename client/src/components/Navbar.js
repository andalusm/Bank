import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar({balance, logout}) {
  const navigate = useNavigate();

  // Function to handle redirection
  const customRedirect = () => {
    // Redirect to the dashboard route
    navigate('/signin');
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" href="/">
          <h3>Transactions</h3>
        </Button>
        <Button color="inherit" href="/operations">
        <h4>Operations</h4>
        </Button>
        <Button color="inherit" href="/breakdown">
        <h4>Breakdown</h4>
        </Button>
        <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Button color="inherit" style={{ marginLeft: 'auto' }}>
          Balance:<span className={Number(balance)>=500?"green":"red"}>{Number(balance).toLocaleString()}$</span>
        </Button>
        <Button color="inherit" onClick={()=>{customRedirect(); logout(); }} style={{ marginLeft: 'auto' }}>
        <h4>Logout</h4>
        </Button>
        </Box>
        
      </Toolbar>
    </AppBar>
  )
}
