import { useFormContext } from "../context/FormContext"

const PlanSelection = () => {
  
    const {selectedPlan, setSelectedPlan, isYearly, toggleBilling} = useFormContext();
  
    const plans = [
        {name: "Arcade", monthlyPrice: 9, yearlyPrice: 90},
        {name: "Advanced", monthlyPrice: 12, yearlyPrice: 120},
        {name: "Pro", monthlyPrice: 15, yearlyPrice: 150},
    ];

    const handlePlanChange = (plan) => {
        setSelectedPlan({
            name: plan.name,
            price: isYearly ? plan.yearlyPrice : plan.monthlyPrice,
        });
    };

    return (
    <div className="plan-selection-container">
        <div className="plans">
            {plans.map((plan) => (
            <div key={plan.name} className="single-plan">
                <input 
                    type="radio"
                    name="plan"
                    checked={selectedPlan.name === plan.name}
                    onChange={() => handlePlanChange(plan)}
                />
                <label>{plan.name} - ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}/{isYearly ? "yr" : "mo"}</label>
            </div>
            ))}
        </div>

        <div className="toggle-plan-container">
            <span>Monthly</span>
            <button onClick={toggleBilling}>{isYearly ? "Switch to Monthly" : "Switch to Yearly"}</button>
            <span>Yearly</span>
        </div>
    </div>
  )
}

export default PlanSelection
