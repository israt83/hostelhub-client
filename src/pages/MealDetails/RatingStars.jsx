// src/components/RatingStars.js


import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './RatingStars.css'; //

const RatingStars = ({ rating }) => {
    const totalStars = 5; // Total number of stars
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
        if (rating >= i) {
            stars.push(<FaStar key={i} color="gold" />);
        } else if (rating >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} color="gold" />);
        } else {
            stars.push(<FaRegStar key={i} color="gold" />);
        }
    }

    // return <div>{stars}</div>;
    return <div className="rating-stars">{stars}</div>;
};


export default RatingStars;
