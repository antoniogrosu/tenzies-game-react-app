import { useState } from 'react'
import { nanoid, random } from 'nanoid'
import Die from './Die'
import Confetti from 'react-confetti'
import './App.css'
import { useEffect } from 'react'

function App() {

  //dice state
  const [dice,setDice] = useState(randomDice())
  const [tenzies,setTenzies] = useState(false)

  //generate new Dice
  function generateNewDice(){
    return{
      value : Math.ceil(Math.random() * 6),
      isHeld : false,
      id : nanoid()
    }
  }

  //push generated object in the array
  function randomDice(){
    const newArr = []
    for(let i=0; i<10;i++)
    {
      newArr.push(generateNewDice())
    }
    return newArr
  }

  //roll dice function
  function rollDice(id){
    if(!tenzies){
      setDice(dice => dice.map(die =>{
        return die.isHeld ? die : generateNewDice()
      }
    ))
    }
    else{
      setTenzies(false)
      setDice(randomDice)
    }
  }

  //render numbers from state
  const diceElements = dice.map(die => 
    <Die key={die.id} value={die.value} clicked={ () =>holdDice(die.id)} isHeld={die.isHeld} />)

  //hold the dice
  function holdDice(id){
    const newDice = dice.map(die => {
      return die.id === id ? {
        ...die , isHeld : !die.isHeld
      } : die
    })
    setDice(newDice)
}

  //win game
  useEffect( () =>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allValue = dice.every(die => die.value === firstValue) 
    if(allHeld && allValue){
      setTenzies(true)
    }
  },[dice])

  return (
    <main>
      {tenzies && <Confetti/>}
      <div className="app">
        <h1>
              Tenzies Game
        </h1>
        <p className='text'>
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
        <div className="container">
              {diceElements}
        </div>
        <button className='roll-btn' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </main>
  )
}

export default App