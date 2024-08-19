import { CssBaseline, useTheme } from '@mui/material'
import './App.css'
import AppLayout from './components/layout/AppLayout'
import { Route, Routes } from 'react-router-dom'
import { RoutesProvider } from './router/context/RoutesContext'

import Dashoboard from './Pages/Dashboard/Dashoboard'
function App() { 

  return (
    <RoutesProvider>
    <CssBaseline></CssBaseline>
    <Routes>
      <Route element={<AppLayout></AppLayout>} path='/'>

        <Route element={<Dashoboard/>} path='dashboard'>

        </Route>
        <Route path='recruitement'>
            <Route path='interviews'></Route>
            <Route path='schedule'></Route>
            <Route path='settings'></Route>
        </Route>
        <Route path='team-members'>

        </Route>
        <Route path='meetings'>
          <Route path='meetings'></Route>
          <Route path='settings'></Route>
        </Route>
        <Route path='evaluation'>

        </Route>

      </Route>
    </Routes>
    </RoutesProvider>
  )
 
}

export default App
