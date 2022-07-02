import './Checkout.css'
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import { faX} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Checkout=({setOpenCheckout})=>{
    const HandleClose=()=>{
        setOpenCheckout(false);
    }
    return(
        <div className="checkout-container">
            <div className="checkout">
                <div className='checkout-header' style={{width:"100%"}}>
                    <div className='checkout-header-title'>
                        <h1>Checkout</h1>
                        <FontAwesomeIcon icon={faX} onClick={HandleClose}/>
                    </div>
                    <p>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.</p>
                </div>
                <CheckoutForm setOpenCheckout={setOpenCheckout}/>
            </div>
        </div>
    )
}
export default Checkout;