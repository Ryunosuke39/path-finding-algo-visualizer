class Stack {

    // first in, last out 
    stack: number[][];
    constructor() {
        this.stack = [];
    }

    add(cell:number[]) {
        this.stack.push(cell);
    }

    isEmpty() {
        if(this.stack.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    // remove element from stack 
    remove() {
        if(this.stack.length === 0) {
            throw new Error("stack is empty")
        } else {
            return this.stack.pop();
        }
    }

    // get top of stack without removing it 
    getTop() {
        if(this.stack.length === 0) {
            throw new Error("stack is empty")
        } else {
            return this.stack[this.stack.length - 1];
        }
    }
}

interface Prop {
    start: number[];
    setWalls: React.Dispatch<React.SetStateAction<number[][]>>;
    walls: number[][];
}

export const GenerateMap = ({start, setWalls, walls}: Prop) => {

    // painting functions 
    const makeWall = (cell:number[]) => {
        // paint
        let wall = document.getElementById(`${cell[0]}-${cell[1]}`)
        wall?.classList.add("wall-cell");
        // update walls -- add cell to walls
        setWalls((prevWall)=> [...prevWall, [cell[0], cell[1]]])
    }

    const removeWall = (cell:number[]) => {
        // remove paint
        let wall = document.getElementById(`${cell[0]}-${cell[1]}`)
        wall?.classList.remove("wall-cell")
        // updated walls -- remove cell from walls
        setWalls((prevWalls) => {
            return prevWalls.filter(wall => wall[0] !== cell[0] || wall[1] !== cell[1]);
        })
    }

    // makeWall([2, 1])
    // --- board reset --- make all cell wall, then remove wall to create path 
    let temp = []
    for (let i=0; i<25; i++) {
        for (let j=0; j<50; j++) {
            // paint wall
            let wall = document.getElementById(`${i}-${j}`)
            wall?.classList.add("wall-cell");

            let a = [i, j];
            temp.push(a);
        }
    }
    setWalls(temp);

    // -- initalize -- 
    const height = 13; // 12 20 24 /25-1= 24/2 = 12
    const width = 25; // 25 30 50 /50/2 = 25
    const pathWidth = 1;

    let stack = new Stack(); // use to trace path back when there is non explored neigbors
    let explored:number[][] = [] // save explored cell
    let exploredCount = 0;
    let arrows: string[][][] = Array.from({length: height}, () => Array.from({length: width}, ()=>[]));


    const isExplored = (cell:number[]) => {
        for(let i=0; i<explored.length; i++) {
            if (cell[0] === explored[i][0] && cell[1] === explored[i][1]) {
                return true;
            }
        }
        return false
    }


    // get avaible neigbour around cell
    const getNeighbours = (cell:number[]): [string, [number, number]][] => {
        const directions:[string, [number, number]][] = [
            ["up", [-1, 0]], // up
            ["down", [1, 0]], // down
            ["right", [0, 1]], // right
            ["left", [0, -1]], // left 
        ]

        const ans:[string, [number, number]][] = []
        for(let direction of directions) {
            let [dir, [dirH, dirW]] = direction
            const [possibleH, possibleW] = [cell[0]+dirH, cell[1]+dirW];
            if (possibleH >= 0 && possibleH < height && possibleW >= 0 && possibleW < width && !isExplored([possibleH, possibleW])) {
                ans.push([dir, [possibleH, possibleW]])
            }
        }
        return ans
    }


    // --- generate maze ---
    let startCell:number[] = [];
    if(start[0] == undefined && start[1] == undefined) {
        startCell = [0, 0];
    } else {
        startCell = start;
    }
    stack.add(startCell);
    explored.push(startCell);
    exploredCount += 1;

    // === create maze === 5 x 5
    while (exploredCount < height * width) {
        let cur = stack.getTop();
        let neigbours = getNeighbours(cur);
        if(neigbours.length !== 0) {
            // pick random neigbour 
            neigbours.sort(()=> Math.random() - 0.5)
            let [arrow, [posH, posW]] = neigbours[0];

            console.log(`${cur} to ${arrow} => ${posH}, ${posW}`)

            arrows[cur[0]][cur[1]].push(arrow); // can not handle when cell will have two direction history 
            stack.add([posH, posW]);
            explored.push([posH, posW]);
            exploredCount += 1;

        } else {
            stack.remove()
        }
    }

    console.log(`arrows: ${JSON.stringify(arrows)}`)

    // === draw maze === start with 1 to create boundary around maze
    for (let i=0; i<height; i++) {
        for (let j=0; j<width; j++) {
            // remove wall cell 
            setTimeout(()=>{
                // -- start of set time out 
                let [h, w] = [i* (pathWidth +1), j* (pathWidth + 1)]
                if (isExplored([i, j])) {
                    // removeWall([i* (pathWidth +1), j* (pathWidth + 1)])
                    removeWall([h, w]);
                } else {
                    // removeWall([i* (pathWidth + 1), j* (pathWidth + 1)])
                }
                // make path that lead to another cell 
                let arrow = arrows[i][j];
                if (arrow != null) {
                    for(let i of arrow) {
                        if (i == "up") {
                            // removeWall([i* (pathWidth + 1)-1, j* (pathWidth + 1)])
                            console.log(`removing wall at ${h-1}, ${w}`)
                            removeWall([h-1, w])
                        } 
                        else if (i == "down") {
                            // removeWall([i* (pathWidth + 1)+1, j* (pathWidth + 1)])
                            console.log(`removing wall at ${h+1}, ${w}`)
                            removeWall([h+1, w])
                        }
                        else if (i == "left") {
                            // removeWall([i* (pathWidth + 1), j* (pathWidth + 1) -1])
                            console.log(`removing wall at ${h}, ${w-1}`)
                            removeWall([h, w-1])
                        }
                        else if (i == "right"){
                            // removeWall([i* (pathWidth + 1), j* (pathWidth + 1) +1])
                            console.log(`removing wall at ${h}, ${w+1}`)
                            removeWall([h, w+1])
                        }
                        else {
                            console.log("this should not be printed")
                        }
                    }
                }
                // -- end of set time out 
            }, i+j *2)
        }
    }
}