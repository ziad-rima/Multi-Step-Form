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
### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - For styles

### What I learned

- The first thing I learned in this project was that it's generally better to finish the functionality first, then move to styling for a few reasons:
  - To avoid wasting time on unused styles, meaning if the logic changes, I might have to redo some styling.
  - To focus on core features, ensuring everything works correctly before making it look good.
  - To debug faster, because it is easier to spot issues without worrying about CSS affecting the layout.
- So, a good approach would be:
  - Step 1: Get all the core functionality working (form handling, navigation, validation).
  - Step 2: Once the logic is solid, refine the UI with styles. 

### Continued development


### Useful resources


## Author

- GitHub - [ziad-rima](https://github.com/ziad-rima)
- Frontend Mentor - [@ziad-rima](https://www.frontendmentor.io/profile/ziad-rima)
- X - [@rima4082](https://x.com/rima4082)

