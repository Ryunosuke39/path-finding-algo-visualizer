import { stat } from "fs";
import { paintExplored } from "./board";


class Node {
    state: number[];
    parent: Node;
    action: Node;

    constructor(state:number[], parent:Node, action:Node) {
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
            if(this.frontier[i].state == state)
                return true
            return false
        } 
    }

    empty() {
        return this.frontier.length === 0
    }

    remove() {
        if(this.empty()) {
            throw new Error("frontier is empty")
        }
        else {
            const lastIdx = this.frontier.length - 1
            const node = this.frontier[ lastIdx ]
            this.frontier = this.frontier.slice(lastIdx, 1)
            return node
        }
    }
}


class Maze {
    // get map 

    // get neibors 
    neighbors(state: number[]) {
        const row = state[0]
        const col = state[1]
        const candidates = {
            "UP":[row-1, col],
            "DOWN":[row+1, col],
            "Right":[row, col-1],
            "Left":[row, col+1],
        }
        const result = []
        
    }

    // find a solution for provided maze if it exist 
    solve() {
        // Initialize frontier to just the starting position
        // const start = Node()
    }
}

interface DFSProps {
    start: number[];
    end: number[];
    walls: number[][];
    board: string[][];
}

export const DFS = ({start, end, walls, board}:DFSProps) => {
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
   // test
   console.log("HIHIHI")
    return paintExplored(start)
    
}