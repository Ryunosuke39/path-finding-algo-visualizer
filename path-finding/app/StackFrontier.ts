import { Node } from "./Node"

export class StackFrontier {
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
            const node = this.frontier.shift();
            return node
        }
    }
}