import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays,faClock,faPaintBrush, faBolt, faCode, faDisplay, faIcons } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useAppDispatch,useAppSelector } from '../../redux/hooks'
import { added_to_cart } from '../../redux/Slices/cart'
import { set_cart_open } from '../../redux/Slices/openCart'
import dateformat from 'dateformat'
import { i18n } from "dateformat"
import { useState } from 'react'
import InfoModal from '../../modules/InfoModal/InfoModal'
import './WorkshopCard.css'
i18n.dayNames = [
    "Ned",
    "Pon",
    "Uto",
    "Sri",
    "Čet",
    "Pet",
    "Sub",
    "Nedjelja",
    "Ponedjeljak",
    "Utorak",
    "Srijeda",
    "Četvrtak",
    "Petak",
    "Subota",
]; 
//for storing in redux but not the whole workshop 
type InitialValues={
    id:number,
    title:string
    image:string
    count:number
    price:number
}
const WorkshopCard=({workshop})=>{
    let date=dateformat(workshop.date, "ddd dd.mm.yyyy");
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
        <div className="card-container">
            <div className='card-header'>
                <Link to={`/workshops/${workshop.id}`}>
                    <img src={workshop.imageUrl} alt={workshop.title} className="workshop-image" />
                </Link>   
            </div>
            <div className='card-body'>
                <div className='card-workshop-time'>
                    <FontAwesomeIcon icon={faCalendarDays} className="card-icon" size='lg'/>
                    <p className="card-date">{date}</p>
                    <FontAwesomeIcon icon={faClock} size='lg' className="card-icon"/>
                    <p>{time}</p>
                    <div className='card-workshop-icon-div'>
                        <FontAwesomeIcon icon={getCategoryIcon()} size="lg" className="category-icon" />
                    </div>          
                </div>
                <Link to={`/workshops/${workshop.id}`} style={{textDecoration:"none"}}>
                    <p className='card-workshop-title'>{workshop.title}</p>
                </Link> 
                <p className='card-workshop-price'>{workshop.price},00 €</p>
                <button className='workshop-buy-button' onClick={e=>AddToBasket(workshop)}>Dodaj u košaricu</button>
            </div>
        </div>
        {openInfoModal&&<InfoModal setOpenInfoModal={setOpenInfoModal}/>}
        </>
    )
}
export default WorkshopCard;