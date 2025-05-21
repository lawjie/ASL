import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Dashboard } from './pages/Dashboard'
import { PointofSale } from './pages/PointofSale'
import { ItemInventory } from './pages/ItemInventory'
import { SalesHistory } from './pages/SalesHistory'
import { User } from './pages/User'
import { Settings } from './pages/Settings'

import { Layout } from './components/Layout'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  useEffect(() => {
    let token = sessionStorage.getItem("User")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [])
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>}/>    {/* http://localhost:5173/# */}
        <Route element={<Layout/>}> {/* PARENT AND BELOW IS CHILDREN */}
          <Route path='/dashboard'       element={<Dashboard/>}/> 
          <Route path='/pointofsale' element={<PointofSale/>}/>
          <Route path='/iteminventory'   element={<ItemInventory/>}/> 
          <Route path='/saleshistory'    element={<SalesHistory/>}/>
          <Route path='/user'    element={<User/>}/> 
          <Route path='/settings'    element={<Settings/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
