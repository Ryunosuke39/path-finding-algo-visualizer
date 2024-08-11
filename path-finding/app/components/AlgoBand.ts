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
}

export const Algo =({currentAlgo, start, end, scannedBoard}:AlgoProps)=> {

    if(currentAlgo === "DFS") {
        const frontier = new StackFrontier;
        DBFS({start, end, scannedBoard, frontier})
    }
    else if(currentAlgo === "BFS") {
        const frontier = new QueueFrontier;
        DBFS({start, end, scannedBoard, frontier})
    }
    else if( currentAlgo === "GBFS") {
        AStarO({start, end, scannedBoard, isAStar:false})
    }
    else if( currentAlgo === "A*") {
        AStarO({start, end, scannedBoard, isAStar:true})
    }
    else { // Dijkstra
        // Dijkstra({start, end, scannedBoard})
    }
}