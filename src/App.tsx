import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import Home from './routes/Home';
import Post from './routes/Post';
import Login from './routes/Admin/Login';
import Dashboard from './routes/Admin/Dashboard';
import StatusbarMessages from './routes/Admin/StatusbarMessage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Signout from './routes/Admin/Signout';
import Statusbar from './routes/Admin/Statusbar';
import StatusbarProperties from './routes/Admin/StatusbarProperties';

function App() {

  useEffect(() => {
    document.title = "Centro de Servicios | Universidad Interamericana de Puerto Rico - Fajardo";
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/post" element={<Post/>} />
        <Route path="/admin" element={<Login/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/statusbar" element={<Statusbar/>} />
        <Route path="/admin/statusbar/properties" element={<StatusbarProperties/>} />
        <Route path="/admin/statusbar/:id" element={<StatusbarMessages/>} />
        <Route path="/admin/signout" element={<Signout/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
