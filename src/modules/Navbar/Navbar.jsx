import './Navbar.css'
import logo from '../../Images/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { useState } from 'react'
import {user_logged_out} from '../../redux/Slices/login'
import ShoppingCart from '../Cart/Cart'
import { Link } from 'react-router-dom'

const Navbar=()=>{
    const login = useAppSelector( (store)=>store.login.username);
    const dispatch=useAppDispatch();
    const [infoVisible, setInfoVisible] = useState(()=>false);
    const HandleChangeVisible=()=>{
        setInfoVisible(!infoVisible)
    }
    const LogOut=()=>{
        dispatch(user_logged_out());
    }
    return(
        <header className='navbar-header'>
            <nav className='navbar'>
                <div className='workshop-logo'>
                    <a href='/'><img src={logo}></img></a>
                </div>
                <div className={`user-info ${infoVisible?'active':null}`} onClick={HandleChangeVisible}>
                    <FontAwesomeIcon icon={faUser} size='lg' style={{zIndex:2}}/>
                    <h4>{login}</h4>
                    {infoVisible&&<div>
                        <Link to="/myTransactions">Moje narudžbe</Link>
                        <p onClick={LogOut}>Odjavi se</p>
                    </div>
                    }
                </div>
                <div className='cart-info'>
                    <ShoppingCart/>
                </div>
            </nav>
        </header>
    )
    
}
export default Navbar;
