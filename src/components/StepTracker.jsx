import { useLocation, useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";

const steps = [
  { path: "/", label: "1" },
  { path: "/step-2", label: "2" },
  { path: "/step-3", label: "3" },
  { path: "/step-4", label: "4" },
];

const StepTracker = () => {
  const location = useLocation();

  return (
    <div className="step-tracker ubuntu-medium">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step-circle ${
            location.pathname === step.path || 
            (location.pathname === "/step-5" && step.path === "/step-4") 
              ? "active" 
              : ""
          }`}
        >
          {step.label}
        </div>
      ))}
    </div>
  );
};

export default StepTracker;
