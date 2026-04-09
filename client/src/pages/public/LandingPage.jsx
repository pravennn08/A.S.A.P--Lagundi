import React from "react";
import Navbar from "../../components/landing/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import AdvisorySection from "../../components/landing/AdvisorySection";
import Footer from "../../components/landing/Footer";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LuLogIn } from "react-icons/lu";
import CoverageSection from "../../components/landing/CoverageSection";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  text-gray-800">
      <Navbar
        showBackButton={true}
        backLabel="Admin Login"
        icon={LuLogIn}
        onBack={() => navigate("/login")}
      />
      <HeroSection />
      <CoverageSection />
      <AdvisorySection />
      <Footer />
    </div>
  );
};

export default LandingPage;
