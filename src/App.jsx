import React from 'react'
import Employee from './Components/Employee/Employee'
import AddEmp from './Components/AddEmp/AddEmp'
import ViewData from './Components/ViewData/ViewData'
import { Route, Routes } from 'react-router'
import Edit from './Components/Edit_emp/Edit'
import Home from './Components/Home/Home'
import View from './Components/View/View'

function App() {
  return (
    <>
      <AddEmp />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add_emp' element={<Employee />} />
        <Route path='/view_emp' element={<ViewData />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/view' element={<View />} /> 
      </Routes>
    </>
  )
}

export default App
