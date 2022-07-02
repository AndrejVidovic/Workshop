import LoginPage from '../../Images/LoginPage.png'
import Logo from '../../Images/LogoBig.png'
import LogoYellow from '../../Images/LogoYellow.png'
import LoginForm from '../../components/Login/LoginForm'
import './Login.css'

const Login=()=>{
    return(
        <div className='login-page-container'>
            <div className='logo-container'>
                <img src={Logo} alt="workshops logo" className='logo'></img>
                <img src={LogoYellow} alt="workshops logo" className='logo-yellow'></img>
            </div>
            <LoginForm></LoginForm>
            <img src={LoginPage} alt="login page colors" className='page-colors'></img>
        </div>
    )
}
export default Login;