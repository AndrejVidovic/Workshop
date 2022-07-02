import './TransactionsHistory.css'
import BackButton from "../BackButton/BackButton"
import LogoBig from "../../Images/LogoBig.png"
import LogoSmall from "../../Images/Logo.png"
import Transactions from '../../components/Transactions/Transactions'

const TransactionsHistory=()=>{
    const date = new Date().getFullYear();
    return(
        <div className="transactions-history-container">
            <div className='logo-div'>
                <img src={LogoBig} alt="logo" className='logo-big'/>
                <img src={LogoSmall} alt="logo" className='logo-small'/>
                <p>&copy; TINEL Meetup {date}.</p>
            </div>
            <div className='transactions-history-body'>
                <BackButton/>
                <h1>Moje narudžbe</h1>
                <Transactions/>
            </div>

        </div>
    )
}
export default TransactionsHistory;