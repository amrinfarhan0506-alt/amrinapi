import { useState, useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import '../src/assets/Prachi.css'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Docpro from './admin/docpro'
import Hospro from './admin/hospro'
import Sarita from './admin/sarita'
import Inner from './admin/inner'
function App() {
  
  return(
    <><BrowserRouter>
  <Link to='/docpro'>Doctor</Link>
  <Link to='/hospro'>Hospital</Link>
  <Link to='/sarita'>Sign In</Link>
  <Routes>

  <Route path='/' element={<Docpro/>}/>
  <Route path='/docpro' element={<Docpro/>}/>
  <Route path='/hospro' element={<Hospro/>}/>
  <Route path='/sarita' element={<Sarita/>}/>
  <Route path='/inner' element={<Inner/>}/>
  </Routes>
  </BrowserRouter>


    </>
  )
 }

export default App
