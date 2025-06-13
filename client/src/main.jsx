import { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router';
import App from './App.jsx';
import HomePage from "./components/HomePage.jsx";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/home' element={<HomePage/>} />
    </Routes>
  </BrowserRouter>
);
