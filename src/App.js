import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Landing/Home";

import Dashboard from "./retail/dashboard";
import Customer from "./retail/AddCustomer";
import AdminDashboard from "./admin/AdminDashboard";
import AddRetailer from "./admin/AddRetailer";

function App() {
  return (
    <Router>
      <Routes>
       {/* Landing Page */}
        <Route path="/Home" element={<Home />} />
       

       {/* retailer's zone */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AddCustomer" element={<Customer />} />

        {/* Admin's zone */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AddRetailer" element={<AddRetailer />} />



      </Routes>
    </Router>
  );
}

export default App;
