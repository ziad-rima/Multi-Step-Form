import { useNavigate } from "react-router-dom"

const Step2 = () => {
  const navigate = useNavigate();  
  return (
    <>
      <h1>Step 2: Select Plan</h1>
      <button onClick={() => navigate("/step-3")}>Next Step</button>
      <button onClick={() => navigate("/")}>Go Back</button>
    </>
    )
  }
  
export default Step2
  