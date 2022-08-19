import { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./modules/Login/Login";
import Transactions from "./pages/Transactions";
import Workshop from "./pages/Workshop";
import WorkshopsPage from "./pages/Workshops";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { user_logged_in } from "./redux/Slices/login";

function App() {
  const dispatch = useAppDispatch();
  const login = useAppSelector((store) => store.login.username);
  const userFeature = login !== "";

  // mocked persistant login on refresh by localstorage
  const usernameFromStorage = localStorage.getItem("user");
  useEffect(() => {
    if (usernameFromStorage !== null) dispatch(user_logged_in(usernameFromStorage));
  }, [usernameFromStorage]);

  return (
    <div className="App">
      <Routes>
        {!userFeature && <Route path="/" element={<Login />} />}
        {userFeature && <Route path="/workshops" element={<WorkshopsPage />} />}
        {userFeature && <Route path="/workshops/:id" element={<Workshop />} />}
        {userFeature && <Route path="/myTransactions" element={<Transactions />} />}
        {!userFeature && <Route path="*" element={<Login />} />}
        {userFeature && <Route path="*" element={<WorkshopsPage />} />}
      </Routes>
    </div>
  );
}

export default App;
