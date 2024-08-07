import { Node } from "./Node";
import { StackFrontier } from "./StackFrontier";

export class QueueFrontier extends StackFrontier {
    remove() {
        if(this.empty()) {
            throw new Error("frontier is empty")
        }
        else {
            // 
            const node = this.frontier.pop();
            return node
        }
    }
}