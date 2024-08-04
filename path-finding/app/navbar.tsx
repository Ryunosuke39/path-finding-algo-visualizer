"use client"

import { useState } from "react"
import "./navbar.css"
import { useSwitchs } from "./SwitchCtx"

export default function Navbar(){
    const { placingStart, setPlacingStart } = useSwitchs();

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
            <button>Place Goal</button>
            <button>Draw Wall</button>
            <button>Start Path Finding</button>

        </div>
    )
}