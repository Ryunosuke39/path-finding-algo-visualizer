import { useEffect } from "react";
import { DFS } from "./DFS";

interface AlgoProps {
    currentAlgo: string;
    start: number[];
    end: number[]
    walls: number[][];
    board: string[][];
}

export const Algo =({currentAlgo, start, end, walls, board}:AlgoProps)=> {

    if(currentAlgo === "DFS") {
        DFS({start, end, walls, board})
    }
    else if(currentAlgo === "BFS") {
        //BFS({start, end, walls, board})
    }
    else if( currentAlgo === "A*") {
        //AStar({start, end, walls, board})
    }
    else { // Minimax
        //Minimax({start, end, walls, board})
    }
}