import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseCard from '../CourseCard'

const possibleViews = {
  initial: 'INITIAL',
  in_progress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {activeView: possibleViews.initial, courses: []}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({activeView: possibleViews.in_progress})
    const url = 'https://apis.ccbp.in/te/courses'
    const option = {
      method: 'GET',
    }
    const response = await fetch(url, option)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({courses: updatedData, activeView: possibleViews.success})
    } else {
      this.setState({activeView: possibleViews.failure})
    }
  }

  updateRetry = () => {
    this.getCourses()
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
    const {courses} = this.state
    return (
      <ul className="unorderedCoursesList">
        {courses.map(eachList => (
          <CourseCard key={eachList.id} card={eachList} />
        ))}
      </ul>
    )
  }

  renderOnOutput = () => {
    const {activeView} = this.state
    switch (true) {
      case activeView === possibleViews.in_progress:
        return this.renderInProgress()
      case activeView === possibleViews.failure:
        return this.renderOnFailure()
      case activeView === possibleViews.success:
        return this.renderOnSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <h1 className="heading">Courses</h1>
          <div className="CourseContainer">{this.renderOnOutput()}</div>
        </div>
      </div>
    )
  }
}
export default Home
