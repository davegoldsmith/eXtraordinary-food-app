import { FormEvent, useContext, useState } from "react";
import { getUser } from "../../api/get_user";
import { validateLoginCredentials } from "../../validation/validate_user";
import { FormError } from "../../types/error_types";
import { User } from "../../types/user_types";
import { UpdateUserContext } from "../context/user_context_provider";
import LoginInput from "./login_input";

interface loginProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const LoginForm: React.FC<loginProps> = ({ setIsLoggedIn }) => {
  const [errorMessages, setErrorMessages] = useState<Array<FormError>>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useContext(UpdateUserContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validateLoginCredentials(email, password);
    setErrorMessages(formErrors);
      
    if (formErrors.length === 0) {
      try {     
        const user: User | undefined = await getUser(email, password);
        if (user) {
          setUser(user);
          setIsLoggedIn(true);
        }           
      } catch (e) {
        setErrorMessages([{ inputName: "email", message : "🚫Invalid Credentials"}]);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="header-title">Cooking Up a Storm!</h3>
        <LoginInput
          inputValue={email}
          setInputValue={setEmail}
          inputType="email"
          inputLabel="Email"
          id="email"
          className="input-container"
          errorMessages={errorMessages}
        />
        <LoginInput
          inputValue={password}
          setInputValue={setPassword}
          inputType="password"
          inputLabel="Password"
          id="password"
          className="input-container"
          errorMessages={errorMessages}
        />
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;