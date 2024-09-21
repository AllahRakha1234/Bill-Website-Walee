import SearchBox from "./components/SearchBox";
import Layout from "./components/Layout";
import PrintPage from "./pages/PrintPage"; 
import NoPage from "./pages/NoPage"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/print" element={<PrintPage />} />
          <Route path="/" element={<SearchBox />} />
          <Route path="*" element={<NoPage />} /> {/* This handles all other routes */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
