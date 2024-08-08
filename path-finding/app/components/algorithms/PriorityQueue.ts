import { AStarNode } from "./AStarNode"

export class PriorityQueue {

    frontier: AStarNode[]
    constructor() {
        this.frontier = []
    }

    // add Astar node in ascedning order 
    add(node:AStarNode){
        // lowest at index 0, largest at last index
        if(!this.empty()){
            let insertIdx = 0
            for(let i=0; i<this.frontier.length; i++) {
                // 0, 1, 3, 4
                if(node.totalFunctionCost < this.frontier[i].totalFunctionCost) {
                    insertIdx = i - 1
                }
            }

            this.frontier.splice(insertIdx, 0, node)
        }
        else{
            this.frontier.push(node)
        }
    }

    // contain 
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

    remove(){
        if(this.empty()) {
            throw new Error("frontier is empty")
        }
        else {
            const node = this.frontier.shift();
            return node
        }
    }
}