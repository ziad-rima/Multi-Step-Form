# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot

![](./screenshot.jpg)


### Links

- []()
- []()

## My process

- For this project, I implemented new (and relatively advanced) methods, like React Router and Context API. 

- **React Router**:
- React Router helps us navigate between different steps (pages) in our multi-step form. Instead of showing/hiding components manually (conditional rendering), we'll define routes for each step and navigate between them.
- Each step will be a separate "page" with its own route (`/step-1`, `/step-2`, etc.).
- I'll add "Next Step" and "Go Back" buttons to navigate between these pages.
- And if the user refreshes the page, they stay on the same step instead of losing progress.

- **Context API**:
- The Context API allows us to store form data in one place and access it from any component without passing props manually. 
- I'll use Context API because:
  - Each step collects different pieces of data (name, email, selected plan, etc.).
  - We need to remember this data across all steps.
  - On the final step, we need to display a summary of everything the user entered.

- I'll create a **FormContext** that holds all form data.
- Each step will update this shared state.
- The final step will retrieve all the data and display it.

- I started by installing React Router by running the command `npm install react-router-dom` in the terminal.
- Then, in `main.jsx`, I wrapped the `App` component with `BrowserRouter`:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
  </StrictMode>
)
```

- Then, I set up `App.jsx` to test if our navigation worked fine:
```jsx
import { Routes, Route, Navigate } from "react-router-dom"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/step-1"/>} />
      <Route path="/step-1" element={<div>Step 1: Personal Info</div>} />
      <Route path="/step-2" element={<div>Step 2: Select Plan</div>} />
      <Route path="/step-3" element={<div>Step 3: Pick Add-ons</div>} />
      <Route path="/step-4" element={<div>Step 4: Review & Confirm</div>} />
      <Route path="/thank-you" element={<div>Step 5: Thank You!</div>} />
    </Routes>
  )
}
export default App
```

- Next, I created a `/pages` folder in `src` that would hold all five files (`step-1` to `step-5`).
- Inside `/pages`, I created 5 files:
  - `Step1.jsx`
  - `Step2.jsx`
  - `Step3.jsx`
  - `Step4.jsx`
  - `Step5.jsx`
- Where each file had a basic placeholder temporarily:
- `Step1.jsx`:
```jsx
const Step1 = () => {
  return (
    <h1>
      Step 1: Personal Info
    </h1>
  )
}
export default Step1
```

- I changed `App.jsx` accordingly:
```jsx
import { Routes, Route } from "react-router-dom"
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Step4 from "./pages/Step4";
import Step5 from "./pages/Step5";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Step1 />} />
      <Route path="/step-2" element={<Step2 />} />
      <Route path="/step-3" element={<Step3 />} />
      <Route path="/step-4" element={<Step4 />} />
      <Route path="/step-5" element={<Step5 />} />
    </Routes>
  )
}
export default App
```

- Next thing, I added navigation between steps using React Router's `useNavigate` hook.
- Each step should have a "Next Step" and "Go Back" buttons (except Step 1 and Step 5).

- Inside each step component, I imported `useNavigate` to handle navigation:
- `Step1.jsx`:
```jsx
import { useNavigate } from "react-router-dom"

const Step1 = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Step 1: Personal Info</h1>
      <button onClick={() => navigate("/step-2")}>Next Step</button>
    </>
  )
}
export default Step1
```
- `Step-2`:
```jsx
import { useNavigate } from "react-router-dom"
const Step2 = () => {
  const navigate = useNavigate();  
  return (
    <>
      <h1>Step 2: Select Plan</h1>
      <button onClick={() => navigate("/step-3")}>Next Step</button>
      <button onClick={() => navigate("/")}>Go Back</button>
    </>
    )
  }
export default Step2
```

- Next thing, I implemented the React Context functionality to store user's input across multiple steps:
- I created a `context` folder inside `/src`. And inside it, I created a file `FormContext.jsx`:
```jsx
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
```
- Breakdown:
  - `FormContext` is a shared storage that any component can access.
  - `export const useFormContext = () => useContext(FormContext);` is a shortcut that allows any component to easily access the shared storage.
  - `export const FormProvider = ({ children }) => { ... }` wraps the entire app and gives all components access to the stored data. (Storage Manager).
  - `<FormContext.Provider value={{ formData, updateFormData }}>{children}</FormContext.Provider>`, this makes `formData` and `updateFormData` available to all components.

- Next, I wrapped `App` with `FormProvider`, any component inside `FormProvider` can access `FormContext`:
- `main.jsx`:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import { FormProvider } from './context/FormContext.jsx'
import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FormProvider>
        <App />
      </FormProvider>
    </BrowserRouter> 
  </StrictMode>
)
```
- I tested it and it worked, it successfully saved the name after clicking `Next Step`:
- `Step1.jsx`:
```jsx
import { useNavigate } from "react-router-dom"
import { useFormContext } from "../context/FormContext";
const Step1 = () => {
  const { formData, updateFormData } = useFormContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateFormData({[e.target.name]: e.target.value});
  }

  return (
    <>
      <h1>Step 1: Personal Info</h1>
      <label htmlFor="name">Name</label>
      <input 
        type="text"
        id="name"
        name="name"
        placeholder="e.g. Stephen King"
        value={formData.name}
        onChange={handleChange}
      />
      <button onClick={() => navigate("/step-2")}>Next Step</button>
    </>
  )
}
export default Step1
```

- Next thing, I added some state variables in `FormContext` that are related to the plan selected in step 2.

- `FormContext.jsx`:
```jsx
...
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
...
```
- I created a `PlanSelection.jsx` component that holds the logic behind choosing a plan:
- `PlanSelection.jsx`:
```jsx
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
```

- Moving on to add-ons, I created a component `AddOnsSelections.jsx`, where I imported the `formData`, `updateFormData`, and `isYearly` states from the `FormContext` component, I declared an array of objects where each object defines a single addon by its name, description, and price. The price is set based on the selected plan (monthly or yearly):
- `AddOnsSelections.jsx`:
```jsx
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
``` 
- I then mapped over this array of objects and rendered each item:
```jsx
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
```
- When an item (an addon) is selected, it calls `handleCheckbox()` function, which checks whether the addon is already selected or not (to avoid duplicates). So if the item is already in the array but the user clicked it anyway, this means he's deselecting it. This function then successfully updates the `addOns` array in the `FormContext`:
```jsx
const handleCheckbox = (addon) => {
    const isSelected = formData.addOns.some((item) => item.name === addon.name);
    const updatedAddons = isSelected 
      ? formData.addOns.filter((item) => item.name != addon.name)
      : [...formData.addOns, addon];
    updateFormData({addOns: updatedAddons});
}
```
- I also removed `updateAddons()` function in `FormContext` as it serves nothing anymore. 

- Next step, the summary. I created a component named `Summary.jsx` that displays:
  - The selected plan (monthly or yearly).
  - The selected addons and the price based on the plan.
  - The total price.

- I started by importing and calculating the price based on the selected plan:
- `Summary.jsx`:
```jsx
const navigate = useNavigate();
const {formData, selectedPlan, isYearly} = useFormContext();
    
const planPrice = isYearly ? selectedPlan.price * 10 : selectedPlan.price;

const total = formData.addOns.reduce((acc, curr) => {
  return acc + (isYearly ? curr.price * 10 : curr.price);
}, 0) + planPrice;
```

- Then I rendered the initial version of the page (as I did for the rest of the pages):
```jsx
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
```

- The step 5 isn't a page, it's just a "Thank you!" note. So I created a component named "ThankYou.jsx":
- `ThankYou.jsx`:
```jsx
const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <h1>Thank you!</h1>
      <p>Thanks for confirming your subscription! We hope you have fun 
  using our platform. If you ever need support, please feel free 
  to email us at support@loremgaming.com.</p>
    </div>
  )
}
export default ThankYou
```
- And I imported it in Step5.

- Now, to validation:
- `Step1.jsx`:
- I started by creating a function `validate()` that has an object `newErrors` which contains the errors we're keeping track of:
```jsx
const [errors, setErrors] = useState({});

const validate = () => {
  let newErrors = {}

  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
    newErrors.name = "Name must contain only letters and spaces";
  }

  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Enter a valid email address";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (!/^\d{10,15}$/.test(formData.phone)) {
    newErrors.phone = "Enter a valid phone number"
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}
```
- This function returns `true` or `false` based on whether we have any errors in the `newErrors` object.
- I then created the form:
```jsx
<form onSubmit={handleSubmit} className="step1-form">
  <div className="name-container">
    <label htmlFor="name">Name</label>
      <input 
        type="text"
        id="name"
        name="name"
        placeholder="e.g. Stephen King"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />
      {errors.name && <p className="error">{errors.name}</p>}
    </div>

    <div className="email-container">
      <label htmlFor="email">Email Address</label>
      <input 
        type="email" 
        id="email"
        name="email"
        placeholder="e.g. stephenking@lorem.com"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}
    </div>

    <div className="phone-container">
      <label htmlFor="phone-number">Phone Number</label>
      <input 
        type="tel" 
        id="phone-number"
        name="phone"
        value={formData.phone}
        onChange={(e) => handleInputChange("phone", e.target.value)}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}
    </div>
  <button type="submit">Next Step</button>
</form>
```
- the `onChange()` attribute calls `handleInputChange()` function which takes in two arguments, `field` and `value`. This function updates the `formData` and removes the error if the user starts typing:
```jsx
const handleInputChange = (field, value) => {
  updateFormData({ [field]: value });
  setErrors((prevErrors) => ({...prevErrors, [field]: ""}));
}
```  
- Finally, I created `handleSubmit()` function:
```jsx
const handleSubmit = (e) => {
  e.preventDefault();

  if (validate()) {
    navigate("/step2");
  }
}
```

- Next functionality I implemented was the `localStorage` where:
  - I created a function inside `FormContext` named `getSavedData()` which:
    - Takes in two arguments, the key (which is the data) and the default value of that data.
    - Checks the local storage for the data (key).
    - It retrieves and stores it in `savedData`.
    - Then we return `savedData` if it exists, otherwise we return the default value.
```jsx
const getSavedData = (key, defaultValue) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : defaultValue;
};
```
- We use this function to load the previous data if it exists from the local storage and set it as a value to the input. Otherwise, we set the input to the default value. 
- For example, `formData` is handled like this:
```jsx
const [formData, setFormData] = useState(() => getSavedData("formData", {
  name: "",
  email: "",
  phone: "",
  addOns: [],
}));
``` 
- Where `"formData"` is the `key` and the object with the empty properties (`name`, `email`,`phone`,`addOns`) is the default value of `formData`.

- One last thing is to actually store the data in `localStorage`:
- Using `useEffect()`, each time the user changes the input, this effect runs:
```jsx
useEffect(() => {
  localStorage.setItem("formData", JSON.stringify(formData));
}, [formData])
```
- `JSON.stringify()` because `localStorage` can only store strings.

- This way, we can ensure that each time the user updates a field or selects a plan, it gets saved automatically.

- Next thing, I created a step tracker component that tells the user which step they're currently in.
- `StepTracker.jsx`:
```jsx
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
```
- I then included `StepTracker` in `App.jsx`:
```jsx
import { Routes, Route } from "react-router-dom"
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Step4 from "./pages/Step4";
import Step5 from "./pages/Step5";
import StepTracker from "./components/StepTracker";
const App = () => {
  return (
    <div>
      <StepTracker />
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/step-2" element={<Step2 />} />
        <Route path="/step-3" element={<Step3 />} />
        <Route path="/step-4" element={<Step4 />} />
        <Route path="/step-5" element={<Step5 />} />
      </Routes>
    </div>
  )
}
export default App
```

- I decided to take a slightly different approach for the "Next Step" and "Go Back" buttons. I put them in their own components and imported them inside `App.jsx`.

- `NextButton.jsx`:
```jsx
const NextButton = ({ handleNext, disabled }) => {
    return (
        <button 
            className={`next-button ubuntu-medium ${disabled ? 'disabled' : ''}`} 
            onClick={handleNext}
            disabled={disabled}
        >
            Next Step
        </button>
    );
};
export default NextButton;
```
- `BackButton.jsx`:
```jsx
import { useNavigate } from "react-router-dom"
const BackButton = ({prevStep}) => {
    const navigate = useNavigate();
    return (
        <button className="back-button ubuntu-medium" onClick={() => navigate(prevStep)}>
        Go Back
        </button>
    )
}
export default BackButton
```
- `App.jsx`:
```jsx
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Step4 from "./pages/Step4";
import Step5 from "./pages/Step5";
import StepTracker from "./components/StepTracker";
import NextButton from "./components/NextButton";
import BackButton from "./components/BackButton";

const steps = ["/", "/step-2", "/step-3", "/step-4", "/step-5"];

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = steps.indexOf(location.pathname);

  const [isValid, setIsValid] = useState(false);
  const [isStep1Complete, setIsStep1Complete] = useState(false);

  const handleNext = () => {
    if (currentIndex === 0) {
      if (!isStep1Complete) return;
    }
    navigate(steps[currentIndex + 1]);
  };

  return (
    <div className="main-container">
      <StepTracker />
      <div className="step-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Step1 
                setIsValid={setIsValid}
                setIsStep1Complete={setIsStep1Complete}
              />
            } 
          />
          <Route path="/step-2" element={<Step2 />} />
          <Route path="/step-3" element={<Step3 />} />
          <Route path="/step-4" element={<Step4 />} />
          <Route path="/step-5" element={<Step5 />} />
        </Routes>
      </div>
      
      <div className="step-footer">
        {currentIndex > 0 && currentIndex < steps.length - 1 && <BackButton prevStep={steps[currentIndex - 1]} />}
        {currentIndex < steps.length - 1 && (
          <NextButton 
            handleNext={handleNext}
            disabled={currentIndex === 0 ? !isStep1Complete : false}
        />
        )}
      </div>
    </div>
  );
};
export default App;
```
- `Step1.jsx`:
```jsx
import { useFormContext } from "../context/FormContext";
import { useEffect, useState } from "react";

const Step1 = ({ setIsValid, setIsStep1Complete }) => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const validate = () => {
    const requiredFields = ['name', 'email', 'phone'];
    let newErrors = {};
    let isValid = true;
  
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      }
    });

    if (formData.name && !/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters";
      isValid = false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (formData.phone && !/^\+?\d{1,3}?[-.\s]?\d{3,5}[-.\s]?\d{3,5}[-.\s]?\d{3,5}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
      isValid = false;
    }

    return {isValid, newErrors};
  };

  useEffect(() => {
    const allFieldsFilled = ['name', 'email', 'phone'].every(
      field => formData[field]?.trim()
    );
    const {isValid} = validate();
    setIsStep1Complete(allFieldsFilled && isValid);
  }, [formData]);

  useEffect(() => {
    const {isValid, newErrors} = validate();
    setIsValid(isValid);
    const touchedErrors = Object.keys(newErrors).reduce((acc, key) => {
      if (touched[key]) {
        acc[key] = newErrors[key];
      }
      return acc;
    }, {});
    setErrors(touchedErrors);
  }, [formData, touched]);

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleBlur = (field) => {
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  return (
    <div className="step1-container">
      <div className="step1-header">
        <h1 className="step1-header-title ubuntu-bold">Personal Info</h1>
        <p className="step1-header-par ubuntu-regular">Please provide your name, email address, and phone number.</p>
      </div>
      <form className="step1-form">
        <div className="input-container">
          <label className="label ubuntu-medium" htmlFor="name">Name</label>
          <div className="input-div ubuntu-medium">
            <input
              type="text"
              id="name"
              placeholder="e.g. Stephen King"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
            />
          </div>
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
        </div>

        <div className="input-container">
          <label className="label ubuntu-medium" htmlFor="email">Email Address</label>
          <div className="input-div ubuntu-medium">
            <input
              type="email"
              id="email"
              placeholder="e.g. stephenking@lorem.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
            />
          </div>
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>

        <div className="input-container">
          <label className="label ubuntu-medium" htmlFor="phone">Phone Number</label>
          <div className="input-div ubuntu-medium">
            <input
              type="tel"
              id="phone"
              placeholder="e.g. +1 234 567 890"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
            />
          </div>
          {touched.phone && errors.phone && (
            <p className="error">{errors.phone}</p>
          )}
        </div>
      </form>
    </div>
  );
};
export default Step1;
```
- This block of code ensures that we only get full validation feedback when needed (after user interacts). Also, we avoid annoying behavior (flickering, premature error messages):
```jsx
useEffect(() => {
    const {isValid, newErrors} = validate();
    setIsValid(isValid);
    const touchedErrors = Object.keys(newErrors).reduce((acc, key) => {
      if (touched[key]) {
        acc[key] = newErrors[key];
      }
      return acc;
    }, {});
    setErrors(touchedErrors);
  }, [formData, touched]);
```
- To disable the next button in step 1, I applied the following CSS:
```css
.next-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

- I did the styling as usual, one thing I'd like to talk about is the way I styled the toggle switch on the plan selection page:
- `PlanSelection.jsx`:
```jsx
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
```
- CSS:
```css
.toggle-plan-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--Magnolia);
  margin: 2rem 0;
  padding: 1rem 2rem;
  border-radius: 0.8rem;
}

.toggle-plan-container .span-month {
  margin-left: 2rem;
  font-size: 1.4rem;
  color: var(--Cool-gray);
  transition: color .3s;
}

.toggle-plan-container .span-year {
  margin-right: 2rem;
  font-size: 1.4rem;
  color: var(--Cool-gray);
  transition: color .3s;
}

.toggle-plan-container .is-active {
  color: var(--Marine-blue);
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--Marine-blue); 
  border-radius: 34px;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.switch input:checked + .slider {
  background-color: var(--Marine-blue);
}

.switch input:checked + .slider:before {
  transform: translateX(26px);
}
```

- I did a similar thing in step 3 with the checkmark. First I created the svg component for the checkmark:
- The way to do this is by wrapping the svg with a container that would be later styled based on whether the addon was selected or not (by changing the background color). The svg is just a transparent checkmark, by wrapping it in a square container, we make sure that when we change the background color of the container to something like purple, the checkmark (svg) will appear.
- `AddOnsSelections.jsx`:
```jsx
...
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
              <p className="addon-price ubuntu-regular">+${addon.price}/{isYearly ? "yr" : "mo"}</p>
          </div>
      ))}
    </div>
  </div>
)
...
```
- CSS:
```css
.checkmark-container {
  width: 20px;
  height: 20px;
  border: 1px solid var(--Cool-gray);
  border-radius: .4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--White);
  transition: background-color .2s ease, border-color .2s ease;
}

.checked {
  background-color: var(--Purplish-blue);
}
```
### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

- The first thing I learned in this project was that it's generally better to finish the functionality first, then move to styling for a few reasons:
  - To avoid wasting time on unused styles, meaning if the logic changes, I might have to redo some styling.
  - To focus on core features, ensuring everything works correctly before making it look good.
  - To debug faster, because it is easier to spot issues without worrying about CSS affecting the layout.
- So, a good approach would be:
  - Step 1: Get all the core functionality working (form handling, navigation, validation).
  - Step 2: Once the logic is solid, refine the UI with styles. 

- Another important concept I needed to write down is `localStorage`, which is a method to store user's data so it won't be lost after a page refresh for example. I implemented this in `FormContext.jsx` component this way:
  - Loading saved data when the app starts.
    - Meaning when the app loads, we check if there's any saved form data in `localStorage` and use it to set the initial state (using `useEffect()`).
  - Saving data when user updates their input.
    - Meaning every time the user makes a change, we save it in `localStorage` so the data is always saved.

- `NavLink`: A special React Router component that creates a navigation link.
- `useLocation`: A React Router hook that gives us access to the current URL's details.

### Continued development


### Useful resources


## Author

- GitHub - [ziad-rima](https://github.com/ziad-rima)
- Frontend Mentor - [@ziad-rima](https://www.frontendmentor.io/profile/ziad-rima)
- X - [@rima4082](https://x.com/rima4082)

