import { Routes, Route } from "react-router-dom"
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Step4 from "./pages/Step4";
import Step5 from "./pages/Step5";
import StepTracker from "./components/StepTracker";
const App = () => {
  return (
    <div className="main-container">
      <StepTracker />
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step-2" element={<Step2 />} />
        <Route path="/step-3" element={<Step3 />} />
        <Route path="/step-4" element={<Step4 />} />
        <Route path="/step-5" element={<Step5 />} />
      </Routes>
    </div>
  )
}

export default App
