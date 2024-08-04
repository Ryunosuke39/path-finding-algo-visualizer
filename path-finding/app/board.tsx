import { useEffect, useState } from "react";
import "./board.css"
import { useBoardInfo } from "./SwitchCtx";

export default function Board() {
    
    const { start, setStart } = useBoardInfo()
    let rows = 25;
    let cols = 50;

    // remove css class start-cell from pos
    const removeGoal = (pos: Array<number>) => {
        let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
        cell?.classList.remove("start-cell")
    }

    // add css class start-cell from pos
    const paintGoal = (pos: Array<number>) => {
        // add goal css
        let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
        cell?.classList.add("start-cell");
    }

    useEffect(()=>{
        // when start changed, paint start based on new start state value
        console.log(`${start}`);
        paintGoal(start);
    }, [start])

    return (
        <div className="board">
            {Array.from({ length: rows}, (_, rowIdx) => (
                <div className="row" key={`${rowIdx}`}>{
                    Array.from({ length: cols}, (_, colIdx) => (
                        <div 
                            id={`${rowIdx}-${colIdx}`}
                            key={`${rowIdx}-${colIdx}`}
                            className="cell" 
                            data-x={`rowIdx`} 
                            data-y={`colIdx`}
                            onClick={()=>{ 
                                // if it exist, remove previous state 
                                removeGoal(start);
                                // set start
                                setStart([rowIdx, colIdx]);
                            }}
                        >
                            {`${rowIdx}, ${colIdx}`}
                        </div>
                    ))
                }</div>
            ))}
        </div>
    )
}