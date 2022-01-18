/* eslint-disable react/no-unescaped-entities */
/* eslint-disable arrow-body-style */
import Header from '../Header'
import './index.css'

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="not-found-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
            alt="not found"
            className="not-found"
          />
          <h1>Page Not Found</h1>
          <p> we're sorry, the page you requested could not be found.</p>
        </div>
      </div>
    </>
  )
}
export default NotFound
