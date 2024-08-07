import { stat } from "fs";
import { paintExplored, paintPath } from "./board";


class Node {
    state: number[];
    parent: Node | null;
    action: string | null;

    constructor( {state, parent, action} : Node ) {
        this.state = state;
        this.parent = parent;
        this.action = action;
    }
}

class StackFrontier {
    frontier: Node[]

    constructor() {
        this.frontier = []
    }

    add(node:Node) {
        this.frontier.push(node)
    }

    containsState(state:number[]) {
        for(let i=0; i<this.frontier.length; i++) {
            let curr = this.frontier[i].state
            if(curr[0] == state[0] && curr[1] == state[1])
                return true
        } 
        return false
    }

    empty() {
        return this.frontier.length == 0
    }

    remove() {
        if(this.empty()) {
            throw new Error("frontier is empty")
        }
        else {
            // const lastIdx = this.frontier.length - 1
            // const node = this.frontier[ lastIdx ]
            // this.frontier = this.frontier.slice(lastIdx, 1)
            const node = this.frontier.pop();
            return node
        }
    }
}

/* 
- start with a frontier that contains the initial state 
- start with an empty explored set 
- repeat:
    * if the frontier is empty, then no solution.
    * remove a node from the frontier.
    * if node contains goal state, return the solution
    * Add the node to the explored set.
    * Expand node, add resulting nodes to the frontier if
    they aren't already in the frontier or the explored set.
*/

interface DFSProps {
    start: number[];
    end: number[];
    walls: number[][];
    scannedBoard: string[][];
}

export const DFS = ({start, end, walls, scannedBoard}:DFSProps) => {

    // 25 row x 50 col
    class Maze {
        // get maze height 
        height:number;
        width:number;
    
        constructor() {
            this.height = 10 //25
            this.width = 10 //50
        }
    
        // get map 

        // not wall function
        isWall(state: number[]) {
            for(let i=0; i<walls.length; i++) {
                const wall = walls[i];
                if(wall[0] === state[0] && wall[1] === state[1]){
                    return true
                }
            }
            return false
        }
    
        // get neighbors
        neighbors(state: number[]) {
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

                if( 0<=r && r<this.height && 0<=c && c<this.width && !this.isWall([r,c])){
                        result.push([action, [r, c]]);
                }
            }
            return result;
        }
    
        // find a solution for provided maze if it exist 
        solve() {
            // Initialize frontier to just the starting position
            // const start = Node()
            let startP = new Node({state: start, parent:null, action:null});
            let frontier = new StackFrontier();
            frontier.add(startP)

            let explored = []

            let paintCount = 0
            // Keep looping until solution found 
            while(true) {
                // if nothing left in frontier, then no path 
                if( frontier.empty() ) {
                    throw new Error("no solution")
                }
                // choose a node from frontier
                let node = frontier.remove()
                console.log(`${node?.state}-frontier: ${JSON.stringify(frontier.frontier)}`)

                // if node is a goal, then we have a solution
                if(node.state[0] == end[0] && node.state[1] == end[1]) {
                    let actions = []
                    let cells = []
                    while(node.parent != null){
                        actions.push(node.action);
                        cells.push(node.state);
                        node = node.parent;
                    }
                    actions.reverse();
                    cells.reverse();
                    // print a optimal path
                    for(let i=0; i<cells.length-1; i++) {
                        let cell = cells[i]
                        setTimeout(()=>{
                            paintPath([cell[0], cell[1]])
                        }, i* 30)
                    }
                    // end loop
                    return
                }
                
                // mark as expolored
                explored.push(node.state);

                let test = node.state;
                paintCount += 1;
                setTimeout(()=>{
                    paintExplored([test[0], test[1]])
                }, paintCount * 10)

                const isInExplored = (state: number[]) => {
                    for(let i=0; i<explored.length; i++) {
                        let curr = explored[i];
                        if( curr[0]===state[0] && curr[1]===state[1]) {
                            return true
                        }
                    }
                    return false
                }

                // add neighbors to frontier 
                for (let [action, [r, c]] of this.neighbors(node.state)) {
                    // console.log(`neighbors-${[action, [r, c]]}`)
                    if(!frontier.containsState([r, c]) && !isInExplored([r,c])) {
                        console.log(`node-${node.state}: neighbors-${[action, [r, c]]}`)
                        let child = new Node({state: [r, c], parent:node, action:action})
                        console.log(`child: ${JSON.stringify(child)}`)
                        frontier.add(child)
                    }
                }
            }
        }
    }

    let test = new Maze;
    test.solve();

    return 1
   // test
    
}