import { useNavigate } from "react-router-dom"
import { useFormContext } from "../context/FormContext";
const Step1 = () => {
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateFormData({[e.target.name]: e.target.value});
  }

  return (
    <>
      <h1>Step 1: Personal Info</h1>
      <p>Please provide your name, email address, and phone number.</p>

      <label htmlFor="name">Name</label>
      <input 
        type="text"
        id="name"
        name="name"
        placeholder="e.g. Stephen King"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="email">Email Address</label>
      <input 
        type="email" 
        id="email"
        name="email"
        placeholder="e.g. stephenking@lorem.com"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="phone-number">Phone Number</label>
      <input 
        type="tel" 
        id="phone-number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <button onClick={() => navigate("/step-2")}>Next Step</button>
    </>
  )
}

export default Step1
