import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import UniversitiesSection from "../components/home/UniversitiesSection";
import ComingSoonSection from "../components/home/ComingSoonSection";
import QuickAccessSection from "../components/home/Quickaccesssection";
import Footer from "../components/home/Footer";

function HomePage() {
    return (
        <>
            <Navbar />

            <HeroSection />
            <QuickAccessSection />

            <FeaturesSection />

            <HowItWorksSection />

            <WhyChooseUsSection />

            <UniversitiesSection />

            <ComingSoonSection />
            <Footer />
        </>
    );
}

export default HomePage;