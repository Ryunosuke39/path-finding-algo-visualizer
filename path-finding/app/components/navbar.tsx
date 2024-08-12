"use client"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "./styles/navbar.css"
import { useBoardInfo, useSwitchs } from "./SwitchCtx"
import Popup from "./Popup";
import { ScanBoard } from "./ScanBoard";
import { Algo } from "./AlgoBand";
import { clearPath } from "./board";
import { GenerateMap } from "./algorithms/GenerateMap";

// font 
import { Bebas_Neue } from "next/font/google";
const bebas_neue = Bebas_Neue({weight: "400", subsets: ["latin"]});

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
            walls,
            setWalls, 
            pathCellCount,
            setPathCellCount, } = useBoardInfo();


    const handleAlgoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentAlgo(event?.target.value)
    }


    const handleSearch = () => {
        // clear previous path if it exist on the board
        handlePathClear();
        
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
            const scannedBoard = ScanBoard({start, end, walls})
            console.log("scan-res:", scannedBoard)
            Algo({currentAlgo, start, end, scannedBoard, setPathCellCount})
        }
    }

    // remove all explored, path tag from thml elements
    // row=25, col=50
    const handlePathClear = () => {
        setPathCellCount(0);
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

    // handle generating map 
    const handleGenerate = () => {
        GenerateMap({start, setWalls, walls});
    }

    return(
        <div className="navbar-container">
            <div className="title-container">
                <div className={bebas_neue.className}>
                    <div className="title">Pathfinding Visualizer</div>
                </div>
            </div>
            {/* for popup messsage - read react toastify doc */}
            <Popup triggerPop={showInstraction}></Popup>


            <div className="main-controller">

                <div className="first-btns">
                    <div className="instraction-container" onClick={()=> setShowInstraction(true)}>
                        <div className="instraction">Need help?</div>
                    </div>
                    <button className="btn" onClick={()=> handlePlacingStart()}>
                        {placingStart ? "Finish":"Place Start"}
                    </button>
                    <button className="btn" onClick={()=> handlePlacingEnd()}>
                        {placingEnd ? "Finish":"Place Goal"}
                    </button>
                </div>

                <div className="choose-algo-start">
                    <label className="algo-type-label" htmlFor="algorithm">Algorithm Type</label>
                    <select className="algo-type-select" name="algorithm" id="algorithm" value={currentAlgo} onChange={handleAlgoChange}>
                        <option value="DFS">Depth First Search</option>
                        <option value="BFS">Breath First Search</option>
                        <option value="GBFS">Greedy Best-First Search</option>
                        <option value="A*">A*</option>
                    </select>

                    <button className="start-path-btn" onClick={handleSearch}>
                        Start Path Finding
                    </button>
                    <button className="btn" onClick={handlePathClear}>
                        Clear Path
                    </button>

                </div>

                <div className="score-container">
                        <div className="score">{pathCellCount}</div>
                        <div className="score-following">cells to Goal</div>
                </div>
                
                <div className="second-btns">

                    <button className="btn" onClick={()=> handlePlacingWall()}>
                        {placingWall ? "Done":"Placing Walls"}
                    </button>
                    <button className="btn" onClick={()=> handleErasingWall()}>
                        {erasingWall ? "Done" : "Erasing Walls"}
                    </button>
                    <button className="btn" onClick={handleGenerate}>
                        Generate Map
                    </button>

                    <ToastContainer theme="colored"/> 

                    <button className="btn" onClick={()=> location.reload()}>
                        Reset Board
                    </button>
                </div>


            </div>

        </div>
    )
}