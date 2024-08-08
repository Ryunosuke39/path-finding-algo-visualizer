// generate maze
// generate path, add flag to generated path div, add wall except that path
// finally remove all path tag from all div for next generation

interface mazeProps {
    rows: number;
    cols: number;
}

export const generateMaze = ({rows, cols}: mazeProps) => {
    // maybe I can just save all walls infomations into array then return that, we loopthrought all to paint wall
    // initalize map 
    const maze: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(true))
    // use this unit to avoid too complicated maze for eaze of visualization for user
    let pathUnit = 4; // adding 1 unit for direction cell, in total 5 unit at max
    let start: number[] = [0, 0]

    // return possibel direction cell for next move, up, down, left, right
    const getNextDirections = ([h, w]:number[]) => {

        let res:[string, [number, number]][] = []
        let candidate: [string, [number, number]][] = [ ["up", [h-1, w]], 
                                                        ["down", [h+1, w]], 
                                                        ["left", [h, w-1]], 
                                                        ["right", [h, w+1]]];

        for(let i=0; i<candidate.length; i++) {
            let curr = candidate[i]
            if( 0<=curr[1][0] && curr[1][0]<rows && 0<=curr[1][1] && curr[1][1]<cols ){
                res.push(curr)
            }
        }
        return res;
    }

    const makeReszie = ([r, c]: number[]) => {
        while( r<0 && c<0) {
            if( r< 0 ) {
                r -= 1
            }else {
                c -= 1
            }
        }
        return [r, c]
    }

    // make path true 
    const generatePath = ([r, c]: number[]) => {

        // BASE State 

        let dir = getNextDirections(start);
        let random = Math.floor(Math.random() * dir.length);
        let finalDir = dir[random];
        let tempDir = []

        if( finalDir[0] === "up") {
            tempDir = [ finalDir[1][0]-pathUnit, finalDir[1][0]]
        }
        else if( finalDir[0] === "down") {
            tempDir = [ finalDir[1][0]+pathUnit, finalDir[1][0]]
        }
        else if( finalDir[0] === "left") {
            tempDir = [ finalDir[1][0], finalDir[1][0]-pathUnit]
        }
        else {
            tempDir = [ finalDir[1][0], finalDir[1][0]+pathUnit]
        }

        let pathStart = finalDir[1]
        // get distination posiiton when we took 5 unit of steps at maximum to a certain direction
        let pathDestination = makeReszie(tempDir)

        // update next start position
        // start = pathDestination; not need?

        // recurive call
        // generatePath(pathDestination)

    }

    //


}
