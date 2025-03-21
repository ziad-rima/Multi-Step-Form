import { useNavigate } from "react-router-dom"
import PlanSelection from "../components/PlanSelection";
const Step2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Step 2: Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>
      <PlanSelection />
      <button onClick={() => navigate("/step-3")}>Next Step</button>
      <button onClick={() => navigate("/")}>Go Back</button>
    </>
    )
  }
  
export default Step2
  