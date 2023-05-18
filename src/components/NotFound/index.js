import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="notFoundmg"
      />
      <h1 className="nf-title">Page Not Found</h1>
      <p className="nf-desc">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)
export default NotFound
