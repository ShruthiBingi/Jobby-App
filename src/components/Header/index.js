/* eslint-disable no-unused-vars */
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props

    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="logo"
          alt="website logo"
        />
      </Link>
      <ul className="home-jobs">
        <Link to="/" className="home-header">
          <li className="home">Home</li>
          <AiFillHome className="header-icon" />
        </Link>
        <Link to="/jobs" className="jobs-header">
          <li className="home">Jobs</li>
          <BsBriefcaseFill className="header-icon" />
        </Link>

        <Link to="/login">
          <li>
            <button
              type="button"
              className="logout-but"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
          <FiLogOut className="header-icon" onClick={onClickLogout} />
        </Link>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
