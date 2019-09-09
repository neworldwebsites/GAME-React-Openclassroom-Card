import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shuffle from 'lodash.shuffle';
import './App.css';
import Card from './Card';
import GuessCount from './GuessCount';
import HallOfFame, { FAKE_HOF } from './HallOfFame';

const SIDE = 6;
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿';
const VISUAL_PAUSE_MSECS = 750;

// STATE: on s'en sert dans le Render
// /////////////////////////////////
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // toutes les cartes en random
      cards: this.generateCards(),
      // array qui analysera les 2 cartes choisies
      currentPair: [],
      // nbr de tentatives paires
      guesses: 0, 
      // list positions cartes de paire reussies
      matchedCardIndices: [],
    };
  }


// FUNCTIONS:
// ///////////
  generateCards() {
    const result = [];
    const size = SIDE * SIDE;
    const candidates = shuffle(SYMBOLS);

    while (result.length < size) {
      const card = candidates.pop();
      result.push(card, card);
    }
    return shuffle(result);
  }

// func pour feedback
  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state; // destructuration state
    const indexMatched = matchedCardIndices.includes(index);

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden';
    }
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched';
    }
    return indexMatched ? 'visible' : 'hidden';
  }

// event func paire courante | Arrow fx for binding
  handleCardClick = index => {
    const { currentPair } = this.state

    if (currentPair.length === 2) {
      return;
    }
    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] });
      return;
    }
    this.handleNewPairClosedBy(index)
    console.log(index, 'clicked', this)    
  }

  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state;

    const newPair = [currentPair[0], index];
    const newGuesses = guesses + 1;
    const matched = cards[newPair[0]] === cards[newPair[1]];
    this.setState({ currentPair: newPair, guesses: newGuesses });
    if (matched) {
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] });
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS);
  }


  // RENDER:
  // ////////
  render() {
    const { cards, guesses, matchedCardIndices } = this.state; // destructuration des states
    const won = matchedCardIndices.length === cards.length;

    return (
      <div className="memory">
        
        <h1>Memory Card</h1>
        
        <GuessCount guesses={guesses} />

        {cards.map((card, index) => (
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            index={index}
            key={index}
            onClick={this.handleCardClick}
          />
        ))}
        {won && <HallOfFame entries={FAKE_HOF} />}

      </div>
    )

  } // end render
} // end class

GuessCount.propTypes = {
  guesses: PropTypes.number.isRequired
}

export default App




// INSTEAD SHUFFLE:
// /////////////////

// var myArr = ["a", "b", "c", "d"];

// myArr.forEach((val, key) => {
//   randomIndex = Math.ceil(Math.random() * (key));
//   myArr[key] = myArr[randomIndex];
//   myArr[randomIndex] = val;
// });
