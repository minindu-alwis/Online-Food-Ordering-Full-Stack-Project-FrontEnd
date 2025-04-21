import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { NavBar } from './component/NavBar/NavBar';
import { darkTheme } from './Theme/DarkTheme';
import { Home } from './component/Home/Home';
import RestaurantDetails from './component/Restaurant/RestaurantDetails';
import Cart from './component/cart/Cart';
import Profile from './component/Profile/Profile';
import { CustomerRoute } from './Routers/CustomerRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import { store } from './component/State/store';
import { findCart } from './component/State/Cart/Action';

function App() {

  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)  

  useEffect(() => {

    dispatch(getUser(auth.jwt || jwt))
    dispatch(findCart(jwt))

  },[auth.jwt])

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
      
      <CustomerRoute/>

      </ThemeProvider>
    </div>
  );
}

export default App;
