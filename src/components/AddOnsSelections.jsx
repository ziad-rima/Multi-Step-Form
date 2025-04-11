import { useFormContext } from "../context/FormContext"
import CheckmarkSVG from "./CheckmarkSVG";
const AddOnsSelections = () => {
    
    const {formData, updateFormData, isYearly} = useFormContext();
    
    const addOns = [
        { 
            name: "Online service", 
            description: "Access to multiplayer games",
            monthlyPrice: 1,
            yearlyPrice: 10
        }, 
        {
            name: "Larger storage", 
            description: "Extra 1TB of cloud save",
            monthlyPrice: 2,
            yearlyPrice: 20
        },
        {
            name: "Customizable profile", 
            description: "Custom theme on your profile",
            monthlyPrice: 2,
            yearlyPrice: 20
        }
    ]
    
    const handleCheckbox = (addon) => {
        const isSelected = formData.addOns.some((item) => item.name === addon.name);
        
        const updatedAddons = isSelected 
        ? formData.addOns.filter((item) => item.name != addon.name)
        : [...formData.addOns, {
            name: addon.name,
            description: addon.description,
            monthlyPrice: addon.monthlyPrice,
            yearlyPrice: addon.yearlyPrice
        }];
        
        updateFormData({addOns: updatedAddons});
    }
    
    return (
        <div className="addons-selection-container">
            <div className="addons">
                {addOns.map((addon) => (
                    <div 
                    key={addon.name} 
                    className={`addon ${formData.addOns.some(item => item.name == addon.name) ? "selected-addon" : ""}`}
                    onClick={() => handleCheckbox(addon)}
                    >
                    <div className={`checkmark-container ${formData.addOns.some((item) => item.name === addon.name) ? "checked" : ""}`}>
                        <CheckmarkSVG />
                    </div>
                    <div className="name-description">
                        <h3 className="addon-name ubuntu-medium">{addon.name}</h3>
                        <p className="addon-description ubuntu-regular">{addon.description}</p>
                    </div>
                        <p className="addon-price ubuntu-regular">+${isYearly ? addon.yearlyPrice : addon.monthlyPrice}/{isYearly ? "yr" : "mo"}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AddOnsSelections
