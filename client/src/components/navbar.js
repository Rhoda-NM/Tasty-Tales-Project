import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./app.css";

function NavBar() {
  //const { currentUser } = useContext(UserContext);
  const img4 = "https://www.themealdb.com/images/media/meals/zadvgb1699012544.jpg"
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid title">
          <div style={{display: 'flex'}}>
            <img src={img4} width={"60px"} />
            <h1 style={{padding: 12}}>tasty<span>TALES</span></h1>
          </div>
          
          <div>
            <div className="user">
             <FontAwesomeIcon icon={faUser} />
             <h3><Link to="/login" className="nav-link active">
                  Sign In
                </Link>|
                <Link to="/signup" className="nav-link active">
                  Register
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </nav>
      <div className="nav">
      <div class="navbar-container">
            <ul class="nav-links">
                <li><Link to="/" className="nav-link active">Home</Link></li>
                <li><Link to="/recipes" className="nav-link active">Recipes</Link></li>
                <li><Link to="/" className="nav-link active">Collections</Link></li>
                <li><Link to="/recipeform" className="nav-link active">Add Recipe</Link></li>
            </ul>
            <div class="search-bar">
                <input type="text" placeholder="Search..." />
                <button type="submit">Search</button>
            </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;