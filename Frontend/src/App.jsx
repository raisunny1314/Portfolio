import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage';
import { Routes, Route } from "react-router-dom";
import AdminLogin from './pages/AdminLogin';
import Dashboard from './components/admin/Dashboard';
import ProtectedRoutes from './routes/ProtectedRoutes';
import ProjectsHub from './components/admin/ProjectsHub';
import ExperienceHub from './components/admin/ExperienceHub';
import CodingProfiles from './components/admin/CodingProfiles';
import GeneralInfoHub from './components/admin/GeneralInfoHub';
import SocialLinkHub from './components/admin/SocialLinkHub';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path='/admin/dashboard' element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } >
          <Route path='projects' element={<ProjectsHub/>}/>
          <Route path='experience' element={<ExperienceHub/>}/>
          <Route path='coding' element={<CodingProfiles/>}/>
          <Route path='general' element={<GeneralInfoHub/>}/>
          <Route path='social' element={<SocialLinkHub/>}/>


        </Route>

      </Routes>
    </>
  )
}

export default App
