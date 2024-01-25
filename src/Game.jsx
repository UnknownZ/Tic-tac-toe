import './index.css'
import './components/Tile'
import Tile from './components/Tile'
import { useEffect, useState } from 'react'

const Game = (playerName1, playerName2, startingPlayer) => {
  const [cells, setCells] = useState(['', '', '', '', '', '', '', '', ''])
  const [turn, setTurn] = useState(startingPlayer)
  const [winner, setWinner] = useState(null)

  const msg = turn + "'s turn"

  const checkScore = () => {
    const combos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [2, 5, 8], [1, 4, 7], [2, 4, 6], [0, 4, 8]
    ]

    combos.forEach(array => {
      let circle = array.every(cell => cells[cell] === 'circle')
      if (circle) {
        setWinner(playerName1,' wins')
      }

      let cross = array.every(cell => cells[cell] === 'cross')
      if (cross) {
        setWinner(playerName2,' wins')
      }
    })
  }

  const refresh = () =>{
    window.location.reload()
  }


  useEffect(() => {
    checkScore()
  }, [cells])


  return (
    <div className="app">
      <div className="gameBoard">
        {cells.map((cell, i) =>
          <Tile
            key={i}
            id={i}
            cell={cell}
            setCells={setCells}
            turn={turn}
            setTurn={setTurn}
            cells={cells}
            winner={winner}
          />)}
      </div>
      <p>{winner || msg}</p>
    <button onClick={refresh}>Restart</button>
      
    </div >
  )
}

export default Game