import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Footer from './components/Footer';
import AllRooms from './Pages/AllRooms';
import RoomDetails from './Pages/RoomDetails';
import MyBookings from './Pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './Pages/hotelOwner/Layout';
import Dashboard from './Pages/hotelOwner/Dashboard';
import AddRoom from './Pages/hotelOwner/AddRoom';
import ListRoom from './Pages/hotelOwner/ListRoom';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  // ✅ Corrected: Changed from showHotellReg to showHotelReg
  const { showHotelReg } = useAppContext();

  return (
    <div>
      <Toaster />

      {/* Show navbar only when not in owner dashboard */}
      {!isOwnerPath && <Navbar />}

      {/* Show registration form modal if user clicked "List Your Hotel" */}
      {showHotelReg && <HotelReg />}

      {/* App Routes */}
      <div className="min-h-[70vh]">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          {/* Owner Dashboard Routes */}
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
