import { DBFS } from "./DBFS";
import { StackFrontier } from "./StackFrontier";
import { QueueFrontier } from "./QueueFrontier";

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
    else if( currentAlgo === "A*") {
        //AStar({start, end, walls, board})
    }
    else { // Minimax
        //Minimax({start, end, walls, board})
    }
}