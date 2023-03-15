import {NavLink} from "react-router-dom";
const Nav = () => <nav className='navigation'>    
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/recipes">Recipes</NavLink></li>
        <li><NavLink to="/mealPlanner">Meal Planner</NavLink></li>
    </ul>
</nav>;

export default Nav;