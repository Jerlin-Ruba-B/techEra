import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="headerContainer">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png "
        alt="website logo"
        className="logo-container"
      />
    </Link>
  </div>
)
export default Header
