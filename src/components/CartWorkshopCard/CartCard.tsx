import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan} from '@fortawesome/free-solid-svg-icons';
import './CartCard.css'

const quantities=[1,2,3,4,5,6];

const CartCard=({card,editCartCard, deleteCartCard})=>{
    const HandleEdit=(event)=>{
        const value=parseInt(event.target.value);
        editCartCard({id:card.id,count:value,price:card.price,title:card.title,image:card.image})
    }
    const HandleDelete=()=>{
        deleteCartCard(card)
    }

    return(
        <div className="cart-card-container">
            <div className="cart-card-image">
                <img alt={card.title} src={card.image}></img>
            </div>
            <div className='cart-card-body'>
                <div className="cart-card-header">
                    <p>{card.title}</p>
                    <FontAwesomeIcon icon={faTrashCan} style={{color:"#7F7F7F"}} onClick={HandleDelete}/>
                </div>
                <div className='price-container'>
                    <select onChange={event=>HandleEdit(event)} defaultValue={card.count}>
                        {quantities.map((item)=><option key={item} value={item}>{item}</option>)}
                    </select>
                    <p>{card.price},00 €</p>
                </div>
            </div>
        </div>
    )
}
export default CartCard;