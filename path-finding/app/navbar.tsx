import "./navbar.css"

export default function Navbar(){
    return(
        <div className="navbar-container">
            <div className="title-container">
                <div>Pathfinding Visualizer</div>
                <div>?</div>
            </div>

            <div className="test">
                <label htmlFor="algorithm">Algorithm AI</label>
                <select name="algorithm" id="algorithm">
                    <option value="DFS">Depth First Search</option>
                    <option value="BFS">Breath First Search</option>
                    <option value="A*">A*</option>
                    <option value="Minimax">Minimax</option>
                </select>
            </div>

            <div>Place Start</div>
            <div>Place Goal</div>
            <div>Draw Wall</div>

        </div>
    )
}