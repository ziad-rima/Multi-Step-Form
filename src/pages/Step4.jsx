import { useNavigate } from "react-router-dom"
import Summary from "../components/Summary";
const Step4 = () => {
  const navigate = useNavigate();
  return (
    <div className="step4-container">
      <div className="step4-header">
        <h1 className="step4-header-title ubuntu-bold">Finishing up</h1>
        <p className="step4-header-par ubuntu-regular">Double-check everything looks OK before confirming.</p>
      </div>
    <Summary />
    </div>
  )
}

export default Step4
