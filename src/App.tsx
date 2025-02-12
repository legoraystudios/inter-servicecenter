import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import Home from './routes/Home';
import Post from './routes/Post';
import Login from './routes/Admin/Login';
import Dashboard from './routes/Admin/Dashboard';
import StatusbarMessages from './routes/Admin/StatusbarMessage';
import Signout from './routes/Admin/Signout';
import Statusbar from './routes/Admin/Statusbar';
import StatusbarProperties from './routes/Admin/StatusbarProperties';
import PostList from './routes/Admin/PostList';
import PostDetail from './routes/Admin/PostDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PhoneDirectory from './routes/Admin/Directory';
import DirectoryDepartmentDetail from './routes/Admin/DirectoryDepartmentDetail';
import DirectoryPersonDetail from './routes/Admin/DirectoryPersonDetail';
import Facilities from './routes/Admin/Facility/Facilities';
import FacilityDetail from './routes/Admin/Facility/FacilityDetail';
import PhoneNumbers from './routes/Admin/Facility/PhoneNumbers';

function App() {

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/post/:id" element={<Post/>} />
        <Route path="/admin" element={<Login/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/facility" element={<Facilities/>} />
        <Route path="/admin/facility/phones" element={<PhoneNumbers/>} />
        <Route path="/admin/facility/:id" element={<FacilityDetail/>} />
        <Route path="/admin/statusbar" element={<Statusbar/>} />
        <Route path="/admin/statusbar/properties" element={<StatusbarProperties/>} />
        <Route path="/admin/statusbar/:id" element={<StatusbarMessages/>} />
        <Route path="/admin/directory" element={<PhoneDirectory/>} />
        <Route path="/admin/directory/department/:id" element={<DirectoryDepartmentDetail/>} />
        <Route path="/admin/directory/person/:id" element={<DirectoryPersonDetail/>} />
        <Route path="/admin/posts" element={<PostList/>} />
        <Route path="/admin/post/:id" element={<PostDetail/>} />
        <Route path="/admin/signout" element={<Signout/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
