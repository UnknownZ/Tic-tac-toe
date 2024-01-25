import './index.css'
import './components/Tile'
import Tile from './components/Tile'
import { useEffect, useState } from 'react'

const App = () => {
    const [startingPlayer, setStartingPlayer] = useState()
    const [P1Name, setP1Name] = useState("")
    const [P2Name, setP2Name] = useState("")
    const [turn, setTurn] = useState(startingPlayer)
    const [ready, setReady] = useState(false)
    const [cells, setCells] = useState(['', '', '', '', '', '', '', '', ''])    
    const [winner, setWinner] = useState(null)

    const msg = turn + "'s turn"

    const checkScore = () => {
        const combos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [2, 5, 8], [1, 4, 7], [2, 4, 6], [0, 4, 8]
        ]

        combos.forEach(array => {
            let circle = array.every(cell => cells[cell] === 'circle')
            if (circle) {
                setWinner(P1Name+ ' wins')
            }

            let cross = array.every(cell => cells[cell] === 'cross')
            if (cross) {
                setWinner(P2Name+ ' wins')
            }
        })
    }

    const refresh = () => {
        window.location.reload()
    }


    useEffect(() => {
        checkScore()
    }, [cells])


    const handleCLick = (e) => {
        if (e.target.id === 'circleContainer' || e.target.id === 'circleBlock') {
            setStartingPlayer("circle")
            setTurn("circle")
            setReady(true)
        }
        else if (e.target.id === 'crossContainer' || e.target.id === 'crossBlock') {
            setStartingPlayer("cross")
            setTurn("cross")
            setReady(true)
        }
    }

    const handleMouseOver = (e) => {
        e.target.parentElement.classList.add("unpressed")
    }

    const handleMouseOut = (e) => {
        e.target.parentElement.classList.remove("unpressed")    
    }

    return (

        <div>
            {!ready ? (

                <div className='container'>
                    <h1>Pick your Weapon</h1>
                    <div className='choice'>
                        <div className="box-1">
                            <input placeholder='Player 1 name' onChange={(e) => setP1Name(e.target.value)}></input>
                            <div className="space" id='circleContainer' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleCLick}>
                                <div className="circle" id='circleBlock'></div>
                            </div>
                        </div>
                        <div className="box-2">
                            <input placeholder='Player 2 name' onChange={(e) => setP2Name(e.target.value)}></input>
                            <div className="space" id='crossContainer' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleCLick}>
                                <div className="cross" id='crossBlock'></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
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
            )}
        </div>
    )
}

export default App