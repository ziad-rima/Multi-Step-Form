import { createContext, useContext, useState } from "react";

const FormContext = createContext();

// Custom hook to use the context
export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        addOns: [],
    });

    const [selectedPlan, setSelectedPlan] = useState({
        name: "Arcade",
        price: 9,
    });

    const [isYearly, setIsYearly] = useState(false);

    // Toggle between Monthly/Yearly
    const toggleBilling = () => {
        setIsYearly((prev) => !prev);
    };

    // Function to update form data
    const updateFormData = (newData) => {
        setFormData((prevData) => ({ ...prevData, ...newData }));
    };

    // Function to update add-ons
    const updateAddOns = (newAddOns) => {
        setFormData((prevData) => ({ ...prevData, addOns: newAddOns }));
    };

    return (
        <FormContext.Provider value={{
            formData,
            updateFormData,
            selectedPlan,
            setSelectedPlan,
            isYearly,
            toggleBilling,
            updateAddOns
        }}>
            {children}
        </FormContext.Provider>
    );
};
