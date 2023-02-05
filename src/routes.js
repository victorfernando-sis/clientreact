import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Student from './pages/Student';
import NewStudent from './pages/NewStudent';

export default function RoutesApp(){
    return (
        <BrowserRouter>
           <Routes>
               <Route path="/"  element={<Login/>}/>
               <Route path="/students" element={<Student/>}/>
               <Route path="/students/new/:studentId" element={<NewStudent/>}/>
            </Routes>
        </BrowserRouter>    
    );
}