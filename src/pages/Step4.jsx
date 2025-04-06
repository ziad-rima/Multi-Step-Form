import { useNavigate } from "react-router-dom"
import Summary from "../components/Summary";
const Step4 = () => {
  const navigate = useNavigate();
  return (
    <>
    <h1>Step 4: Review & Confirm</h1>
    <Summary />
    </>
  )
}

export default Step4
