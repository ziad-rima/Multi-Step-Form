import { useNavigate } from "react-router-dom"
import AddOnsSelections from "../components/AddOnsSelections";
const Step3 = () => {
  const navigate = useNavigate();
  return (
    <div className="step3-container">
      <div className="step3-header">
        <h1 className="step3-header-title ubuntu-bold">Pick add-ons</h1>
        <p className="step3-header-par ubuntu regular">Add-ons help enhance your gaming experience.</p>
      </div>
      <AddOnsSelections />
    </div>
  )
}

export default Step3
