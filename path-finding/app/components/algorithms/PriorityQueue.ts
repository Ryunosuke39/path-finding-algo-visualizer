import { AStarNode } from "./AStarNode"

export class PriorityQueue {

    frontier: AStarNode[]
    constructor() {
        this.frontier = []
    }

    // add Astar node in ascedning order 
    add(node:AStarNode){
        // add node based on  totalFunctionCost 
        let insertIdx = this.frontier.length 
        for(let i=0; i<this.frontier.length; i++) {
            console.log(`${node.totalFunctionCost} < ${this.frontier[i].totalFunctionCost}`)
            if(node.totalFunctionCost < this.frontier[i].totalFunctionCost){
                insertIdx = i
                console.log("breaking!")
                break
            }
        }
        this.frontier.splice(insertIdx, 0, node);
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
        return this.frontier.length === 0
    }

    remove(){
        if(this.empty()) {
            throw new Error("frontier is empty")
        }
        else {
            const node = this.frontier.shift()!;
            console.log(`removing ${node.state} from ${JSON.stringify(this.frontier)}`)
            return node
        }
    }
}