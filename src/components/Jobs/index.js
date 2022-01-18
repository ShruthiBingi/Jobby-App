/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobsList from '../JobsList'

import './index.css'
import Failure from '../Failure'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  isLoading: 'LOADING',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileObject: {},
    jobsList: [],
    searchInput: '',
    radio: '',
    checkbox: [],

    stateApiConstant: apiConstant.initial,
  }

  componentDidMount() {
    this.getObject()
    this.getJobsList()
  }

  getObject = async () => {
    this.setState({stateApiConstant: apiConstant.isLoading})
    const url = 'https://apis.ccbp.in/profile'
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
      const updatedObj = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileObject: updatedObj,
        stateApiConstant: apiConstant.success,
      })
    } else {
      this.setState({stateApiConstant: apiConstant.failure})
    }
  }

  getJobsList = async () => {
    this.setState({stateApiConstant: apiConstant.isLoading})
    const {checkbox, radio, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${checkbox}&minimum_package=${radio}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsList: updatedData,
        stateApiConstant: apiConstant.success,
      })
    } else {
      this.setState({stateApiConstant: apiConstant.failure})
    }
  }

  onChangeSearchInput = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: event.target.value}, this.getJobsList)
    }
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobsList()
  }

  onClickRadio = event => {
    this.setState({radio: event.target.value}, this.getJobsList)
  }

  onChangeCheckBox = event => {
    const {checkbox} = this.state
    if (checkbox.includes(event.target.value) === true) {
      const filtered = checkbox.filter(each => event.target.value !== each)
      return this.setState({checkbox: filtered}, this.getJobsList)
    }
    return this.setState(
      prev => ({checkbox: [...prev.checkbox, event.target.value]}),
      this.getJobsList,
    )
  }

  renderProfile = () => {
    const {profileObject} = this.state
    const {name, profileImageUrl, shortBio} = profileObject
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h2 className="profile-head">{name}</h2>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <button type="button" onClick={this.getObject}>
      Retry
    </button>
  )

  renderJobsListFailure = () => (
    <button type="button" onClick={this.getJobsList}>
      Retry
    </button>
  )

  noJobs = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderProfileSwitchCase = () => {
    const {stateApiConstant} = this.state
    switch (stateApiConstant) {
      case apiConstant.isLoading:
        return this.renderLoader()
      case apiConstant.failure:
        return (
          <div>
            <button
              type="button"
              onClick={this.getObject}
              testid="searchButton"
            >
              Retry
            </button>
          </div>
        )
      case apiConstant.success:
        return this.renderProfile()
      default:
        return null
    }
  }

  renderJobsListSwitch = () => {
    const {stateApiConstant, jobsList} = this.state
    switch (stateApiConstant) {
      case apiConstant.isLoading:
        return this.renderLoader()
      case apiConstant.failure:
        return (
          <>
            <Failure />
            <button
              type="button"
              onClick={this.getJobsList}
              testid="searchButton"
            >
              Retry
            </button>
          </>
        )
      case apiConstant.success:
        if (jobsList.length > 0) {
          return (
            <div>
              <JobsList jobsList={jobsList} />
            </div>
          )
        }
        return this.noJobs()

      default:
        return null
    }
  }

  render() {
    const {radio} = this.state

    return (
      <div>
        <Header />
        <div className="job-bg-container">
          <div className="left-profile-container">
            {this.renderProfileSwitchCase()}
            <hr />
            <h3 className="term">Type of Employment</h3>
            <ul>
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={each.employmentTypeId}
                    value={each.employmentTypeId}
                    className="checkbox"
                    onChange={this.onChangeCheckBox}
                  />
                  <label
                    htmlFor={each.employmentTypeId}
                    className="check-box-label"
                  >
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr />
            <ul>
              <h1>Salary Range</h1>
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId}>
                  <input
                    type="radio"
                    id={each.salaryRangeId}
                    className="checkbox"
                    value={each.salaryRangeId}
                    checked={radio === each.salaryRangeId}
                    onChange={this.onClickRadio}
                  />
                  <label
                    htmlFor={each.salaryRangeId}
                    className="check-box-label"
                  >
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="search-cont">
              <input
                type="search"
                placeholder="Search"
                className="search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onChangeSearchInput}
              />

              <button onClick={this.onClickSearch} testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsListSwitch()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
