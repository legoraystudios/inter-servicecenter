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
import PhoneNumberDetail from './routes/Admin/Facility/PhoneNumberDetail';
import EmployeeList from './routes/Admin/Employees/EmployeeList';
import EmployeeDetail from './routes/Admin/Employees/EmployeeDetail';
import PasswordResetRequest from './routes/Admin/ForgotPassword/PasswordResetRequest';
import ResetPassword from './routes/Admin/ForgotPassword/ResetPassword';
import Directory from './routes/Directory';

function App() {

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/directory" element={<Directory/>} />
        <Route path="/post/:id" element={<Post/>} />
        <Route path="/admin" element={<Login/>} />
        <Route path="/admin/forgot-password" element={<PasswordResetRequest/>} />
        <Route path="/admin/forgot-password/reset" element={<ResetPassword/>} />
        <Route path="/admin/employees" element={<EmployeeList/>} />
        <Route path="/admin/employees/:id" element={<EmployeeDetail/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/facility" element={<Facilities/>} />
        <Route path="/admin/facility/:id" element={<FacilityDetail/>} />
        <Route path="/admin/facility/phones" element={<PhoneNumbers/>} />
        <Route path="/admin/facility/phones/:id" element={<PhoneNumberDetail/>} />
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
