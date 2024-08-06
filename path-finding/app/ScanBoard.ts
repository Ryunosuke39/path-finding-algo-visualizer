"use client"

// This code will be loaded map with current board state when player pressed run search algorithm
// then pass completed board to search algorithm 
import { useBoardInfo } from "./SwitchCtx"

const { start, end, walls, board, setBoard } = useBoardInfo();

// clear privious scanned map
setBoard([])

// initialzing board with empty 
for(let i=0; i<25; i++) {
    for(let j=0; j<50; j++ ){
        // add start, start = [x, y]
        if( start[0]==i && start[1]==j){
            setBoard((prev)=> [...prev, ["S"]])
        }
        // add end 
        else if( end[0]==i && end[1]==j) {
            setBoard((prev)=> [...prev, ["G"]])
        }
        // add walls
        else if( walls[i][0]==i && walls[j][1]==j) {
            setBoard((prev)=> [...prev, ["#"]])
        }
        else {
            setBoard((prev)=> [...prev, [" "]])
        }
        // setBoard((prev)=> [...prev, ["", ""]])
    }
} 