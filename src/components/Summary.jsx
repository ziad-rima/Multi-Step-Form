import { useFormContext } from "../context/FormContext"
import { useNavigate } from "react-router-dom"
const Summary = () => {

    const navigate = useNavigate();
    const {formData, selectedPlan, isYearly} = useFormContext();
    
    const planPrice = selectedPlan.price;

    const total = formData.addOns.reduce((acc, curr) => acc + curr.price, 0) + planPrice;
    
    return (
    <div className="finishing-up-container">
        <div className="plan-addons-container">
            <div className="selected-plan">
                <div className="plan-change">
                    <h3 className="plan-change-name ubuntu-medium">{selectedPlan.name} ({isYearly ? "Yearly" : "Monthly"})</h3>
                    <button className="plan-change-button ubuntu-regular" onClick={() => navigate("/step-2")}>Change</button>
                </div>
                <p className="plan-change-price ubuntu-medium">${planPrice}/{isYearly ? "yr" : "mo"}</p>
            </div>
            <hr />
            <div className="selected-addons">
                {formData.addOns.length > 0 
                ? formData.addOns.map(addon => (
                    <div key={addon.name} className="selected-addon">
                        <p className="summary-addon-name ubuntu-regular">{addon.name}</p>
                        <p className="summary-addon-price ubuntu-regular">+${addon.price}/{isYearly ? "yr" : "mo"}</p>
                    </div>
                ))
                : (
                    <p>No add-on selected</p>
                )
                }
            </div>
        </div>
        
        <div className="total-per-period">
            <p className="total-name ubuntu-regular">Total (per {isYearly ? "year" : "month"})</p>
            <p className="total-price ubuntu-regular">+${total}/{isYearly ? "yr" : "mo"}</p>
        </div>
    </div>
  )
}

export default Summary
