import SearchBox from "./components/SearchBox";
import Layout from "./components/Layout";
import PrintPage from "./pages/PrintPage"; 
import NoPage from "./pages/NoPage"; 
import AdminPage from './pages/AdminPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutPage from './pages/AboutPage';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SearchBox />} />
          <Route path="/print" element={<PrintPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NoPage />} /> {/* This handles all other routes */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
