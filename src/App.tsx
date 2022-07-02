import { Route,Routes} from "react-router-dom";
import './App.css';
import Login from './modules/Login/Login';
import Workshop from './pages/Workshop';
import WorkshopsPage from './pages/Workshops';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import {user_logged_in} from './redux/Slices/login';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Transactions from "./pages/Transactions";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const login = useAppSelector( (store)=>store.login.username);
  const userFeature = (login!="");

  // mocked persistant login on refresh by localstorage
  const usernameFromStorage = localStorage.getItem('user'); 
  useEffect(()=>{
    dispatch(user_logged_in(usernameFromStorage))
  },[usernameFromStorage])

  return (
    <div className="App">
      <Routes>
        {!userFeature&&<Route path="/" element={<Login/>}/>}
        {userFeature&&<Route path="/workshops" element={<WorkshopsPage/>}/>}
        {userFeature&&<Route path="/workshops/:id" element={<Workshop/>}/>}
        {userFeature&&<Route path="/myTransactions" element={<Transactions/>}/>}
        {!userFeature&&<Route path="*" element={<Login/>}/>}
        {userFeature&&<Route path="*" element={<WorkshopsPage/>}/>}
      </Routes>
    </div>
  );
}

export default App;