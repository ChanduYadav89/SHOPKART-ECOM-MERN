import { Link } from 'react-router-dom'
import '../Styles/notfound.css'

const NotFound = () => {
return ( <div className="notfound-container"> <div className="glow glow-1"></div> <div className="glow glow-2"></div>

  <div className="notfound-card">
    <h1 className="error-code">404</h1>

    <h2>Oops! Page Not Found</h2>

    <p>
      The page you're looking for doesn't exist or has been moved.
    </p>

    <Link to="/" className="home-btn">
      Back To Home
    </Link>
  </div>
</div>


)
}

export default NotFound
