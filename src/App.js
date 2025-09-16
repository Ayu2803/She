import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Landing/Home";
import About from "./Landing/About";
// import AdminLogin from "./Landing/AdminLogin";
// import RetailerLogin from "./Landing/RetailerLogin";
import Dashboard from "./retail/dashboard";
import Customer from "./retail/AddCustomer";
import AdminDashboard from "./admin/AdminDashboard";
import AddRetailer from "./admin/AddRetailer";
import PoliceDashboard from './Police/PoliceDashboard';

function App() {
  return (
    <Router>
      <Routes>
       {/* Landing Page */}
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />

       {/* retailer's zone */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AddCustomer" element={<Customer />} />

        {/* Admin's zone */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AddRetailer" element={<AddRetailer />} />

        {/* Police Zone */}
        <Route path="/PoliceDashboard" element={<PoliceDashboard />} />
        

      </Routes>
    </Router>
  );
}

export default App;
