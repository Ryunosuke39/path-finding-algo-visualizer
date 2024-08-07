"use client"

// This code will be loaded map with current board state when player pressed run search algorithm
// then pass completed board to search algorithm 

interface ScanBoardProps {
    start: number[];
    end: number[];
    walls: number[][];
}

export function ScanBoard({ start, end, walls }: ScanBoardProps) {
    // make sure to clear privius scanned board
    // clear privious scanned map
    const rows = 25;
    const cols = 50;
    const scanBoard: string[][] = Array.from({ length: rows}, ()=> Array(cols));

    // initialzing board with current state including start, end, and walls positions
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++ ){
            // add start, start = [x, y]
            if( start[0]==i && start[1]==j){
                scanBoard[i][j] = "S"
            }
            // add end 
            else if( end[0]==i && end[1]==j) {
                scanBoard[i][j] = "G"
            }
            else {
                scanBoard[i][j] = " "
            }
        }
    } 

    // adding walls
    const wallsSize = walls.length;
    for(let i=0; i<wallsSize; i++){
        const temp = walls[i];
        scanBoard[temp[0]][temp[1]] = "#";
    }
    
    // exit function
    return scanBoard
}