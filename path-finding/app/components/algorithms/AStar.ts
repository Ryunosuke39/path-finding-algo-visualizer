import { paintExplored, paintPath } from "../board";
import { AStarNode } from "./AStarNode";
import { ManhattanDis } from "./ManhattanDis";
import { PriorityQueue } from "./PriorityQueue";

interface AStarProps {
    start: number[];
    end: number[];
    walls: number[][];
    frontier: PriorityQueue;
}

export const AStar = ({start, end, walls, frontier}:AStarProps) => {
    let height = 25
    let width = 50
    
    // 25 row x 50 col
    class Maze {
        // get maze height 
        height:number;
        width:number;
    
        constructor() {
            this.height = height //25
            this.width = width //50
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

        solve() {
            let startP = new AStarNode({state: start, parent:null, action:null, totalFunctionCost:0 });
            frontier.add(startP);
            let explored = []
            let stepCount = 0
            let manhattan = ManhattanDis({ end, height, width})

            while(true) {
                // base
                if (frontier.empty() ){
                    throw new Error("no solution")
                }
                // get last element
                console.log(`his-${stepCount}: ${frontier.frontier.map((i)=> [i.state, ":" + i.totalFunctionCost + ", "])}`)
                let node = frontier.remove()!; // non-null

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

                // painting explored 
                let explored = node.state;
                if( stepCount === 2 ) {
                    setTimeout(()=>{
                        paintExplored([explored[0], explored[1]])
                    }, stepCount * 2)
                }

                // loop possible next move cell 
                for (let [action, [r, c]] of this.neighbors(node.state)) {
                    if(!frontier.containsState([r,c])) {
                        let currWeight = manhattan[r][c];
                        let test = currWeight + stepCount;
                        console.log(`A*${stepCount} - ${[r,c]} : ${test}`)
                        let child = new AStarNode({ state: [r, c], parent: node, action:action, totalFunctionCost: test})
                        frontier.add(child)
                    }
                }

                stepCount += 1;

                //test 
                // if(stepCount == 2){
                //     return 
                // }
            }
        }
    } // end of class

    let test = new Maze;
    test.solve();
} // end of most outer function