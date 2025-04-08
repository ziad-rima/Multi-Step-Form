import { useFormContext } from "../context/FormContext";
import { useEffect, useState } from "react";

const Step1 = ({ setIsValid, setIsStep1Complete }) => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const validate = () => {
    const requiredFields = ['name', 'email', 'phone'];
    let newErrors = {};
    let isValid = true;
  
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });

    if (formData.name && !/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters";
      isValid = false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (formData.phone && !/^\+?\d{1,3}?[-.\s]?\d{3,5}[-.\s]?\d{3,5}[-.\s]?\d{3,5}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
      isValid = false;
    }

    return {isValid, newErrors};
  };

  useEffect(() => {
    const allFieldsFilled = ['name', 'email', 'phone'].every(
      field => formData[field]?.trim()
    );
    const {isValid} = validate();
    setIsStep1Complete(allFieldsFilled && isValid);
  }, [formData]);

  useEffect(() => {
    const {isValid, newErrors} = validate();
    setIsValid(isValid);
    const touchedErrors = Object.keys(newErrors).reduce((acc, key) => {
      if (touched[key]) {
        acc[key] = newErrors[key];
      }
      return acc;
    }, {});
    setErrors(touchedErrors);
  }, [formData, touched]);

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleBlur = (field) => {
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

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
              placeholder="e.g. Stephen King"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className="form-input"
            />
          </div>
          {(touched.name) && errors.name && (
            <p className="error ubuntu-medium">{errors.name}</p>
          )}
        </div>

        <div className="input-container">
          <label className="label ubuntu-medium" htmlFor="email">Email Address</label>
          <div className="input-div ubuntu-medium">
            <input
              type="email"
              id="email"
              placeholder="e.g. stephenking@lorem.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className="form-input"
            />
          </div>
          {(touched.email) && errors.email && (
            <p className="error ubuntu-medium">{errors.email}</p>
          )}
        </div>

        <div className="input-container">
          <label className="label ubuntu-medium" htmlFor="phone">Phone Number</label>
          <div className="input-div ubuntu-medium">
            <input
              type="tel"
              id="phone"
              placeholder="e.g. +1 234 567 890"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              className="form-input"
            />
          </div>
          {(touched.phone) && errors.phone && (
            <p className="error ubuntu-medium">{errors.phone}</p>
          )}
        </div>
      </form>
    </div>
  );
};
export default Step1;