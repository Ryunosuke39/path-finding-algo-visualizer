import { DBFS } from "./algorithms/DBFS";
import { StackFrontier } from "./algorithms/StackFrontier";
import { QueueFrontier } from "./algorithms/QueueFrontier";
import { AStarO } from "./algorithms/AStarOptimized";
import { Dijkstra } from "./algorithms/Dijkstra";

interface AlgoProps {
    currentAlgo: string;
    start: number[];
    end: number[]
    scannedBoard: string[][];
    setPathCellCount:React.Dispatch<React.SetStateAction<number>>;
}

export const Algo =({currentAlgo, start, end, scannedBoard, setPathCellCount}:AlgoProps)=> {

    if(currentAlgo === "DFS") {
        const frontier = new StackFrontier;
        DBFS({start, end, scannedBoard, frontier, setPathCellCount})
    }
    else if(currentAlgo === "BFS") {
        const frontier = new QueueFrontier;
        DBFS({start, end, scannedBoard, frontier, setPathCellCount})
    }
    else if( currentAlgo === "GBFS") {
        AStarO({start, end, scannedBoard, isAStar:false, setPathCellCount})
    }
    else if( currentAlgo === "A*") {
        AStarO({start, end, scannedBoard, isAStar:true, setPathCellCount})
    }
    else { // Dijkstra
        // Dijkstra({start, end, scannedBoard})
    }
}