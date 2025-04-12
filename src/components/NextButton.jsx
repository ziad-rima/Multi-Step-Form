const NextButton = ({ handleNext, disabled, confirm }) => {
    return (
        <button 
            className={`next-button ubuntu-medium ${disabled ? 'disabled' : ''}`} 
            onClick={handleNext}
            disabled={disabled}
        >
            {confirm ? "Confirm" : "Next Step"}
        </button>
    );
};
export default NextButton;