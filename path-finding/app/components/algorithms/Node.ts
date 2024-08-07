// Node class used in all search algorithm
export class Node {
    state: number[];
    parent: Node | null;
    action: string | null;

    constructor( {state, parent, action} : Node ) {
        this.state = state;
        this.parent = parent;
        this.action = action;
    }
}