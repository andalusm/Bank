import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import Transactions from './components/Transactions'
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Operations from './components/Operations';
import axios from 'axios';
import BreakDown from './components/BreakDown';






function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#F2FEFF',
        contrastText: '#508990',
      },
      secondary: {
        main: '#88B0B4',
      },
    },
  })
  const [balance, setBalance] = useState(90)
  const [transactions,setTransactions] = useState([])
  function getData() {
    axios.get("/api").then((res ) => {
      setTransactions(res.data)
    });
  };
  useEffect(() => {getData()}
  , []);
  function changeBalance(balanceChange){
    setBalance(balance+balanceChange)
  }
  function canPay(balanceChange){
    if(balance+balanceChange < -500){
      return false
    }
    return true
  }


  
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Navbar balance={balance}></Navbar>

        <Routes>
          <Route path="/" element={<Transactions transactions={transactions} update={getData} />} />
         <Route path="/operations" element={<Operations changeBalance={changeBalance} canPay={canPay}/>} />
         <Route path="/breakdown" element={<BreakDown />} />

        </Routes>
        </ThemeProvider>
    </Router>
  );
}

export default App;
