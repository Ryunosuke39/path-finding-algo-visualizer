import "./board.css"

export default function Board() {
    let rows = 25;
    let cols = 50;
    return (
        <div className="board">
            {Array.from({ length: rows}, (_, rowIdx) => (
                <div className="row">{
                    Array.from({ length: cols}, (_, colIdx) => (
                        <div className="cell">{`${rowIdx}, ${colIdx}`}</div>
                    ))
                }</div>
            ))}
        </div>
    )
}