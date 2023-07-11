import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import AddEmp from './Components/AddEmp/AddEmp.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    
    <BrowserRouter>
        <App />
    
    </BrowserRouter>
    
)
