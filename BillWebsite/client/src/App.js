import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SearchBox from './components/SearchBox';
import NoPage from './pages/NoPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AboutPage from './pages/AboutPage';
import DownloadBillPage from './pages/DownloadBillPage';
import BillDesign from './components/BillDesign';
import PrivateRoute from './components/PrivateRoute';  // Import the PrivateRoute component

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SearchBox />} />
          <Route path="/print" element={<DownloadBillPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/adminlogin" element={<AdminLoginPage />} />
          
          {/* Protected Route for Admin Page */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <AdminPage />  {/* The protected Admin Page */}
              </PrivateRoute>
            } 
          />

          <Route path="*" element={<NoPage />} /> {/* This handles all other routes */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
