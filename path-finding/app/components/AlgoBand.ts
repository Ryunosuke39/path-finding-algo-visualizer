import { DBFS } from "./algorithms/DBFS";
import { StackFrontier } from "./algorithms/StackFrontier";
import { QueueFrontier } from "./algorithms/QueueFrontier";
import { AStarO } from "./algorithms/AStarOptimized";

interface AlgoProps {
    currentAlgo: string;
    start: number[];
    end: number[]
    walls: number[][];
    scannedBoard: string[][];
}

export const Algo =({currentAlgo, start, end, walls, scannedBoard}:AlgoProps)=> {

    if(currentAlgo === "DFS") {
        const frontier = new StackFrontier;
        DBFS({start, end, walls, scannedBoard, frontier})
    }
    else if(currentAlgo === "BFS") {
        const frontier = new QueueFrontier;
        DBFS({start, end, walls, scannedBoard, frontier})
    }
    else if( currentAlgo === "GBFS") {

    }
    else if( currentAlgo === "A*") {
        console.log("wall optimaized hopefully")
        AStarO({start, end, scannedBoard})
    }
    else { // Dijkstra
        
    }
}