"use client"

import "./navbar.css"
import { useSwitchs } from "./SwitchCtx"

export default function Navbar(){
    const { placingStart, 
            setPlacingStart, 
            placingEnd, 
            setPlacingEnd,
            placingWall, 
            setPlacingWall, 
            erasingWall,
            setErasingWall, } = useSwitchs();

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

            <button onClick={()=>setPlacingStart(!placingStart)}>
                {placingStart ? "Done":"Place Start"}
            </button>
            <button onClick={()=> setPlacingEnd(!placingEnd)}>
                {placingEnd ? "Done": "Place Goal"}
            </button>
            <button onClick={()=> setPlacingWall(!placingWall)}>
                {placingWall ? "Done":"Placing Walls"}
            </button>
            <button onClick={()=> setErasingWall(!erasingWall)}>
                {erasingWall ? "Done" : "Erasing Walls"}
            </button>
            <button>Start Path Finding</button>
            <button onClick={()=> location.reload()}>Reset Board</button>

        </div>
    )
}