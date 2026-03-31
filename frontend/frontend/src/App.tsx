import './App.css'
import Header from './Components/Header/Header';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './ThemContext';  // ✅ import ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <div className='app'>
        <Header />
        <Outlet />
      </div>
    </ThemeProvider>
  )
}

export default App