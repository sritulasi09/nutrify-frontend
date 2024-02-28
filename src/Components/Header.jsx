import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import { useNavigate,Link } from "react-router-dom"

export default function Header()
{

    const loggedData=useContext(UserContext)
    const navigate=useNavigate()

    function logout()
    {
        localStorage.removeItem("nutrify-user")
        loggedData.setLoggedUser(null)
        navigate("/login")
    }

    return (
        <div className="navigation-container">

             <ul className="navigation-list">
             <li><Link to="/track" className="navigation-link">Track</Link></li>
                <li><Link to="/diet" className="navigation-link">Diet</Link></li>
                <li onClick={logout} className="navigation-link">Logout</li>
             </ul>
             <div className="nav-img">
             </div>

        </div>
    )
}