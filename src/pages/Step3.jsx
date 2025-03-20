import { useNavigate } from "react-router-dom"

const Step3 = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Step 3: Pick Add-ons</h1>
      <button onClick={() => navigate("/step-4")}>Next Step</button>
      <button onClick={() => navigate("/step-2")}>Go Back</button>
    </>
  )
}

export default Step3
