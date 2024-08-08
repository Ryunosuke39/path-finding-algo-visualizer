import { DBFS } from "./algorithms/DBFS";
import { StackFrontier } from "./algorithms/StackFrontier";
import { QueueFrontier } from "./algorithms/QueueFrontier";
import { AStar } from "./algorithms/AStar";
import { PriorityQueue } from "./algorithms/PriorityQueue";

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
        let frontier = new PriorityQueue;
        AStar({start, end, walls, frontier})
    }
    else { // Minimax
        //Minimax({start, end, walls, board})
    }
}