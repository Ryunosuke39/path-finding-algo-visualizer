"use client"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "./styles/navbar.css"
import { useBoardInfo, useSwitchs } from "./SwitchCtx"
import Popup from "./Popup";
import { ScanBoard } from "./ScanBoard";
import { Algo } from "./AlgoBand";
import { clearPath } from "./board";

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
            showInstraction,
            setShowInstraction, } = useSwitchs();
    
    const { start, 
            end, 
            walls, } = useBoardInfo();


    const handleAlgoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentAlgo(event?.target.value)
    }


    const handleSearch = () => {
        
        setPlacingStart(false);
        setPlacingEnd(false);
        setPlacingWall(false);
        setErasingWall(false);

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
            // ExcuteSearch(currentAlgo)
            console.log(`end:${end}, start:${start}`)
            const scannedBoard = ScanBoard({start, end, walls})
            console.log("scan-res:", scannedBoard)
            Algo({currentAlgo, start, end, walls, scannedBoard})
        }
    }

    // remove all explored, path tag from thml elements
    // row=25, col=50
    const handleClear = () => {
        for(let i=0; i<25; i++){
            for(let j=0; j<50; j++){
                clearPath([i, j])
            }
        }
    }

    // handle set start 
    const handlePlacingStart = () => {
        // toggle placing start 
        setPlacingStart(!placingStart);
        // disable other button's feature to avoid overwriting cell with other than start 
        setPlacingEnd(false);
        setPlacingWall(false);
        setErasingWall(false);
    }

    // handle set Goal 
    const handlePlacingEnd = () => {
        setPlacingEnd(!placingEnd);
        setPlacingStart(false);
        setPlacingWall(false);
        setErasingWall(false);
    }

    // handle set wall
    const handlePlacingWall = () => {
        setPlacingWall(!placingWall);
        setPlacingStart(false);
        setPlacingEnd(false);
        setErasingWall(false);
    } 

    // handle erasing wall
    const handleErasingWall = () => {
        setErasingWall(!erasingWall);
        setPlacingStart(false);
        setPlacingEnd(false);
        setPlacingWall(false);
    }

    return(
        <div className="navbar-container">
            <div className="title-container">
                <div>Pathfinding Visualizer</div>
                <div onClick={()=> setShowInstraction(true)}>?</div>
            </div>
            <Popup triggerPop={showInstraction}></Popup>

            <button onClick={()=> handlePlacingStart()}>
                {placingStart ? "Done":"Place Start"}
            </button>
            <button onClick={()=> handlePlacingEnd()}>
                {placingEnd ? "Done": "Place Goal"}
            </button>
            <button onClick={()=> handlePlacingWall()}>
                {placingWall ? "Done":"Placing Walls"}
            </button>
            <button onClick={()=> handleErasingWall()}>
                {erasingWall ? "Done" : "Erasing Walls"}
            </button>

            <div className="test">
                <label htmlFor="algorithm">Algorithm AI</label>
                <select name="algorithm" id="algorithm" value={currentAlgo} onChange={handleAlgoChange}>
                    <option value="DFS">Depth First Search</option>
                    <option value="BFS">Breath First Search</option>
                    <option value="GBF">Greedy Best-First Search</option>
                    <option value="A*">A*</option>
                    <option value="Dijkstra">Dijkstra's Algorithm</option>
                </select>
            </div>
            {/* for popup messsage - read react toastify doc */}
            <button>
                Use Preset map
            </button>
            <ToastContainer theme="colored"/> 
            <button onClick={handleSearch}>
                Start Path Finding
            </button>
            <button onClick={handleClear}>
                Clear Path
            </button>
            <button onClick={()=> location.reload()}>
                Reset Board
            </button>

        </div>
    )
}