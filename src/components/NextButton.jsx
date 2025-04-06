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