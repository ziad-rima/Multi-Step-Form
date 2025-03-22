import { useFormContext } from "../context/FormContext"

const AddOnsSelections = () => {

    const {formData, updateFormData, isYearly} = useFormContext();

    const addOns = [
        { 
            name: "Online service", 
            description: "Access to multiplayer games",
            price: isYearly ? 10 : 1,
        }, 
        {
            name: "Larger storage", 
            description: "Extra 1TB of cloud save",
            price: isYearly ? 20 : 2,
        },
        {
            name: "Customizable profile", 
            description: "Custom theme on your profile",
            price: isYearly ? 20 : 2,
        }
    ]

    const handleCheckbox = (addon) => {
        const isSelected = formData.addOns.some((item) => item.name === addon.name);
        const updatedAddons = isSelected 
            ? formData.addOns.filter((item) => item.name != addon.name)
            : [...formData.addOns, addon];

        updateFormData({addOns: updatedAddons});
    }

    return (
    <div className="addons-selection-container">
        <div className="addons">
            {addOns.map((addon) => (
                <div 
                    key={addon.name} 
                    className="addon"
                    onClick={() => handleCheckbox(addon)}
                    style={{
                        border: formData.addOns.some((item) => item.name === addon.name) ? "2px solid blue" : "1px solid gray",
                        padding: "10px",
                        cursor: "pointer"
                    }}
                >
                   <h3>{addon.name}</h3>
                   <p>{addon.description}</p>
                   <p>+${addon.price}/{isYearly ? "yr" : "mo"}</p>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default AddOnsSelections
