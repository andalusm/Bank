import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';
import Operations from './components/Operations'
import BreakDown from './components/BreakDown'
import { useState, useEffect } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios'




function App() {
  const [balance, setBalance] = useState(0)
  const [loggedIn, setLoggedIn] = useState(false)
  const [transactions, setTransactions] = useState([])
  function getData() {
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
      setLoggedIn(true)
      getData()
      setBalance(localStorage.balance)
    }
    else {
      console.log("Ho")
    }
  }
    , []);
  const logout = function () {
    localStorage.clear()
    setLoggedIn(false)
    setTransactions([])
  }
  const login = function(){
    setLoggedIn(true)
    getData()
  }
  function canPay(balanceChange) {
    if (balance + balanceChange <= 500) {
      return false
    }
    return true
  }
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
  function changeBalance(newBalance) {
    localStorage.balance = Number(newBalance)
    setBalance(newBalance)
  }


  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loggedIn ? <Navbar balance={balance} logout={logout}></Navbar> : <></>}
          <Routes>
            <Route path="/" element={<Transactions changeBalance={changeBalance} transactions={transactions} update={getData} />} />
            <Route path="/signUp" element={<SignUp loggedIn={loggedIn} loggedInF={login}/>} />
            <Route path="/signIn" element={<SignIn loggedIn={loggedIn} loggedInF={login} />} />
            <Route path="/operations" element={<Operations changeBalance={changeBalance} canPay={canPay} />} />
            <Route path="/breakdown" element={<BreakDown />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  )

}

export default App;
