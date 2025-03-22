import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { NavBar } from './component/NavBar/NavBar';
import { darkTheme } from './Theme/DarkTheme';
import { Home } from './component/Home/Home';
import RestaurantDetails from './component/Restaurant/RestaurantDetails';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
      <NavBar/>
      {/* <Home/> */}
      <RestaurantDetails/>
      </ThemeProvider>
    </div>
  );
}

export default App;
