import { useLocation } from "react-router-dom";

const steps = [
  { path: "/", label: "1", header: "STEP 1", content: "YOUR INFO" },
  { path: "/step-2", label: "2", header: "STEP 2", content: "SELECT PLAN" },
  { path: "/step-3", label: "3", header: "STEP 3", content: "ADD-ONS" },
  { path: "/step-4", label: "4", header: "STEP 4", content: "SUMMARY" },
];

const StepTracker = () => {
  const location = useLocation();

  return (
    <div className="step-tracker ubuntu-medium">
      {steps.map((step, index) => (
        <div className="step">
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
          <div className="step-info">
            <p className="step-num">{step.header}</p>
            <p className="step-description">{step.content}</p>
          </div>
        </div>
      ))}

    </div>
  );
};

export default StepTracker;
