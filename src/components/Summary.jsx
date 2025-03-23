import { useFormContext } from "../context/FormContext"
import { useNavigate } from "react-router-dom"
const Summary = () => {

    const navigate = useNavigate();
    const {formData, selectedPlan, isYearly} = useFormContext();
    
    const planPrice = isYearly ? selectedPlan.price * 10 : selectedPlan.price;

    const total = formData.addOns.reduce((acc, curr) => {
        return acc + (isYearly ? curr.price * 10 : curr.price);
    }, 0) + planPrice;
    
    return (
    <div className="finishing-up-container">
        <div className="selected-plan">
            <h3>{selectedPlan.name} ({isYearly ? "Yearly" : "Monthly"}) - ${planPrice}/{isYearly ? "yr" : "mo"}</h3>
            <button onClick={() => navigate("/step-2")}>Change</button>
        </div>
        <div className="selected-addons">
            {formData.addOns.length > 0 
            ? formData.addOns.map(addon => (
                <div key={addon.name} className="selected-addon">
                    <p>{addon.name} - +${isYearly ? addon.price * 10 : addon.price}/{isYearly ? "yr" : "mo"}</p>
                </div>
            ))
            : (
                <p>No add-on selected</p>
              )
            }
        </div>
        <div className="total-per-period">
            <p>Total (per {isYearly ? "year" : "month"}) - +${total}/{isYearly ? "yr" : "mo"}</p>
        </div>
    </div>
  )
}

export default Summary
