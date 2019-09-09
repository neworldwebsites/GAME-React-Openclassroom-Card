import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';


const HIDDEN_SYMBOL = '❓';


const Card = ({ card, feedback, index, onClick }) => (

	<div className={`card ${feedback}`}
		onClick={() => onClick(index)}>
			
		<span className="symbol">
			{feedback === 'hidden' ? HIDDEN_SYMBOL : card}
		</span>

	</div>

) // super important ( ) instead { }

Card.propTypes = {
	card: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	feedback: PropTypes.oneOf([
		'visible',
		'hidden',
		'justMatched',
		'justMismatched'
	]).isRequired,
	index: PropTypes.number.isRequired
}

export default Card
