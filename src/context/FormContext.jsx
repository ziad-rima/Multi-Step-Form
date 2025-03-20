import { createContext, useContext, useState } from "react";

const FormContext = createContext();

// custom hook to use the context
export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({children}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        plan: "monthly", // this is the default plan
        selectedPlan: null, // arcade, advanced, pro
        addOns: [],
    });

    // function to update form data
    const updateFormData = (newData) => {
        setFormData((prevData) => ({...prevData, ...newData}));
    };
    
    return (
        <FormContext.Provider value={{formData, updateFormData}}>
            {children}
        </FormContext.Provider>
    )
}