// src/App.jsx or src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import StartTest from "./pages/StartTest";
import PracticeTest from "./pages/PracticeTest";
import Donate from "./pages/Donate";
import AboutUs from "./pages/AboutUs";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import ContactUs from "./pages/ContactUs";
import TipsPage from "./pages/TipsPage";
import Electronics from "./pages/Electronics";
import Fashion from "./pages/Fashion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Books from "./pages/Books";
import HomeDecor from "./pages/HomeDecor";
import Gadgets from "./pages/Gadgets";
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordRequestPage from './pages/ResetPasswordRequestPage';
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        {/* Redirect root to your stutter detector for demo purposes */}
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/start-test" element={<StartTest />} />
        <Route path="/practice-test" element={<PracticeTest />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/donate" element={<Donate/>} />
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/aboutpage" element={<AboutPage/>}/>
        <Route path="/helppage" element={<HelpPage/>}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/category/electronics" element={<Electronics/>}/>
        <Route path="/category/fashion" element={<Fashion/>}/>
        <Route path="/category/books" element={<Books/>}/>
        <Route path="/category/gadgets" element={<Gadgets/>}/>
        <Route path="/category/home_decor" element={<HomeDecor/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordRequestPage />} />
        <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordConfirmPage />} />

        {/* Optionally: Add a 404 page */}
        <Route path="*" element={<div className="text-center mt-20 text-2xl font-semibold">404 Not Found</div>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;