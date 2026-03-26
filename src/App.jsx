import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateInvitation from './pages/CreateInvitation';
import Invitation from './pages/Invitation';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/create" element={
            <ProtectedRoute>
              <CreateInvitation />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/edit/:slug" element={
            <ProtectedRoute>
              <CreateInvitation />
            </ProtectedRoute>
          } />
          <Route path="/undangan/:slug" element={<Invitation />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
