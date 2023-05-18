import {Link} from 'react-router-dom'
import './index.css'

const CourseCard = props => {
  const {card} = props
  return (
    <Link to={`/courses/${card.id}`}>
      <li className="cardList">
        <img src={card.logoUrl} alt={card.name} className="course-logo" />
        <p className="name">{card.name}</p>
      </li>
    </Link>
  )
}
export default CourseCard
