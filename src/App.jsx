import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Step4 from "./pages/Step4";
import Step5 from "./pages/Step5";
import StepTracker from "./components/StepTracker";
import NextButton from "./components/NextButton";
import BackButton from "./components/BackButton";

const steps = ["/", "/step-2", "/step-3", "/step-4", "/step-5"];

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = steps.indexOf(location.pathname);

  const [isValid, setIsValid] = useState(false);
  const [isStep1Complete, setIsStep1Complete] = useState(false);

  const handleNext = () => {
    if (currentIndex === 0) {
      if (!isStep1Complete) return;
    }
    navigate(steps[currentIndex + 1]);
  };

  return (
    <div className="main-container">
      <StepTracker />
      <div className="step-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Step1 
                setIsValid={setIsValid}
                setIsStep1Complete={setIsStep1Complete}
              />
            } 
          />
          <Route path="/step-2" element={<Step2 />} />
          <Route path="/step-3" element={<Step3 />} />
          <Route path="/step-4" element={<Step4 />} />
          <Route path="/step-5" element={<Step5 />} />
        </Routes>
      </div>
      
      <div className="step-footer">
        {currentIndex > 0 && currentIndex < steps.length - 1 && <BackButton prevStep={steps[currentIndex - 1]} />}
        {currentIndex < steps.length - 1 && (
          <NextButton 
            handleNext={handleNext}
            disabled={currentIndex === 0 ? !isStep1Complete : false}
        />
        )}
      </div>
    </div>
  );
};
export default App;