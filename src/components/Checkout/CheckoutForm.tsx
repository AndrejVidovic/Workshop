import { useState } from 'react';
import SuccessModal from '../../modules/SuccessModal/SuccessModal';
import Validation from './Validation';
import './CheckoutForm.css';
import { useAppSelector } from '../../redux/hooks';
const genders=["Other","Female","Male"];
const InitalValues={
    name:"",
    surname:"",
    email:"",
    dateOfBirth:"",
    gender:"Other",
    address:"",
    ZIPcode:null
}
const InitalValuesErrors={
    name:"",
    surname:"",
    email:"",
    dateOfBirth:"",
    address:"",
    ZIPcode:"",
    emailError:false,
    nameError:false,
    surnameError:false,
    ZIPcodeError:false,
    addressError:false,
    dateOfBirthError:false
}

const CheckoutForm=({setOpenCheckout})=>{
    const [active,setActive]=useState(false);
    const [openSuccessModal,setOpenSuccessModal]=useState(false);
    const [errors,setErrors]=useState(InitalValuesErrors);
    const [user,setUser]=useState(InitalValues);
    const products=useAppSelector((store)=>store.cart.cart)
    const date= new Date(); //transaction timestamp

    const HandleChange=(event)=>{    
        const target=event.target.name;
        const value=event.target.value;
        setUser({...user,[target]:value})
    }
    const getTotalPrice=()=>{
        let price=0;
        products.map(item=>price=price+item.price*item.count);
        
        return price;
    }
    const HandleSubmit=async(event)=>{
        const total=getTotalPrice();
        let object={
            products,
            total,
            date, 
        }
        console.log(JSON.stringify(object));
        event.preventDefault();
        if(Validation(user,setErrors,InitalValuesErrors)&&active){
            event.preventDefault();
            fetch("https://locastic-server.herokuapp.com/orders", {
                method: "POST",
                body:JSON.stringify(object),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => console.log(json));
            setOpenSuccessModal(true);
        } 
    }
    const Agree=()=>{
        setActive(!active);
    }
    return(
        <>
        <form autoComplete="off"  className="login-form" onSubmit={event=>HandleSubmit(event)}>
            <label className='checkout-form-label'>First name:</label>
            <input
                 className="checkout-form-input"
                name="name"
                placeholder="Type your first name here"               
                type="text"
                onChange={event=>HandleChange(event)}
            >
            </input>
            <p className={`helper-text ${errors.nameError?"active":null}`}>{errors.name}</p>
            <label className='checkout-form-label'>Last name:</label>
            <input
                className="checkout-form-input"
                name="surname"
                placeholder="Type your last name here"               
                type="text"
                onChange={event=>HandleChange(event)}
            >
            </input>
            <p className={`helper-text ${errors.surnameError?"active":null}`}>{errors.surname}</p>
            <label className='checkout-form-label'>Email address:</label>
            <input
                className="checkout-form-input"
                name="email"
                placeholder="Type your email address here"               
                type="email"
                onChange={event=>HandleChange(event)}
                >
            </input>
            <p className={`helper-text ${errors.emailError?"active":null}`}>{errors.email}</p>
            <div className='checkout-form-date-gender'>
                <div className='checkout-form-date'>
                    <label className='checkout-form-label'>Date of Birth:</label>
                    <input
                        name="dateOfBirth"
                        placeholder="DD.MM.YYYY"               
                        type="date"
                        className="checkout-form-input"
                        onChange={event=>HandleChange(event)}
                    >
                    </input>
                    <p className={`helper-text ${errors.dateOfBirthError?"active":null}`}>{errors.dateOfBirth}</p>
                </div>
                <div className='checkout-form-gender'>
                    <label className='checkout-form-label'>Gender:</label>
                    <select className="checkout-form-input" name="gender">
                    {
                        genders.map(gender=><option value={gender} key={gender}>{gender}</option>)
                    }
                    </select>
                </div>
            </div>
            <label className='checkout-form-label'>Address:</label>
            <input
                className="checkout-form-input"
                name="address"
                placeholder="Type your address address here"               
                type="text"
                onChange={event=>HandleChange(event)}
            >
            </input>
            <p className={`helper-text ${errors.addressError?"active":null}`}>{errors.address}</p>
            <label className='checkout-form-label'>Zip Code:</label>
            <input
                className="checkout-form-input"
                name="ZIPcode"
                placeholder="eg. 21310"               
                type="text"
                onChange={event=>HandleChange(event)}
            > 
            </input>
            <p className={`helper-text ${errors.ZIPcodeError?"active":null}`}>{errors.ZIPcode}</p>
            <label className='checkout-form-label'>
                <input
                    className='checkbox-input'
                    name="I_agree"
                    placeholder="eg. 21310"               
                    type="checkbox"
                    onChange={event=>Agree()}
                >
                </input>I agree
            </label>
            <button type={active?"submit":"button"} className={`checkout-button ${active==true? 'active' : null}`}>Checkout</button>
        </form>
        {
            openSuccessModal&&<SuccessModal setOpenSuccessModal={setOpenSuccessModal} setOpenCheckout={setOpenCheckout}/>
        }
        </>
    )
}
export default CheckoutForm;
