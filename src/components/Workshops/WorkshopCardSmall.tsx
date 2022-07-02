import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays,faClock,faPaintBrush, faBolt, faCode, faDisplay,faCartShopping,faIcons} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import dateformat from 'dateformat'
import { useAppDispatch,useAppSelector } from '../../redux/hooks'
import {added_to_cart} from '../../redux/Slices/cart'
import {set_cart_open} from '../../redux/Slices/openCart'
import InfoModal from '../../modules/InfoModal/InfoModal'
import { useState } from 'react'
import './WorkshopCardSmall.css'
//for storing in redux but not the whole workshop 
type InitialValues={
    id:number,
    title:string
    image:string
    count:number
    price:number
}
const WorkshopCardSmall=({workshop})=>{
    let date=dateformat(workshop.date, "ddd dd.mm.yyyy.");
    let time=dateformat(workshop.date, "HH:MM");
    const dispatch=useAppDispatch();
    const tempArray= useAppSelector( (store)=>store.cart.cart);
    const [openInfoModal,setOpenInfoModal]=useState(false);

    const item:InitialValues={
        id:null,
        title:"",
        image:"",
        count:1,
        price:0,
    }
    const getCategoryIcon=()=>{
        switch(workshop.category){
            case 'marketing':
                return faBolt;
            case 'design':
                return faPaintBrush;
            case 'frontend':
                return faDisplay
            case 'backend':
                return faCode
            default:
                return faIcons
        }
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
        item.count=1;
        item.price=workshop.price;
        
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
        <div className="card-container-small">
            <div className='card-header-small'>
                <Link to={`/workshops/${workshop.id}`}>
                    <img src={workshop.imageUrl} alt={workshop.title} className="workshop-image-small" />
                </Link>   
            </div>
            <div className='card-body-small'>
                <div className='card-workshop-time-small'>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <FontAwesomeIcon icon={faCalendarDays} className="card-icon-small" size='lg'/>
                        <p className="card-date-small">{date}</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <FontAwesomeIcon icon={faClock} size='lg' className="card-icon-small"/>
                        <p>{time}</p>
                    </div>
                    <div className='card-workshop-icon-div-small'>
                        <FontAwesomeIcon icon={getCategoryIcon()} size="lg" className="category-icon-small" />
                    </div>                     
                </div>
                <Link to={`/workshops/${workshop.id}`} style={{textDecoration:"none"}}>
                    <p className='card-workshop-title-small'>{workshop.title}</p>
                </Link>
                <div className='card-workshop-price-container'>
                     <p className='card-workshop-price-small'>{workshop.price},00 €</p>
                    <div className='card-cart-small' onClick={e=>AddToBasket(workshop)}>
                        <FontAwesomeIcon icon={faCartShopping} size='lg' />
                    </div>
                </div>
            </div>
        </div>
        {openInfoModal&&<InfoModal setOpenInfoModal={setOpenInfoModal}/>}
        </>
    )
}
export default WorkshopCardSmall;