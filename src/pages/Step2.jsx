import { useNavigate } from "react-router-dom"
import PlanSelection from "../components/PlanSelection";
const Step2 = () => {
  const navigate = useNavigate();
  return (
    <div className="step2-container">
      <div className="step2-header">
        <h1 className="step2-header-title ubuntu-bold">Select your plan</h1>
        <p className="step2-header-par ubuntu regular">You have the option of monthly or yearly billing.</p>
      </div>
      <PlanSelection />
    </div>
    )
  }
  
export default Step2
  