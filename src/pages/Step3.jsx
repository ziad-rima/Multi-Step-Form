import { useNavigate } from "react-router-dom"
import AddOnsSelections from "../components/AddOnsSelections";
const Step3 = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Step 3: Pick Add-ons</h1>
      <p>Add-ons help enhance your gaming experience.</p>
      <AddOnsSelections />
      <button onClick={() => navigate("/step-4")}>Next Step</button>
      <button onClick={() => navigate("/step-2")}>Go Back</button>
    </>
  )
}

export default Step3
