import { useNavigate } from "react-router-dom"
import { useFormContext } from "../context/FormContext";
import { useState } from "react";
const Step1 = () => {
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters and spaces";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number"
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      navigate("/step-2");
    }
  }

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    setErrors((prevErrors) => ({...prevErrors, [field]: ""}));
  }

  return (
    <>
      <h1>Step 1: Personal Info</h1>
      <p>Please provide your name, email address, and phone number.</p>
      <form onSubmit={handleSubmit} className="step1-form">
        <div className="name-container">
          <label htmlFor="name">Name</label>
          <input 
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Stephen King"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="email-container">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            placeholder="e.g. stephenking@lorem.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="phone-container">
          <label htmlFor="phone-number">Phone Number</label>
          <input 
            type="tel" 
            id="phone-number"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <button type="submit">Next Step</button>
      </form>
    </>
  )
}

export default Step1
