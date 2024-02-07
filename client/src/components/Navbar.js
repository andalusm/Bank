import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import React from 'react'

export default function Navbar({balance}) {
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
        <Typography variant="h6" style={{ marginLeft: 'auto' }}>
          Balance:<span className={balance>=0?"green":"red"}>{balance}</span>$
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
