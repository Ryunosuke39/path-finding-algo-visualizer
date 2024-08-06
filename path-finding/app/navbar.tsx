"use client"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "./navbar.css"
import { useBoardInfo, useSwitchs } from "./SwitchCtx"
import Popup from "./Popup";
import { ScanBoard } from "./ScanBoard";

export default function Navbar(){
    const { placingStart, 
            setPlacingStart, 
            placingEnd, 
            setPlacingEnd,
            placingWall, 
            setPlacingWall, 
            erasingWall,
            setErasingWall, 
            currentAlgo,
            setCurrentAlgo, 
            startSearch, 
            setStartSearch,
            showInstraction,
            setShowInstraction, } = useSwitchs();
    
    const { start, end, walls } = useBoardInfo();


    const handleAlgoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentAlgo(event?.target.value)
    }


    const handleSearch = () => {
        console.log(`start: ${start}, end: ${end}`)
        if(start[0] == undefined || null ) {
            toast.error('Make sure to place A Start Point', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        if(end[0] == undefined || null) {
            toast.error('Make sure to place A Goal Point', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else {
            // if both start and end is placed on board, start searching
            setStartSearch(true)
            // ExcuteSearch(currentAlgo)
            const scannedBoard = ScanBoard({start, end, walls})
            console.log("scan-res:", scannedBoard)
        }
    }

    return(
        <div className="navbar-container">
            <div className="title-container">
                <div>Pathfinding Visualizer</div>
                <div onClick={()=>setShowInstraction(true)}>?</div>
            </div>
            <Popup triggerPop={showInstraction}></Popup>

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

            <div className="test">
                <label htmlFor="algorithm">Algorithm AI</label>
                <select name="algorithm" id="algorithm" value={currentAlgo} onChange={handleAlgoChange}>
                    <option value="DFS">Depth First Search</option>
                    <option value="BFS">Breath First Search</option>
                    <option value="A*">A*</option>
                    <option value="Minimax">Minimax</option>
                </select>
            </div>
            <ToastContainer theme="colored"/>
            <button onClick={handleSearch}>
                Start Path Finding
            </button>
            <button onClick={()=> location.reload()}>
                Reset Board
            </button>

        </div>
    )
}