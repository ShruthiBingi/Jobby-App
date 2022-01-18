/* eslint-disable arrow-body-style */
import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="bg-container">
        <div className="home-content">
          <h1 className="home-head">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="home-jobs-but">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
