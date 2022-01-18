import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

class JobsList extends Component {
  render() {
    const {jobsList} = this.props
    return (
      <ul className="card-cont">
        {jobsList.map(each => (
          <li key={each.id} className="card">
            <Link to={`/jobs/${each.id}`} className="link-content">
              <div className="img-heading">
                <img
                  src={each.companyLogoUrl}
                  alt="company logo"
                  className="job-img"
                />
                <div className="head-rating">
                  <h2 className="heading">{each.title}</h2>
                  <div className="rating-cont">
                    <AiFillStar className="star" />
                    <p className="rating">{each.rating}</p>
                  </div>
                </div>
              </div>

              <div className="location-type-pack-cont">
                <div className="location-type-cont">
                  <div className="rating-cont location-cont">
                    <IoLocationSharp className="location" key="location" />
                    <p className="rating">{each.location}</p>
                  </div>
                  <div className="rating-cont">
                    <BsBriefcaseFill
                      className="location"
                      key="employment_type"
                    />
                    <p className="rating">{each.employmentType}</p>
                  </div>
                </div>
                <p className="rating package">{each.packagePerAnnum}</p>
              </div>
              <hr className="line" />
              <h1 className="desc-head">Description</h1>
              <p className="desc">{each.jobDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}

export default JobsList
