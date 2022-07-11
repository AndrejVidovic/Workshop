import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useAppDispatch,useAppSelector } from '../../redux/hooks'
import {added_to_cart} from '../../redux/Slices/cart'
import {set_cart_open} from '../../redux/Slices/openCart'
import InfoModal from '../../modules/InfoModal/InfoModal'
import './Cart.css'
const quantities=[1,2,3,4,5,6];
type InitialValues={
    id:number
    title:string
    image:string
    count:number
    price:number
}
const Cart=({workshop})=>{
    const [quantity,setQuantity]=useState(1);
    const [total,setTotal]=useState(workshop.price);
    const dispatch=useAppDispatch();
    const tempArray= useAppSelector( (store)=>store.cart.cart);
    const [openInfoModal,setOpenInfoModal]=useState(false);

    const item:InitialValues={
        id:0,
        title:"",
        image:"",
        count:1,
        price:0,
    }

    const GetQuantity=(event)=>{
        setQuantity(event.target.value)
    }
    //to remove duplicates
    const Found=tempArray.some(element=>{
        if(element.id===workshop.id){
            return true
        }
        return false
    })
    const AddToBasket=(workshop)=>{
        item.id=workshop.id
        item.title=workshop.title;
        item.image=workshop.imageUrl;
        item.count=quantity;
        item.price=workshop.price
        if(!Found){
            dispatch(added_to_cart(item));
            dispatch(set_cart_open(true));
            localStorage.setItem("cart",JSON.stringify([...tempArray,item]))
        }
        else{
            setOpenInfoModal(true);
        }
    }
    
    return(
        <>
        <div className="cart-container">
            <h4>Kupi svoju kartu</h4>
            <div className='cart-price'>
                <FontAwesomeIcon icon={faTag} size='2x' style={{color:"#0097CC"}}/>
                <h3>{workshop.price},00 </h3>
                <h5>€/karta</h5>
            </div>
            <div className='cart-quantity'>
                <select onChange={GetQuantity}>
                    {quantities.map((item)=><option key={item} value={item}>{item}</option>)}
                </select>
                <button onClick={e=>AddToBasket(workshop)}>Dodaj u košaricu</button>
            </div>
            <p>{quantity*workshop.price} € ukupno</p>
        </div>
        {openInfoModal&&<InfoModal setOpenInfoModal={setOpenInfoModal}/>}
        </>
    )
}
export default Cart;