import './SuccessModal.css'
import { useNavigate } from "react-router"
const SuccessModal=({setOpenSuccessModal,setOpenCheckout})=>{
    const navigate = useNavigate();

    const BackToShop=(e)=>{
        e.preventDefault()
        setOpenSuccessModal(false);
        setOpenCheckout(false);
        navigate('/workshops');
    }
    return(
        <div className="success-container">
            <h1>Thank you!</h1>
            <p>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.</p>
            <button className='success-button' onClick={e=>BackToShop(e)}>Back to shop</button>
        </div>
    )
}
export default SuccessModal;


