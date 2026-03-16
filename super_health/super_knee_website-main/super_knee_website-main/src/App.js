// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import FloatingContact from "./components/FloatingContact/FloatingContact";

// import Home from "./pages/Home";
// import Shop from "./pages/Shop";
// import Benefits from "./pages/Benefits";
// import HowItWorks from "./pages/HowItWorks";
// import Reviews from "./pages/Reviews";
// import Cart from "./pages/Cart";

// import AuthLanding from "./pages/auth/AuthLanding";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";

// import AdminDashboard from "./pages/admin/AdminDashboard";
// import VendorDashboard from "./pages/vendor/VendorDashboard";

// import AdminLayout from "./pages/admin/layout/AdminLayout";
// import Orders from "./pages/admin/pages/Orders";
// import Products from "./pages/admin/pages/Products";
// import Dashboard from "./pages/admin/pages/Dashboard";
// import Categories from "./pages/admin/pages/Categories";
// import Inventory from "./pages/admin/pages/Inventory";
// // import Reviews from "./pages/admin/pages/Reviews";
// import Notifications from "./pages/admin/pages/Notifications";

// function App() {
//   return (
//     <Router>
//       {/* Navbar */}
//       <Navbar />

//       <Routes>

//         {/* Main Pages */}
//         <Route path="/" element={<Home />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/benefits" element={<Benefits />} />
//         <Route path="/how-it-works" element={<HowItWorks />} />
//         <Route path="/reviews" element={<Reviews />} />
//         <Route path="/cart" element={<Cart />} />

//         {/* Authentication Pages */}
//         <Route path="/auth" element={<AuthLanding />} />
//         <Route path="/login/:role" element={<Login />} />
//         <Route path="/register/:role" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Dashboards */}
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/vendor-dashboard" element={<VendorDashboard />} />

//         {/* Admin Panel Routes */}
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route path="orders" element={<Orders />} />
//             <Route path="products" element={<Products />} />
//             <Route path="products" element={<Products />} />
//             <Route path="categories" element={<Categories />} />
//             <Route path="inventory" element={<Inventory />} />
//   {/* <Route path="reviews" element={<Reviews />} /> */}
//   <Route path="notifications" element={<Notifications />} />
//   <Route path="dashboard" element={<Dashboard />} />


//         </Route>

//       </Routes>

//       {/* Floating WhatsApp + Call */}
//       <FloatingContact />

//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import FloatingContact from "./components/FloatingContact/FloatingContact";

/* Main Pages */
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Benefits from "./pages/Benefits";
import HowItWorks from "./pages/HowItWorks";
import Reviews from "./pages/Reviews";
import Cart from "./pages/Cart";

/* Authentication */
import AuthLanding from "./pages/auth/AuthLanding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

/* Dashboards */
import AdminDashboard from "./pages/admin/AdminDashboard";
import VendorDashboard from "./pages/vendor/VendorDashboard";

/* User Pages */
import Order from "./pages/user/Order";
import Checkout from "./pages/user/Checkout";
import OrderSuccess from "./pages/user/OrderSuccess";
import PaymentFail from "./pages/user/PaymentFail";
import Search from "./pages/Search";

import AdminLayout from "./pages/admin/layout/AdminLayout";
import Dashboard from "./pages/admin/pages/Dashboard";
import Orders from "./pages/admin/pages/Orders";
import Products from "./pages/admin/pages/Products";
import Categories from "./pages/admin/pages/Categories";
import Inventory from "./pages/admin/pages/Inventory";
import Notifications from "./pages/admin/pages/Notifications";
import Review from "./pages/admin/pages/Review";
import Customers from "./pages/admin/pages/Customers";

import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <Box sx={{ width: '100%', overflowX: 'hidden', position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top Navigation */}
        <Navbar />

        <Box sx={{ flex: 1 }}>
          <Routes>

            {/* ---------------- MAIN WEBSITE ---------------- */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />

            {/* ---------------- AUTH ---------------- */}
            <Route path="/auth" element={<AuthLanding />} />
            <Route path="/login/:role" element={<Login />} />
            <Route path="/register/:role" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* ---------------- USER ---------------- */}
            <Route path="/orders" element={<Order />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/payment-fail" element={<PaymentFail />} />

            {/* ---------------- DASHBOARDS ---------------- */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />

            {/* ---------------- ADMIN PANEL ---------------- */}
            <Route path="/admin" element={<AdminLayout />}>

              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="reviews" element={<Review />} />
              <Route path="customers" element={<Customers />} />

            </Route>

          </Routes>
        </Box>

        {/* Floating WhatsApp / Contact Button */}
        <FloatingContact />
      </Box>
    </Router>
  );
}

export default App;