import React from 'react';
import './GuessCount.css';

const GuessCount = ({ guesses }) => (
	<div className="guessCount">
		<span className="guesses">{guesses}</span>
		<span> Tries</span>
	</div> 	
)
	
	// GuessCount.defaultProps = {
	// 	guesses: 0
	// }

export default GuessCount
