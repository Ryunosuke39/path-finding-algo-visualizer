"use client"

// This code will be loaded map with current board state when player pressed run search algorithm
// then pass completed board to search algorithm 
import { useBoardInfo } from "./SwitchCtx"

const { start, end, walls, board, setBoard } = useBoardInfo();

// initialzing board with empty 
for(let i = 0; i<25; i++) {
    for(let j = 0; j < 50; j++ ){
        setBoard((prev)=> [...prev, [0, 0]])
    }
}

// add start 

// add end 

// add wall 

// return to completed board to search 