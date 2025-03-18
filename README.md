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


### Continued development


### Useful resources


## Author

- GitHub - [ziad-rima](https://github.com/ziad-rima)
- Frontend Mentor - [@ziad-rima](https://www.frontendmentor.io/profile/ziad-rima)
- X - [@rima4082](https://x.com/rima4082)

