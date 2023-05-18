import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const possibleViews = {
  initial: 'INITIAL',
  in_progress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {active: possibleViews.initial, details: {}}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({active: possibleViews.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
      const updateDetails = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({details: updateDetails, active: possibleViews.success})
    } else {
      this.setState({active: possibleViews.failure})
    }
  }

  updateRetry = () => {
    this.getDetails()
  }

  renderInProgress = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderOnFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.updateRetry}>
        Retry
      </button>
    </div>
  )

  renderOnSuccess = () => {
    const {details} = this.state
    return (
      <div className="details-container">
        <img
          src={details.imageUrl}
          alt={details.name}
          className="details-img"
        />
        <div className="details-desc-container">
          <h1 className="details-name">{details.name}</h1>
          <p className="details-description">{details.description}</p>
        </div>
      </div>
    )
  }

  renderOnDetails = () => {
    const {active} = this.state
    switch (true) {
      case active === possibleViews.in_progress:
        return this.renderInProgress()
      case active === possibleViews.failure:
        return this.renderOnFailure()
      case active === possibleViews.success:
        return this.renderOnSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderOnDetails()}
      </>
    )
  }
}
export default CourseDetails
