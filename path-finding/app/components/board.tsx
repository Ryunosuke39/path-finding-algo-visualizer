import { useEffect } from "react";
import "./styles/board.css"
import { useBoardInfo } from "./SwitchCtx";
import { useSwitchs } from "./SwitchCtx"
import { ManhattanDis } from "./algorithms/ManhattanDis";

// paint explored cells - used in DFS, and others
export const paintExplored = (pos: Array<number>) => {
    let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
    cell?.classList.add("explored-cell");
}

// paint explored cells - used in DFS, and others
export const paintPath = (pos: Array<number>) => {
    let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
    cell?.classList.add("path-cell");
}

// clear path and explored 
export const clearPath = (pos: Array<number>) => {
    let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
    cell?.classList.remove("explored-cell");
    cell?.classList.remove("path-cell");

}

export default function Board() {

    const { start, 
            setStart, 
            end, 
            setEnd, 
            walls,
            setWalls, } = useBoardInfo()

    const { placingStart, 
            placingEnd, 
            placingWall,
            isMouseDown,
            setIsMouseDown, 
            erasingWall, 
            currentAlgo,} = useSwitchs();


    // width and height of board 
    let rows = 25;
    let cols = 50;


    // remove css class start-cell from pos
    const removeStart = (pos: Array<number>) => {
        let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
        cell?.classList.remove("start-cell")
    }


    // remove css class start-cell from pos
    const removeEnd = (pos: Array<number>) => {
        let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
        cell?.classList.remove("goal-cell")
    }


    // add css class start-cell from pos
    const paintStart = (pos: Array<number>) => {
        // add goal css
        let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
        cell?.classList.add("start-cell");
    }


    // add css class start-cell from pos
    const paintEnd = (pos: Array<number>) => {
        // add goal css
        let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
        cell?.classList.add("goal-cell");
    }

    // add css class wall-cell to cell element
    const paintWall = (pos: Array<number>) => {
        // add goal css
        let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
        cell?.classList.add("wall-cell");
    }

    
    const eraseWall = (pos: Array<number>) => {
        // remove wall css 
        let cell = document.getElementById(`${pos[0]}-${pos[1]}`)
        cell?.classList.remove("wall-cell")
    }


    // handle placing start 
    const handlePlacingStart = (rowIdx:number, colIdx:number) => {
        removeStart(start); // if it exist, remove previous state
        eraseWall([rowIdx, colIdx]);
        removeCellFromWalls(rowIdx, colIdx);
        setStart([rowIdx, colIdx]); // set start
    }


    // handle placing start 
    const handlePlacingEnd = (rowIdx:number, colIdx:number) => {
        removeEnd(end); // if it exist, remove previous state
        eraseWall([rowIdx, colIdx]);
        removeCellFromWalls(rowIdx, colIdx);
        setEnd([rowIdx, colIdx])
    }


    // check if current cell already exist in wall or not 
    const isInWalls = (rowIdx:number, colIdx:number) => {
        for(let i=0; i< walls.length; i++) {
            // already eixst in walls
            if( walls[i][0] == rowIdx && walls[i][1] == colIdx )
                return true
        }
        return false
    }
    // handle drawing wall
    const handleDrawingWall = (rowIdx:number, colIdx:number) => {
        // if current wall is not in walls, then add otherwise don't
        if(!isInWalls(rowIdx, colIdx)){
            paintWall([rowIdx, colIdx]); // paint walls
            setWalls((prevWall)=> [...prevWall, [rowIdx, colIdx]])// add a cell to walls 
        }
        console.log("walls: ", walls)
    }


    // remove cell from walls
    const removeCellFromWalls = (rowIdx:number, colIdx:number) => {
        setWalls((prevWalls) => {
            return prevWalls.filter(wall => wall[0] !== rowIdx || wall[1] !== colIdx);
        })
    }

    // hadble erase cells from walls 
    const handleErasingWall = (rowIdx:number, colIdx:number) => {
        if(isInWalls(rowIdx, colIdx)){
            eraseWall([rowIdx, colIdx]);
            removeCellFromWalls(rowIdx, colIdx);
        }
        console.log(`current walls: ${walls}`)
    }

    // reflect selected cell
    useEffect(()=>{
        // when start changed, paint start based on new start state value
        paintStart(start);
        // when end changed, paint start based on new start state value
        paintEnd(end)
        // paint wall
    }, [start, end])

    // manhattan test 
    let height = rows
    let width = cols
    const test = ManhattanDis({ end, height:rows, width:cols})
    console.log(`end: ${end}`)

    return (
        <div className="board">
            {Array.from({ length: rows}, (_, rowIdx) => (
                <div className="row" key={`${rowIdx}`}>{
                    Array.from({ length: cols}, (_, colIdx) => (
                        // a cell
                        <div 
                            id={`${rowIdx}-${colIdx}`}
                            key={`${rowIdx}-${colIdx}`}
                            className="cell" 
                            data-x={`rowIdx`} 
                            data-y={`colIdx`}
                            onClick={()=>{ 
                                if( placingStart ) {
                                    handlePlacingStart(rowIdx, colIdx);
                                }
                                if( placingEnd ) {
                                    handlePlacingEnd(rowIdx, colIdx)
                                }
                                // just testing 
                                console.log(`checking walls: ${walls}`)
                            }}
                            onMouseDown={()=> {
                                setIsMouseDown(true);
                                // paint & erase first cell when painging or erasing cell 
                                if( placingWall ){
                                    handleDrawingWall(rowIdx, colIdx);
                                }
                                if( erasingWall ){
                                    handleErasingWall(rowIdx, colIdx);
                                }
                            }}
                            onMouseUp={()=>{
                                setIsMouseDown(false)
                            }}
                            onMouseEnter={()=>{ 
                                if( placingWall && isMouseDown){
                                    handleDrawingWall(rowIdx, colIdx);
                                }
                                if( erasingWall && isMouseDown){
                                    handleErasingWall(rowIdx, colIdx);
                                }
                            }}
                        >
                             <div className="test"> {`${rowIdx}, ${colIdx}`}</div>
                            {
                                `${ test[rowIdx][colIdx] }`
                            }
                        </div>
                    ))
                }</div>
            ))}
        </div>
    )
}