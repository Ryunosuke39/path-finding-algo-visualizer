import { paintPath } from "../board";
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
        this.f = f;
        this.g = g; // movement cost to move from the startung point to a given square
    }
}

interface AStarO {
    start: number[];
    end: number[];
    scannedBoard: string[][];
}


// A*
export const AStarO = ({start, end, scannedBoard}: AStarO) => {
    // 0.
    const height = 25;
    const width = 50;
    const manhattan = ManhattanDis({end, height, width});
    let steps = 0;

    // 1. Initalized the open list
    const openList = [];
    // 2. initalized the closed list, put starting node on the open list 
    const closedList = [];
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
        openList.filter(node => node !== q)

        // is walls?
        const isWall = (state: number[])=> {
            let [r, c] = state;
            if(scannedBoard[r][c] === "#") return true
            return false
        }

        // c) generate q's successor 
        const neighbors =(state: number[])=> {
            const row = state[0]
            const col = state[1]
            const candidates: [string, [number, number]][] = [
                ["up", [row-1, col]],
                ["down", [row + 1, col]],
                ["left", [row, col - 1]],
                ["right", [row, col + 1]],
            ];
    
            const result:[string, [number, number]][] = [];
    
            for (let [action, [r, c]] of candidates) {
                if( 0<=r && r<height && 0<=c && c<width && !isWall([r, c])) { /// <<<<<<< wall doing something wrong?
                        result.push([action, [r, c]]);
                }
            }
            return result;
        }
    
        let neighborsList = neighbors(q.state)

        // for each neigbors
        for( let i=0; i<neighborsList.length; i++) {
            // i) if successor is the goal, stop search 
            let curr = neighborsList[i][1]
            if(curr[0] == end[0] && curr[1] == end[1]) {
                // get path, paint a optimal path
                let path = [];
                while(q.parent != null){
                    path.push(q.state);
                    q = q.parent;
                }
                path.reverse();
                // print a optimal path
                for(let i=0; i<path.length-1; i++) {
                    let cell = path[i]
                    setTimeout(()=>{
                        paintPath([cell[0], cell[1]])
                    }, i* 30)
                }
                return 
            }
            // ii) else, compute both g and h for successor
            // g = q.g + distance between successor and q
            // h = distance from goal to successor 
            // f = g + h 
            steps += 1
            let tempG = q.g + steps;
            let tempH = manhattan[curr[0]][curr[1]]
            let tempF = tempG + tempH;
            // iii) if a node with the same position as successor is in the open list
            // which has a lower f than successor, skip this successor 
            const isInOpenList = (openList:ANode[]) => {
                for(let i=0; i<openList.length; i++) {
                    let cell:ANode = openList[i];
                    if (cell.state[0] == curr[0] && cell.state[1] == curr[1] && cell.f < tempF){
                        // skip this successor 
                        return true;
                    }
                }
                return false;
            }
            if( isInOpenList(openList) ) continue;

            // iV) if a node with the same position as successor is in the CLOSED list which 
            const isInClosedList = (closedList:ANode[]) => {
                for(let i=0; i<closedList.length; i++) {
                    let cell:ANode = closedList[i];
                    if (cell.state[0] == curr[0] && cell.state[1] == curr[1] && cell.f < tempF){
                        // skip this successor 
                        return true;
                    }
                }
                return false;
            }
            if ( isInClosedList(closedList) ) { //skip
                continue;
            } 
            else { //otherwise add node to openList
                let child:ANode = new ANode({state:curr, parent:q, f:tempF, g:tempG});
                openList.push(child)
            }

        }

        // e) push q on the closed list 
        closedList.push(q);
    }
}