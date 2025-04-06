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
