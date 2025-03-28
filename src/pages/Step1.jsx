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
    } else if (!/^\+?\d{1,3}?[-.\s]?\d{3,5}[-.\s]?\d{3,5}[-.\s]?\d{3,5}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number"
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = () => {
    if (validate()) {
      navigate("/step-2");
    }
  }

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
    setErrors((prevErrors) => ({...prevErrors, [field]: ""}));
  }

  return (
    <div className="step1-container">
      <div className="step1-header">
        <h1 className="step1-header-title ubuntu-bold">Personal Info</h1>
        <p className="step1-header-par ubuntu-regular">Please provide your name, email address, and phone number.</p>
      </div>
      <form className="step1-form">
        <div className="input-container">
          <label className="label ubuntu-medium" htmlFor="name">Name</label>
          <div className="input-div ubuntu-medium">
            <input 
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Stephen King"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="input-container">
          <label className="label ubuntu-medium" htmlFor="email">Email Address</label>
          <div className="input-div ubuntu-medium">
            <input 
              type="email" 
              id="email"
              name="email"
              placeholder="e.g. stephenking@lorem.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="input-container">
          <label className="label ubuntu-medium" htmlFor="phone-number">Phone Number</label>
          <div className="input-div ubuntu-medium">
            <input 
              type="tel" 
              id="phone-number"
              name="phone"
              placeholder="e.g. +1 234 567 890"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
      </form>
      <div className="step-footer">
        <button className="ubuntu-medium" onClick={handleSubmit}>Next Step</button>
      </div>
    </div>
  )
}

export default Step1
