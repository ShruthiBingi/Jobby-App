import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import './index.css'
import Failure from '../Failure'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  isLoading: 'LOADING',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    skillsList: [],
    lifeCompany: {},
    similarJobList: [],
    stateApiConstant: apiConstant.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({stateApiConstant: apiConstant.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        companyWebsiteUrl: data.job_details.company_website_url,
      }
      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const skills = data.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      const similarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetails: updatedData,
        lifeCompany: lifeAtCompany,
        skillsList: skills,
        similarJobList: similarJobs,
        stateApiConstant: apiConstant.success,
      })
    } else {
      this.setState({stateApiConstant: apiConstant.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, skillsList, similarJobList, lifeCompany} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <div className="card-bg">
        <div className="card-details">
          <div className="img-heading">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-img"
            />
            <div className="head-rating">
              <h2 className="heading">{title}</h2>
              <div className="rating-cont">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-type-pack-cont">
            <div className="location-type-cont">
              <div className="rating-cont location-cont">
                <IoLocationSharp className="location" />
                <p className="rating location">{location}</p>
              </div>
              <div className="rating-cont">
                <BsBriefcaseFill className="location" />
                <p className="rating">{employmentType}</p>
              </div>
            </div>
            <p className="rating package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="descri-cont">
            <h1 className="desc-head">Description</h1>

            <a href={companyWebsiteUrl} className="visit-cont">
              <p className="visit">Visit</p>
              <FiExternalLink className="link" />
            </a>
          </div>
          <p className="desc">{jobDescription}</p>

          <div>
            <h1>Skills</h1>
            <ul className="skills-cont">
              {skillsList.map(each => (
                <li key={each.name} className="skill">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skill-img"
                  />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h1>Life at Company</h1>
          <div className="life-cont">
            <p>{lifeCompany.description}</p>
            <img
              src={lifeCompany.imageUrl}
              className="life-img"
              alt="life at company"
            />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="similar-cont">
          {similarJobList.map(each => (
            <li className="card-similar" key={each.id}>
              <div className="img-heading">
                <img
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
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
              <div className="desc-similar">
                <h3 className="desc-head ">Description</h3>
              </div>
              <p className="desc">{each.jobDescription}</p>
              <div className="location-type-pack-cont">
                <div className="location-type-cont">
                  <div className="rating-cont location-cont">
                    <IoLocationSharp className="location" />
                    <p className="rating">{location}</p>
                  </div>
                  <div className="rating-cont">
                    <BsBriefcaseFill className="location" />
                    <p className="rating">{employmentType}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  switchCase = () => {
    const {stateApiConstant} = this.state
    switch (stateApiConstant) {
      case apiConstant.isLoading:
        return this.renderLoader()
      case apiConstant.failure:
        return (
          <>
            <Failure />
            <button
              type="button"
              onClick={this.getJobDetails}
              testid="searchButton"
            >
              Retry
            </button>
          </>
        )
      case apiConstant.success:
        return this.renderJobDetails()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.switchCase()}
      </div>
    )
  }
}

export default JobItemDetails
