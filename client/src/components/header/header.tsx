import { useContext } from "react";
import { User } from "../../types/user_types";
import { UserContext } from "../context/user_context_provider";
import Nav from "./nav";

const Header = () => {
  const user = useContext(UserContext) as User;
  console.dir(user);
  return (
    <header className="header">
      <h3 className="header-title">Cook up
      a Storm</h3>
      <Nav />
      <div className="user-heading">
        <img
          className="user-heading__icon"
          src="user.png"
          alt="user icon"
        />
        <p className="user-heading__id">{user.first_name} {user.last_name}</p>
      </div>
    </header>
  );
};
export default Header;