import { paintExplored, paintPath } from "../board";
import { ManhattanDis } from "./ManhattanDis";

interface ANodeProps {
    state: number[];
    parent: ANode | null;
    f: number;
    g: number;
}

class ANode {
    state: number[];
    parent: ANode | null;
    f: number;
    g: number;

    constructor( {state, parent, f, g } : ANodeProps ) {
        this.state = state;
        this.parent = parent;
        this.f = f; // g + manhattan heristic 
        this.g = g; // movement cost to move from the startung point to a given square
    }
}

interface AStarO {
    start: number[];
    end: number[];
    scannedBoard: string[][];
    isAStar: boolean;
    setPathCellCount:React.Dispatch<React.SetStateAction<number>>;
}


// A*
export const AStarO = ({start, end, scannedBoard, isAStar, setPathCellCount}: AStarO) => {
    // 0.
    const height = 25;
    const width = 50;
    const manhattan = ManhattanDis({end:end, height:height, width:width});
    let steps = 0;

    // 1. Initalized the open list
    let openList = [];
    // 2. initalized the closed list, put starting node on the open list 
    let closedList = [];
    const startNode = new ANode({state:start, parent:null, f:0, g:0 })
    openList.push(startNode)

    // 3. while the open list is not empty 
    while(openList.length != 0) {
        // a) find the node with the least f on the open list, call it "q"
        let q = openList.reduce((min, node) => node.f < min.f ? node : min, openList[0]);
        // b) pop q off the open list 
        let qIdx = openList.indexOf(q);
        if (qIdx > -1) {
            openList.splice(qIdx, 1);
        }

        // is walls?
        const isWall = (state: number[])=> {
            let [r, c] = state;
            if(scannedBoard[r][c] === "#") return true
            return false
        }

        // c) generate q's successor 
        const neighbors =(state: number[])=> {
            let [row, col] = state;
            const candidates: number[][] = [
                [row-1, col], // up
                [row + 1, col], // down
                [row, col - 1], // left
                [row, col + 1], // right 
            ];
    
            const result:number[][] = [];
    
            for (let [r, c] of candidates) {
                if( 0<=r && r<height && 0<=c && c<width && !isWall([r, c])) { 
                        result.push([r, c]);
                }
            }
            return result;
        }

        // get successor 
        let neighborsList = neighbors(q.state)

        steps += 1;
        // d) for each neigbors(successor)
        for( let i=0; i<neighborsList.length; i++) {
            // set parent to q
            let curr:ANode = new ANode({state:neighborsList[i], parent:q, f:0, g:0})

            // paint q
            if(steps >= 1 ){ // avoid painting start
                setTimeout(()=>{
                    if(curr.state[0] == start[0] && curr.state[1] == start[1] || curr.state[0] == end[0] && curr.state[1] == end[1]) {
                        // paintExplored([curr.state[0], curr.state[1]])
                    }else{
                        paintExplored([curr.state[0], curr.state[1]])
                    }
                }, steps * 10)
            }

            // i) if successor is the goal, stop search 
            if(curr.state[0] === end[0] && curr.state[1] === end[1]) {
                // get path, paint a optimal path
                let path = [];
                while(q.parent != null){
                    path.push(q.state);
                    q = q.parent;
                }
                path.reverse();
                // set path cell count 
                setPathCellCount(path.length)
                // print a optimal path
                for(let i=0; i<path.length; i++) {
                    let cell = path[i]
                    setTimeout(()=>{
                        paintPath([cell[0], cell[1]])
                    }, i* 30 + steps * 10)
                }
                return 
            }
            // ii) else, compute both g and h for successor
            // g = q.g + distance between successor and q
            // h = distance from goal to successor 
            // f = g + h 
            let tempG = q.g + 1;
            let tempH = manhattan[curr.state[0]][curr.state[1]]
            let tempF = 0
            if( isAStar ){
                tempF = tempH + tempG;
            } else {
                tempF = tempH;
            }
            curr.g = tempG;
            curr.f = tempF;
            // iii) if a node with the same position as successor curr is in the open list
            // which has a lower f than successor, skip this successor 
            const isInOpenList = (openList:ANode[]) => {
                for(let i=0; i<openList.length; i++) {
                    let cell:ANode = openList[i];
                    if (cell.state[0] === curr.state[0] && cell.state[1] === curr.state[1] ) {
                        return cell;
                    }
                }
                return false;
            }

            let existingOpenNode = isInOpenList(openList)
            if( existingOpenNode && existingOpenNode.f <= tempF) { // skip this successor 
                continue;
            }

            const isInClosedList = (closedList:ANode[]) => {
                for(let i=0; i<closedList.length; i++) {
                    let cell:ANode = closedList[i];
                    if (cell.state[0] === curr.state[0] && cell.state[1] === curr.state[1] ) {
                        return cell;
                    }
                }
                return false;
            }

            // iV) if a node with the same position as successor is in the CLOSED list which 
            let existingCloseNode = isInClosedList(closedList);
            if ( existingCloseNode && existingCloseNode.f <= tempF ) { // skip this successor
                continue;
            } 
            if (existingOpenNode) {
                //otherwise add node to openList
                openList.splice(openList.indexOf(existingOpenNode), 1)
            }
            openList.push(curr)

        }

        // e) push q on the closed list 
        closedList.push(q);
    }
    // not returning anything? show error 
    throw new Error("no solution")
}