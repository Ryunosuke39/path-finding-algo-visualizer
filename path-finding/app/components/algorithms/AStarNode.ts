export class AStarNode {
    state: number[];
    parent: AStarNode | null;
    action: string | null;
    totalFunctionCost: number;


    constructor( {state, parent, action, totalFunctionCost} : AStarNode ) {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.totalFunctionCost = totalFunctionCost;
    }
}