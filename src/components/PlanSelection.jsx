import { useFormContext } from "../context/FormContext"
import ArcadeSVG from "./ArcadeSVG";
import AdvancedSVG from "./AdvancedSVG";
import ProSVG from "./ProSVG";
const PlanSelection = () => {
  
    const {selectedPlan, setSelectedPlan, isYearly, toggleBilling} = useFormContext();
  
    const plans = [
        {name: "Arcade", monthlyPrice: 9, yearlyPrice: 90, icon: <ArcadeSVG />},
        {name: "Advanced", monthlyPrice: 12, yearlyPrice: 120, icon: <AdvancedSVG />},
        {name: "Pro", monthlyPrice: 15, yearlyPrice: 150, icon: <ProSVG />},
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
                    className="plan-selection-input"
                />
                <div className="icon">
                    {plan.icon}
                </div>
                <div className="label-plan">
                <label htmlFor={plan.name} className="label-of-plan ubuntu-medium">
                    {plan.name}
                </label>
                    <p className="plan ubuntu-regular">${isYearly ? plan.yearlyPrice : plan.monthlyPrice}/{isYearly ? "yr" : "mo"}</p>

                </div>
                {isYearly && <p className="free-months ubuntu-medium">2 months free</p>}
            </div>
            ))}
        </div>

        <div className="toggle-plan-container">
            <span className={`span-month ubuntu-medium ${!isYearly ? "is-active" : ""}`}>Monthly</span>

            <label className="switch">
                <input
                type="checkbox"
                checked={isYearly}
                onChange={toggleBilling}
                />
                <span className="slider" />
            </label>

            <span className={`span-year ubuntu-medium ${isYearly ? "is-active" : ""}`}>Yearly</span>
        </div>
    </div>
  )
}

export default PlanSelection
