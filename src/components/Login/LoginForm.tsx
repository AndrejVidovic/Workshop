import { useState } from "react";
import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { user_logged_in } from "../../redux/Slices/login";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router";
import { fetchData } from "../../service/Fetch";

type InitialValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: InitialValues = {
    email: "",
    password: "",
  };

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(faEye);
    } else {
      setType("password");
      setIcon(faEyeSlash);
    }
  };

  function HandleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    switch (target) {
      case "email":
        user.email = value;
        break;
      case "password":
        user.password = value;
        break;
    }
  }
  let loggedUser;
  const CheckLogin = async (e) => {
    e.preventDefault();
    await fetchData(`https://server-workshop.vercel.app/users/?email=${user.email}&password=${user.password}`).then((response) => {
      loggedUser = response[0];
    });
    if (loggedUser === undefined) {
      setError("Entered login credentials are not valid! Please try again.");
    } else {
      dispatch(user_logged_in(loggedUser.name));
      navigate("/workshops");
    }
  };
  return (
    <div className="login-form-container">
      <h2 className="title">Prijavi se</h2>
      <p className="subtitle">What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <form autoComplete="off" onSubmit={CheckLogin} className="login-form">
        <label className="label">Unesite email:</label>
        <input className="login-form-input" name="email" placeholder="Email" type="email" autoComplete="off" onChange={HandleChange}></input>
        <label className="label">Unesite lozinku:</label>
        <div className="password-field">
          <input className="login-form-input" name="password" placeholder="Password" type={type} onChange={HandleChange}></input>
          <span onClick={handleToggle}>
            <FontAwesomeIcon icon={icon} size="lg" />
          </span>
        </div>
        <p className="login-error">{error}</p>
        <label className="helper-label">Zaboravio/la si lozinku? Klikni ovdje</label>
        <button type="submit" className="submit-button">
          Prijavi se
        </button>
        <label className="helper-label">Nemaš korisnički račun? Klikni ovdje</label>
      </form>
    </div>
  );
};
export default LoginForm;
