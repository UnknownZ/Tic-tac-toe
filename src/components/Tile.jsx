const Tile = ({ id, cell, setCells, turn, setTurn, cells, winner }) => {

    const handleCLick = (e) => {
        const taken = e.target.firstChild.classList.contains("circle") ||
            e.target.firstChild.classList.contains("cross")

        if (!taken) {
            if (turn === 'circle') {
                e.target.firstChild.classList.add("circle")
                handleCellChange('circle')
                setTurn('cross')
            }

            if (turn === 'cross') {
                e.target.firstChild.classList.add("cross")
                handleCellChange('cross')
                setTurn('circle')
            }
        }
    }

    const handleCellChange = (className) => {
        const newCells  = cells.map((cell, i) => {
            if (i === id) {
                return className
            }
            else {
                return cell
            }

        })
        setCells(newCells)
    }

    return (
        <div className="space" id={id} onClick={!winner && handleCLick}>
            <div className=""></div>
        </div>
    )
}

export default Tile