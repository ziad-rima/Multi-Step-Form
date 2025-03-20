import { useNavigate } from "react-router-dom"
const Step4 = () => {
  const navigate = useNavigate();
  return (
    <>
    <h1>Step 4: Review & Confirm</h1>
    <button onClick={() => navigate("/step-5")}>Next Step</button>
    <button onClick={() => navigate("/step-3")}>Go Back</button>
    </>
  )
}

export default Step4
