import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage/CalculatorPage";
import AboutPage from "./pages/AboutPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import UniversityDetailPage from "./pages/UniversityDetailPage/UniversityDetailPage";
import ComingSoonPage from "./pages/ComingSoonPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calculator" element={<CalculatorPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Stubbed so the Quick Access cards and footer links never 404.
          Replace each with a real page — see PM notes for build order. */}
      <Route
        path="/requirements"
        element={
          <ComingSoonPage
            title="Course Requirements"
            description="Subject combinations and entry requirements for every course, searchable by university — on the way."
          />
        }
      />
      <Route
        path="/screening-score"
        element={
          <ComingSoonPage
            title="Required Screening Score"
            description="See the minimum score you need to clear Post-UTME screening for any course — on the way."
          />
        }
      />
      <Route path="/universities" element={<UniversitiesPage />} />
      <Route path="/universities/:id" element={<UniversityDetailPage />} />
    </Routes>
  );
}

export default App;