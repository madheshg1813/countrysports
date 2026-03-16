import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CityLandingPage from './pages/CityLandingPage';
import BrandLandingPage from './pages/BrandLandingPage';
import BadmintonService from './pages/BadmintonService';
import Contact from './pages/Contact';

// Scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services/badminton" element={<BadmintonService />} />

                            <Route path="/chennai/badminton-stringing-services-in-:cityName" element={<CityLandingPage />} />
                            <Route path="/brands/:brandName" element={<BrandLandingPage />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </AnimatePresence>
                </main>
                <Footer />
            </div>
        </Router>
    );
}
