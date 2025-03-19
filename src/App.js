import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { NavBar } from './component/NavBar/NavBar';
import { darkTheme } from './Theme/DarkTheme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
      <NavBar/>
      </ThemeProvider>
    </div>
  );
}

export default App;
