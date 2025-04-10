import ThankYouSVG from "./ThankYouSVG"

const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <ThankYouSVG />
      <div className="step5-header">
        <h1 className="step5-header-title ubuntu-bold">Thank you!</h1>
        <p className="step5-header-par ubuntu-regular">Thanks for confirming your subscription! We hope you have fun 
    using our platform. If you ever need support, please feel free 
    to email us at support@loremgaming.com.</p>
      </div>
    </div>
  )
}

export default ThankYou
