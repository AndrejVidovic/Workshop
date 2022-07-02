import Navbar from "../modules/Navbar/Navbar";
import TransactionsHistory from "../modules/TransactionsHistory/TransactionsHistory";

const Transactions=()=>{
    return(
        <>
            {window.innerWidth<600?<Navbar/>:null}
            <TransactionsHistory/>
        </>
        
    )
}
export default Transactions;