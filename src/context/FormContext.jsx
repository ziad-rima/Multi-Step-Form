import { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

// Custom hook to use the context
export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {

    const getSavedData = (key, defaultValue) => {
        const savedData = localStorage.getItem(key);
        return savedData ? JSON.parse(savedData) : defaultValue;
    };

    const [formData, setFormData] = useState(() => getSavedData("formData", {
        name: "",
        email: "",
        phone: "",
        addOns: [],
    }));

    const [selectedPlan, setSelectedPlan] = useState(() => getSavedData("selectedPlan", {
        name: "Arcade",
        monthlyPrice: 9,
        yearlyPrice: 90
    }));

    const [isYearly, setIsYearly] = useState(() => getSavedData("isYearly", false));

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData])

    useEffect(() => {
        localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
    }, []);

    useEffect(() => {
        localStorage.setItem("isYearly", JSON.stringify(isYearly));
    }, [])

    // Toggle between Monthly/Yearly
    const toggleBilling = () => {
        setIsYearly((prev) => !prev);
    };

    // Function to update form data
    const updateFormData = (newData) => {
        setFormData((prevData) => ({ ...prevData, ...newData }));
    };

    return (
        <FormContext.Provider value={{
            formData,
            updateFormData,
            selectedPlan,
            setSelectedPlan,
            isYearly,
            toggleBilling,
        }}>
            {children}
        </FormContext.Provider>
    );
};
