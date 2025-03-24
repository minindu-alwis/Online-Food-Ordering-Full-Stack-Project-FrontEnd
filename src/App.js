import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { NavBar } from './component/NavBar/NavBar';
import { darkTheme } from './Theme/DarkTheme';
import { Home } from './component/Home/Home';
import RestaurantDetails from './component/Restaurant/RestaurantDetails';
import Cart from './component/cart/Cart';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
      <NavBar/>
      {/* <Home/> */}
      {/* <RestaurantDetails/> */}
      <Cart/>
      </ThemeProvider>
    </div>
  );
}

export default App;
